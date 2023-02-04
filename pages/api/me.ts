import { validateRoute } from '../../lib/auth'
import { prisma } from '../../lib/prisma'

export default validateRoute(async (req, res, user) => {
  const playlistsCounter = await prisma.playList.count({
    where: {
      userId: user.id,
    },
  })

  return res.status(200).json({ ...user, playlistsCounter })
})
