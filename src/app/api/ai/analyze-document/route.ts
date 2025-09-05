import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'
import { analyzeDocument } from '@/lib/ai-service'
import { z } from 'zod'

const analyzeDocumentSchema = z.object({
  documentContent: z.string().min(1, 'Document content is required'),
  documentType: z.string().min(1, 'Document type is required'),
  projectId: z.string().min(1, 'Project ID is required'),
  documentId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { documentContent, documentType, projectId, documentId } = analyzeDocumentSchema.parse(body)

    // Analyze the document using AI
    const analysis = await analyzeDocument(
      documentContent,
      documentType,
      projectId,
      documentId
    )

    return NextResponse.json({
      success: true,
      analysis,
      message: 'Document analyzed successfully'
    })

  } catch (error) {
    console.error('Document analysis error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Document analysis failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}