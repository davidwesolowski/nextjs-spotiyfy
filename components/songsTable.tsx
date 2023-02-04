import { Box } from '@chakra-ui/layout'
import { Table, Td, Tr, Th, Tbody, IconButton, Thead } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { formatDate, formatTime } from '../lib/formatter'
import { useStoreActions } from 'easy-peasy'

const SongTable = ({ songs }) => {
  const setActiveSongs = useStoreActions(
    (store: any) => store.changeActiveSongs
  )
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

  const handlePlay = (activeSong = undefined) => {
    setActiveSong(activeSong ?? songs?.length > 0 ? songs[0] : undefined)
    setActiveSongs(songs)
  }

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom={'20px'}>
        <IconButton
          icon={<BsFillPlayFill fontSize={'30px'} />}
          aria-label="play"
          colorScheme={'green'}
          marginBottom="20px"
          size="lg"
          isRound
          onClick={() => handlePlay()}
        />
        <Table variant={'unstyled'}>
          <Thead borderBottom={'1px solid'} borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => (
              <Tr
                cursor={'pointer'}
                onClick={() => handlePlay(song)}
                sx={{
                  transition: 'all .3s',
                  '&:hover': {
                    bg: 'rgba(255,255,255,0.1)',
                  },
                }}
                key={song.id}
              >
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongTable
