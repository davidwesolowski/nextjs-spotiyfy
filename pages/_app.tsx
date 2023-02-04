import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { PlayerLayout } from '../components/player-layout'
import { StoreProvider } from 'easy-peasy'
import { store } from '../lib/store'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    components: {
      Button: {
        variant: {
          link: {
            ':focus': {
              outline: 'none',
              boxShadowing: 'none',
            },
          },
        },
      },
    },
  },
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <StoreProvider store={store}>
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        </StoreProvider>
      )}
    </ChakraProvider>
  )
}

export default MyApp
