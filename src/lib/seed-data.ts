import { prisma } from './prisma'
import { hashPassword } from './auth'

export async function seedDatabase() {
  try {
    console.log('Starting database seed...')

    // Create admin user
    const adminPassword = await hashPassword('password123')
    const admin = await prisma.user.upsert({
      where: { email: 'admin@familytree.com' },
      update: {},
      create: {
        email: 'admin@familytree.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    })

    // Create demo client
    const clientPassword = await hashPassword('password123')
    const client = await prisma.user.upsert({
      where: { email: 'client@example.com' },
      update: {},
      create: {
        email: 'client@example.com',
        name: 'John Smith',
        password: clientPassword,
        role: 'CLIENT',
      },
    })

    // Create sample projects
    const project1 = await prisma.project.upsert({
      where: { id: 'smith-family-project' },
      update: {},
      create: {
        id: 'smith-family-project',
        title: 'Smith Family Research',
        description: 'Researching the Smith family lineage in New England, 1850-1950',
        clientId: client.id,
        status: 'ACTIVE',
      },
    })

    const project2 = await prisma.project.upsert({
      where: { id: 'johnson-family-project' },
      update: {},
      create: {
        id: 'johnson-family-project',
        title: 'Johnson Family Tree',
        description: 'Tracing Johnson ancestors back to Ireland, focusing on immigration records',
        clientId: client.id,
        status: 'ACTIVE',
      },
    })

    // Create sample family members
    const familyMembers = [
      {
        firstName: 'John',
        lastName: 'Smith',
        birthDate: new Date('1850-03-15'),
        deathDate: new Date('1920-12-10'),
        birthPlace: 'Boston, Massachusetts',
        deathPlace: 'Boston, Massachusetts',
        occupation: 'Blacksmith',
        gender: 'MALE' as const,
        projectId: project1.id,
        addedById: client.id,
      },
      {
        firstName: 'Mary',
        lastName: 'Smith',
        maidenName: 'Johnson',
        birthDate: new Date('1855-07-22'),
        deathDate: new Date('1925-08-15'),
        birthPlace: 'Salem, Massachusetts',
        deathPlace: 'Boston, Massachusetts',
        gender: 'FEMALE' as const,
        projectId: project1.id,
        addedById: client.id,
      },
      {
        firstName: 'William',
        lastName: 'Smith',
        birthDate: new Date('1880-11-03'),
        deathDate: new Date('1955-04-20'),
        birthPlace: 'Boston, Massachusetts',
        deathPlace: 'Cambridge, Massachusetts',
        occupation: 'Teacher',
        gender: 'MALE' as const,
        projectId: project1.id,
        addedById: client.id,
      },
    ]

    for (const member of familyMembers) {
      await prisma.familyMember.upsert({
        where: { 
          id: `${member.firstName.toLowerCase()}-${member.lastName?.toLowerCase()}-${member.birthDate.getFullYear()}`
        },
        update: {},
        create: {
          id: `${member.firstName.toLowerCase()}-${member.lastName?.toLowerCase()}-${member.birthDate.getFullYear()}`,
          ...member,
        },
      })
    }

    // Create sample AI analyses
    await prisma.aIAnalysis.create({
      data: {
        type: 'DOCUMENT_ANALYSIS',
        input: 'Birth certificate for John Smith, born March 15, 1850 in Boston, Massachusetts',
        output: JSON.stringify({
          extractedNames: ['John Smith'],
          extractedDates: ['1850-03-15'],
          extractedPlaces: ['Boston, Massachusetts'],
          relationships: [],
          summary: 'Birth certificate confirming John Smith\'s birth details',
          confidence: 0.95
        }),
        confidence: 0.95,
        model: 'openrouter/anthropic/claude-sonnet-4',
        tokens: 150,
        projectId: project1.id,
      },
    })

    await prisma.aIAnalysis.create({
      data: {
        type: 'RESEARCH_SUGGESTION',
        input: JSON.stringify({ projectTitle: 'Smith Family Research' }),
        output: JSON.stringify({
          suggestions: [
            {
              suggestion: 'Search Census records for John Smith in Boston between 1850-1860',
              priority: 'HIGH',
              resources: ['Ancestry.com', 'FamilySearch.org'],
              reasoning: 'Given birth date and location, census records are most likely to provide family structure'
            }
          ]
        }),
        confidence: 0.85,
        model: 'openrouter/anthropic/claude-sonnet-4',
        tokens: 200,
        projectId: project1.id,
      },
    })

    console.log('Database seed completed successfully!')
    console.log('Demo accounts created:')
    console.log('- Admin: admin@familytree.com / password123')
    console.log('- Client: client@example.com / password123')
    
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}