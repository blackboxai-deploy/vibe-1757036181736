const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    console.log('Starting database seed...')

    // Create admin user
    const adminPassword = await bcrypt.hash('password123', 12)
    await prisma.user.upsert({
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
    const clientPassword = await bcrypt.hash('password123', 12)
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

    console.log('Database seed completed successfully!')
    console.log('Demo accounts created:')
    console.log('- Admin: admin@familytree.com / password123')
    console.log('- Client: client@example.com / password123')
    
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedDatabase()