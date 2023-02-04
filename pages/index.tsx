import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, Skeleton } from '@chakra-ui/react'
import { GradientLayout } from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import { prisma } from '../lib/prisma'

const Home = ({ artists }) => {
  const { user, isLoading } = useMe()

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <GradientLayout
      title={`${user.firstName} ${user.lastName}`}
      subtitle="Profile"
      description={`${user.playlistsCounter} public playlists`}
      color={'gray'}
      image="https://media.licdn.com/dms/image/C5603AQEaf50vr0xFng/profile-displayphoto-shrink_200_200/0/1631642204568?e=1680739200&v=beta&t=yEQNZHfApprB1C8a2dnIagR35HGAsWVCpjJiak_k4Ug"
      roundedImage
    >
      <Box color="white">
        <Box marginBottom={'40px'}>
          <Text fontSize="2xl" fontWeight={'bold'}>
            Top artist this month
          </Text>
          <Text fontSize={'md'}>only visible to you</Text>
        </Box>
        <Flex gap={'20px'}>
          {artists.map((artist) => (
            <Box
              bg="gray.900"
              borderRadius={'4px'}
              padding="15px"
              width={'200px'}
            >
              <Image
                src="https://placekitten.com/g/300/300"
                borderRadius={'50%'}
              />
              <Box marginTop={'20px'}>
                <Text fontSize="large">{artist.name}</Text>
                <Text fontSize={'x-small'}>Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}

export default Home
