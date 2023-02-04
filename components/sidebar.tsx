import NextImage from 'next/image'
import NextLink from 'next/link'

import {
  Box,
  Divider,
  List,
  ListItem,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { SidebarMenu } from './sidebar-menu'
import { usePlaylists } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Yuor library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favourites',
    icon: MdFavorite,
    route: '/favourites',
  },
]

export const Sidebar = () => {
  const { playlists } = usePlaylists()

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <SidebarMenu items={navMenu} />
        </Box>
        <Box>
          <SidebarMenu items={musicMenu} />
        </Box>
        <Divider marginY="20px" borderColor="gray.800" />
        <Box height="74%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlists.map(({ id, name }) => (
              <ListItem key={id}>
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: '/playlists/[id]',
                      query: { id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}
