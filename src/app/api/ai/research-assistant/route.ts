import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'
import { getResearchSuggestions } from '@/lib/ai-service'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const researchAssistantSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
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
    const { projectId } = researchAssistantSchema.parse(body)

    // Get project data with family members
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        familyMembers: {
          select: {
            firstName: true,
            lastName: true,
            birthDate: true,
            birthPlace: true,
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Check if user has access to this project (either owner or admin)
    if (user.role !== 'ADMIN' && project.clientId !== user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Prepare project data for AI analysis
    const projectData = {
      title: project.title,
      description: project.description || undefined,
      familyMembers: project.familyMembers.map(member => ({
        firstName: member.firstName,
        lastName: member.lastName || undefined,
        birthDate: member.birthDate?.toISOString() || undefined,
        birthPlace: member.birthPlace || undefined,
      }))
    }

    // Get AI research suggestions
    const suggestions = await getResearchSuggestions(projectData, projectId)

    return NextResponse.json({
      success: true,
      suggestions,
      message: 'Research suggestions generated successfully'
    })

  } catch (error) {
    console.error('Research assistant error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to generate research suggestions',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}