import { prisma } from './prisma'

// AI API Configuration
const AI_API_ENDPOINT = process.env.AI_API_ENDPOINT!
const AI_CUSTOMER_ID = process.env.AI_CUSTOMER_ID!
const AI_AUTHORIZATION = process.env.AI_AUTHORIZATION!

export interface AIRequestConfig {
  model?: string
  maxTokens?: number
  temperature?: number
}

export interface AIResponse {
  content: string
  model: string
  tokens?: number
}

export interface DocumentAnalysisResult {
  extractedNames: string[]
  extractedDates: string[]
  extractedPlaces: string[]
  relationships: Array<{
    person1: string
    person2: string
    relationship: string
    confidence: number
  }>
  summary: string
  confidence: number
}

export interface RelationshipDetectionResult {
  relationships: Array<{
    person1Id: string
    person2Id: string
    relationshipType: string
    confidence: number
    reasoning: string
  }>
}

export interface ResearchSuggestion {
  suggestion: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  resources: string[]
  reasoning: string
}

export async function makeAIRequest(
  messages: Array<{ role: string; content: string | Array<any> }>,
  config: AIRequestConfig = {}
): Promise<AIResponse> {
  const model = config.model || process.env.DEFAULT_CHAT_MODEL || 'openrouter/anthropic/claude-sonnet-4'
  
  try {
    const response = await fetch(AI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'customerId': AI_CUSTOMER_ID,
        'Content-Type': 'application/json',
        'Authorization': AI_AUTHORIZATION,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: config.maxTokens || 4000,
        temperature: config.temperature || 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`AI API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      content: data.choices?.[0]?.message?.content || '',
      model,
      tokens: data.usage?.total_tokens,
    }
  } catch (error) {
    console.error('AI API request failed:', error)
    throw new Error('Failed to process AI request')
  }
}

export async function analyzeDocument(
  documentContent: string,
  documentType: string,
  projectId: string,
  documentId?: string
): Promise<DocumentAnalysisResult> {
  const systemPrompt = `You are an expert genealogist and document analyzer. Analyze the provided document and extract genealogical information in a structured format. Focus on names, dates, places, and relationships.

Return your analysis in the following JSON format:
{
  "extractedNames": ["name1", "name2"],
  "extractedDates": ["1850-03-15", "1920-12-31"],
  "extractedPlaces": ["New York, NY", "Boston, MA"],
  "relationships": [
    {
      "person1": "John Smith",
      "person2": "Mary Smith",
      "relationship": "spouse",
      "confidence": 0.95
    }
  ],
  "summary": "Brief summary of the document content",
  "confidence": 0.85
}`

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Document Type: ${documentType}\n\nDocument Content:\n${documentContent}` }
  ]

  const aiResponse = await makeAIRequest(messages)
  
  try {
    const analysis = JSON.parse(aiResponse.content)
    
    // Store AI analysis in database
    await prisma.aIAnalysis.create({
      data: {
        type: 'DOCUMENT_ANALYSIS',
        input: documentContent.substring(0, 1000), // Limit stored input
        output: aiResponse.content,
        confidence: analysis.confidence,
        model: aiResponse.model,
        tokens: aiResponse.tokens,
        projectId,
        documentId,
      }
    })

    return analysis
  } catch (error) {
    console.error('Failed to parse AI response:', error)
    throw new Error('Failed to analyze document')
  }
}

export async function detectRelationships(
  familyMembers: Array<{
    id: string
    firstName: string
    lastName?: string
    birthDate?: string
    deathDate?: string
    birthPlace?: string
  }>,
  projectId: string
): Promise<RelationshipDetectionResult> {
  const systemPrompt = `You are an expert genealogist. Analyze the provided family members and suggest potential relationships based on names, dates, and places. Consider common patterns in family naming, geographic proximity, and time periods.

Return your analysis in JSON format:
{
  "relationships": [
    {
      "person1Id": "id1",
      "person2Id": "id2",
      "relationshipType": "PARENT_CHILD",
      "confidence": 0.8,
      "reasoning": "Age difference and shared surname suggest parent-child relationship"
    }
  ]
}`

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Family Members:\n${JSON.stringify(familyMembers, null, 2)}` }
  ]

  const aiResponse = await makeAIRequest(messages)
  
  try {
    const analysis = JSON.parse(aiResponse.content)
    
    // Store AI analysis
    await prisma.aIAnalysis.create({
      data: {
        type: 'RELATIONSHIP_DETECTION',
        input: JSON.stringify(familyMembers),
        output: aiResponse.content,
        confidence: analysis.relationships?.[0]?.confidence || 0.5,
        model: aiResponse.model,
        tokens: aiResponse.tokens,
        projectId,
      }
    })

    return analysis
  } catch (error) {
    console.error('Failed to parse relationship detection response:', error)
    throw new Error('Failed to detect relationships')
  }
}

export async function getResearchSuggestions(
  projectData: {
    title: string
    description?: string
    familyMembers: Array<{
      firstName: string
      lastName?: string
      birthDate?: string
      birthPlace?: string
    }>
  },
  projectId: string
): Promise<ResearchSuggestion[]> {
  const systemPrompt = `You are an expert genealogy researcher. Based on the project information and family members provided, suggest specific research directions, resources, and strategies. Focus on actionable recommendations.

Return suggestions in JSON format:
{
  "suggestions": [
    {
      "suggestion": "Search census records for John Smith in New York between 1850-1860",
      "priority": "HIGH",
      "resources": ["Ancestry.com", "FamilySearch.org", "New York State Archives"],
      "reasoning": "Given birth date and location, census records are most likely to provide family structure"
    }
  ]
}`

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Project: ${projectData.title}\nDescription: ${projectData.description || 'No description'}\n\nFamily Members:\n${JSON.stringify(projectData.familyMembers, null, 2)}` }
  ]

  const aiResponse = await makeAIRequest(messages)
  
  try {
    const analysis = JSON.parse(aiResponse.content)
    
    // Store AI analysis
    await prisma.aIAnalysis.create({
      data: {
        type: 'RESEARCH_SUGGESTION',
        input: JSON.stringify(projectData),
        output: aiResponse.content,
        model: aiResponse.model,
        tokens: aiResponse.tokens,
        projectId,
      }
    })

    return analysis.suggestions || []
  } catch (error) {
    console.error('Failed to parse research suggestions response:', error)
    throw new Error('Failed to generate research suggestions')
  }
}

export async function standardizeNames(
  names: string[],
  projectId: string
): Promise<{ original: string; standardized: string; confidence: number }[]> {
  const systemPrompt = `You are an expert genealogist specializing in name standardization. Standardize the provided names according to common genealogical practices, accounting for spelling variations, nicknames, and historical naming conventions.

Return standardization in JSON format:
{
  "standardizedNames": [
    {
      "original": "Jno. Smyth",
      "standardized": "John Smith",
      "confidence": 0.95
    }
  ]
}`

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Names to standardize:\n${JSON.stringify(names, null, 2)}` }
  ]

  const aiResponse = await makeAIRequest(messages)
  
  try {
    const analysis = JSON.parse(aiResponse.content)
    
    // Store AI analysis
    await prisma.aIAnalysis.create({
      data: {
        type: 'NAME_STANDARDIZATION',
        input: JSON.stringify(names),
        output: aiResponse.content,
        model: aiResponse.model,
        tokens: aiResponse.tokens,
        projectId,
      }
    })

    return analysis.standardizedNames || []
  } catch (error) {
    console.error('Failed to parse name standardization response:', error)
    throw new Error('Failed to standardize names')
  }
}