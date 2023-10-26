import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

async function main() {
  const johan = await client.user.create({
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
    await client.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
