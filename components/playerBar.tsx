import { Box, Flex, Text } from '@chakra-ui/layout'
import Player from './player'
import { useStoreState } from 'easy-peasy'

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs)
  const activeSong = useStoreState((state: any) => state.activeSong)


  return (
    <Box height={'100px'} width="100%" bg="gray.900" padding={'10px'}>
      <Flex align={'center'} color="white">
        {activeSong ? (
          <>
            <Box padding="20px" width="30%">
              <Text fontSize="large">{activeSong.name}</Text>
              <Text fontSize="sm">{activeSong.artist.name}</Text>
            </Box>
            <Box width="40%">
              <Player activeSong={activeSong} songs={songs} />
            </Box>
          </>
        ) : (
          <></>
        )}

        <Box width="30%">controls</Box>
      </Flex>
    </Box>
  )
}

export default PlayerBar
