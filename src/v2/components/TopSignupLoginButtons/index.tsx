import React from 'react'

import Box from 'v2/components/UI/Box'
import Button from 'v2/components/UI/GenericButton'
import useSerializedMe from 'v2/hooks/useSerializedMe'

export const TopSignupLoginButtons: React.FC = () => {
  const { id } = useSerializedMe()

  if (id) return null

  return (
    <Box>
      <Button href="/log_in" f={1} mr={6} color="gray.block">
        Login
      </Button>
      <Button href="/sign_up" f={1} color="gray.block">
        Sign Up
      </Button>
    </Box>
  )
}
