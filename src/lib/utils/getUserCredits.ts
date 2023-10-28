import prisma from '@/lib/prisma'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

async function getUserCredits() {
  const userId = await validateJwtAndFetchUserId()

  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      credits: true,
    },
  })

  return user?.credits
}

export default getUserCredits
