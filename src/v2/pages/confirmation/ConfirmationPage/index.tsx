import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'

import { BlankTopBarLayout } from 'v2/components/UI/Layouts/BlankTopBarLayout'
import CenteringBox from 'v2/components/UI/CenteringBox'

import Text from 'v2/components/UI/Text'
import { ConfirmedStatus } from '__generated__/globalTypes'
import Box from 'v2/components/UI/Box'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'

import CONFIRM_ACCOUNT_MUTATION from 'v2/pages/confirmation/ConfirmationPage/mutations/confirmAccountMutation'
import {
  confirmAccountMutation,
  confirmAccountMutationVariables,
} from '__generated__/confirmAccountMutation'

const Container = styled(CenteringBox)`
  flex-direction: column;
`

interface ConfirmationPageToken {
  token: string
}

export const ConfirmationPage: React.FC<ConfirmationPageToken> = ({
  token,
}) => {
  const [confirmAccount] = useMutation<
    confirmAccountMutation,
    confirmAccountMutationVariables
  >(CONFIRM_ACCOUNT_MUTATION, { variables: { token } })

  const [state, setState] = useState<'confirming' | 'redirecting' | 'error'>(
    'confirming'
  )
  const [status, setStatus] = useState<ConfirmedStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    confirmAccount()
      .then(response => {
        setState('redirecting')
        setStatus(response.data.confirm_account.status)

        setTimeout(() => {
          window.location.href = '/log_in'
        }, 1000)
      })
      .catch(response => {
        setError(response?.graphQLErrors[0]?.message)

        setState('error')
      })
  }, [setState, confirmAccount])

  return (
    <BlankTopBarLayout>
      <Container>
        <Text>
          {
            {
              confirming: 'Confirming your account...',
              redirecting: `${
                status && status === 'ALREADY_CONFIRMED'
                  ? 'Looks like your account is already confirmed.'
                  : 'Account confirmed.'
              } Redirecting you...`,
              error: 'We were unable to confirm your account.',
            }[state]
          }
        </Text>
        {error && (
          <Box mt={7}>
            <Text f={3}>
              If you believe this is in error, please{' '}
              <Button
                href={`mailto:help@are.na?subject=Account confirmation error&body=Hello, there was an error confirming my account with the token: ${token}. Please advise!`}
              >
                Send an email to help@are.na
              </Button>
            </Text>
          </Box>
        )}
      </Container>
    </BlankTopBarLayout>
  )
}
