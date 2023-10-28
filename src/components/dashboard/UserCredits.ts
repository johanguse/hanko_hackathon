import prisma from '@/lib/prisma'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

async function getuserCredits() {
  const userId = await validateJwtAndFetchUserId()

  const credits = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      credits: true,
    },
  })
  return credits
}

export default getuserCredits
