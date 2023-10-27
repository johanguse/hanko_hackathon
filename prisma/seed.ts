import prisma from '@/lib/prisma'

async function main() {
  const johan = await prisma.user.create({
    data: {
      name: 'Johan',
      email: 'johanguse@gmail.com',
      userId: '3978bf6d-6c21-4ba2-aa62-a3c185053da4',
    },
  })

  console.log({ johan })
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
