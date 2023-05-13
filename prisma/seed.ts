import { PrismaClient, Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const password = bcrypt.hashSync('password', bcrypt.genSaltSync(10))

const userData: Prisma.UserCreateInput[] = [
  {
    firstname: 'Alice',
    lastname: 'Wonder',
    email: 'alice@prisma.io',
    password,
  },
  {
    firstname: 'Olumide',
    lastname: 'Nwosu',
    email: 'olumide@prisma.io',
    password,
  },
  {
    firstname: 'Michael',
    lastname: 'Jackson',
    email: 'mike@prisma.io',
    password,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
