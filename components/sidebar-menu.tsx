import NextLink from 'next/link'

import {
  List,
  ListItem,
  LinkBox,
  LinkOverlay,
  ListIcon,
} from '@chakra-ui/layout'

export const SidebarMenu = ({ items }) => {
  return (
    <List spacing={2}>
      {items.map(({ name, icon, route }) => (
        <ListItem key={name} paddingX="20px" fontSize="16px">
          <LinkBox>
            <NextLink href={route} passHref>
              <LinkOverlay>
                <ListIcon as={icon} color="white" marginRight="20px" />
                {name}
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  )
}
