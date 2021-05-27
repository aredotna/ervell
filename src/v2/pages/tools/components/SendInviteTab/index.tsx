import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useForm, useField } from 'react-final-form-hooks'
import { FORM_ERROR } from 'final-form'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { Input } from 'v2/components/UI/Inputs'
import { DividerButton as Button } from 'v2/components/UI/Buttons'
import constants from 'v2/styles/constants'

import mapErrors from 'v2/util/mapErrors'

import SEND_INVITE_MUTATION from 'v2/pages/tools/components/SendInviteTab/mutations/sendInvitation'
import {
  SendInvitation,
  SendInvitationVariables,
} from '__generated__/SendInvitation'

const Container = styled(Box).attrs({
  width: ['100%', '600px'],
})`
  margin: 0 auto;
`

const TextInput = styled(Input).attrs({
  bg: 'gray.input',
  mt: 7,
  borderColor: 'gray.light',
})`
  border-radius: ${constants.radii.subtle};
`

export const SendInviteTab: React.FC = () => {
  const [mode, setMode] = useState<'resting' | 'saving' | 'saved' | 'error'>(
    'resting'
  )
  const [sendInvite] = useMutation<SendInvitation, SendInvitationVariables>(
    SEND_INVITE_MUTATION
  )

  const onSubmit = values => {
    setMode('saving')
    sendInvite({ variables: { emails: [values.email] } })
      .then(() => {
        setMode('saved')
        setTimeout(() => {
          setMode('resting')
        }, 2000)
      })
      .catch(err => {
        setMode('error')
        const mappedErrors = mapErrors(err)
        const errors = {
          [FORM_ERROR]: mappedErrors.errorMessage,
          ...mappedErrors.attributeErrors,
        }
        return errors
      })
  }

  const { form, handleSubmit, submitting, pristine } = useForm({
    initialValues: { email: '' },
    onSubmit,
  })

  const emailField = useField('email', form)

  return (
    <Container>
      <Text f={4} mt={7}>
        Invite as many friends and collaborators to Are.na as you’d like. Once
        the person you invited creates an account, you will automatically be
        following one another.
      </Text>
      <Text f={4} mt={7} color="gray.bold" fontWeight="bold">
        Invite 3 friends to join Are.na and get 15% off Premium when they sign
        up.
      </Text>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          placeholder="Enter email address"
          errorMessage={emailField.meta.error || emailField.meta.submitError}
          {...emailField.input}
        />

        <Button type="submit" disabled={submitting || pristine} mt={6}>
          {
            {
              resting: 'Send Invitation',
              saving: 'Sending...',
              saved: 'Sent',
              error: 'Error!',
            }[mode]
          }
        </Button>
      </form>
    </Container>
  )
}
