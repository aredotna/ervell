import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'

import { BlankTopBarLayout } from 'v2/components/UI/Layouts/BlankTopBarLayout'
import CenteringBox from 'v2/components/UI/CenteringBox'
import Constrain from 'v2/components/UI/Constrain'
import Alert from 'v2/components/UI/Alert'

import Text from 'v2/components/UI/Text'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'

import RESEND_CONFIRMATION_EMAIL from './mutations/resendConfirmationEmail'
import {
  ResendLoggedOutConfirmationEmailMutation,
  ResendLoggedOutConfirmationEmailMutationVariables,
} from '__generated__/ResendLoggedOutConfirmationEmailMutation'
import { ApolloError } from '@apollo/client'
import Box from 'v2/components/UI/Box'

const Container = styled(CenteringBox)`
  flex-direction: column;
  text-align: center;
`

const Headline = styled(Text).attrs({
  fontSize: 6,
  lineHeight: 1,
  align: 'center',
  my: 6,
})``

interface ExpiredConfirmationPageProps {
  email: string
}

export const ExpiredConfirmationPage: React.FC<ExpiredConfirmationPageProps> = ({
  email,
}) => {
  const [state, setState] = useState<'resting' | 'sending' | 'done' | 'error'>(
    'resting'
  )
  const [error, setError] = useState<string | null>(null)

  const [resendConfirmationEmail] = useMutation<
    ResendLoggedOutConfirmationEmailMutation,
    ResendLoggedOutConfirmationEmailMutationVariables
  >(RESEND_CONFIRMATION_EMAIL, { variables: { email } })

  const onClick = useCallback(() => {
    if (state === 'resting') {
      setState('sending')
      resendConfirmationEmail()
        .then(() => {
          setState('done')
        })
        .catch((err: ApolloError) => {
          setState('error')
          setError(err.graphQLErrors[0].message)
        })
    }
  }, [resendConfirmationEmail, state])

  return (
    <BlankTopBarLayout>
      <Container>
        <Constrain>
          <Headline fontSize={6}>
            It looks like you haven&#39;t confirmed your account yet.
          </Headline>

          <Headline>
            Check your inbox for an email from us (info@are.na) and confirm your
            account to continue.
          </Headline>

          <Box mt={7} />

          {error && (
            <Alert mb={5} bg="state.alert" color="white">
              {error}
            </Alert>
          )}

          <Button f={4} onClick={onClick} disabled={state !== 'resting'}>
            {
              {
                resting: 'Resend my confirmation email',
                sending: `Sending a new confirmation email to ${email}...`,
                done: 'Confimation email sent.',
                error: `Error!`,
              }[state]
            }
          </Button>

          <Text f={2} mt={7} boldLinks>
            Or, send an email to{' '}
            <a
              href={`mailto:help@are.na?subject=Account confirmation trouble&body=Hello, there was an error confirming my account with the token:`}
            >
              help@are.na
            </a>{' '}
            if you&#39;re still having trouble.
          </Text>
        </Constrain>
      </Container>
    </BlankTopBarLayout>
  )
}
