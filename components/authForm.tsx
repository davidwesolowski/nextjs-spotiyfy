import { useRouter } from 'next/router'
import { useState, FC } from 'react'
import { Box, Flex, Input, Button } from '@chakra-ui/react'
import NextImage from 'next/image'
import { auth } from '../lib/mutation'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const user = await auth(mode, { password, email })

    setIsLoading(false);

    router.push('/')
  }

  return (
    <Box height={'100vh'} width={'100vw'} bg="black" color="white">
      <Flex
        align="center"
        justify="center"
        height="100px"
        borderBottom={'white 1px solid'}
      >
        <NextImage src="/logo.svg" width={200} height={60} />
      </Flex>
      <Flex align="center" justify="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              bg={'green.500'}
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
