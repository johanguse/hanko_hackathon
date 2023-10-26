import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

async function getuserCredits() {
  const userId = await validateJwtAndFetchUserId()

  const credits = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      credits: true,
    },
  })
  return credits
}

export default getuserCredits
