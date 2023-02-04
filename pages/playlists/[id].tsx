import { GradientLayout } from '../../components/gradientLayout'
import SongTable from '../../components/songsTable'
import { validateToken } from '../../lib/auth'
import { prisma } from '../../lib/prisma'

const getBGColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]

  return colors[id % colors.length]
}

const Playlist = ({ playlist }) => {
  const { id, name, songs } = playlist
  const color = getBGColor(id)

  return (
    <GradientLayout
      color={color}
      roundedImage={false}
      title={name}
      subtitle="playlist"
      description={`${songs.length} songs`}
      image={`https://picsum.photos/400?random=${id}`}
    >
      <SongTable songs={songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  try {
    const user = validateToken(req.cookies.SESSION_ID)

    const [playlist] = await prisma.playList.findMany({
      where: {
        id: Number(query.id),
        userId: user.id,
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    })

    return {
      props: {
        playlist,
      },
    }
  } catch (error) {
    return {
      props: {
        playlist: undefined,
        error,
      },
    }
  }
}

export default Playlist
