import React from 'react'
import styled from 'styled-components'

import { ToolsPage_me as Me } from '__generated__/ToolsPage'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { themeGet } from 'styled-system'

const Container = styled(Box).attrs({
  width: ['100%', '600px'],
})`
  margin: 0 auto;
`

const PostAddress = styled(Text).attrs({
  f: 5,
  color: 'gray.bold',
})`
  background-color: ${themeGet('colors.gray.hint')};
  padding: 1em;
  font-family: monospace;
  display: flex;
  width: 100%;
  flex: 1;
`

interface AddViaEmailProps {
  me: Me
}

export const AddViaEmailTab: React.FC<AddViaEmailProps> = ({ me }) => {
  return (
    <Container>
      <PostAddress>{me.post_address}</PostAddress>
      <Text f={4} mt={7}>
        Sending an e-mail to this address will post the contents (including
        attachments) to an automatically generated private channel called
        “Incoming.”
      </Text>
      <Text f={4} mt={6}>
        You can also send emails to specific channels by writing the channel
        title in the subject line.
      </Text>
    </Container>
  )
}
