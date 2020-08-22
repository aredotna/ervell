import React from 'react'
import { useMutation } from 'react-apollo'
import styled from 'styled-components'

import { BlankTopBarLayout } from 'v2/components/UI/Layouts/BlankTopBarLayout'
import CenteringBox from 'v2/components/UI/CenteringBox'
import Constrain from 'v2/components/UI/Constrain'

import Text from 'v2/components/UI/Text'
import { ConfirmedStatus } from '__generated__/globalTypes'
import Box from 'v2/components/UI/Box'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'

import RESEND_CONFIRMATION_EMAIL from './mutations/resendConfirmationEmail'
import { ResendConfirmationEmailMutation } from '__generated__/ResendConfirmationEmailMutation'

const Container = styled(CenteringBox)`
  flex-direction: column;
  text-align: center;
`

const Headline = styled(Text).attrs({
  fontSize: 7,
  lineHeight: 1,
  align: 'center',
  my: 7,
})``

interface ExpiredConfirmationPageProps {
  email: string
}

export const ExpiredConfirmationPage: React.FC<ExpiredConfirmationPageProps> = ({
  email,
}) => {
  const [resendConfirmationEmail] = useMutation<
    ResendConfirmationEmailMutation
  >(RESEND_CONFIRMATION_EMAIL)

  return (
    <BlankTopBarLayout>
      <Container>
        <Constrain>
          <Headline fontSize={6}>
            It looks like you haven&#39;t confirmed your account yet 👀
          </Headline>

          <Headline>
            • Check your inbox for an email from us (subject line: &#34;
            <em>Please confirm your email</em>&#34;) <br />• Click the link
            inside.
          </Headline>

          <Button f={4} mt={8}>
            Resend my confirmation email
          </Button>
        </Constrain>
      </Container>
    </BlankTopBarLayout>
  )
}
