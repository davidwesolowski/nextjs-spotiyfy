import { Box } from '@chakra-ui/layout'
import PlayerBar from './playerBar'
import { Sidebar } from './sidebar'

export const PlayerLayout = ({ children }) => {
  return (
    <Box width="100%" height="100vh">
      <Box position={'absolute'} top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft={'250px'} marginBottom="100px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0" width='100%'>
        <PlayerBar />
      </Box>
    </Box>
  )
}
