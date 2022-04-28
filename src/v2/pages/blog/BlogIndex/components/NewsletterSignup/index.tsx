import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useForm, useField } from 'react-final-form-hooks'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { Input } from 'v2/components/UI/Inputs'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'

import { useMutation, useQuery } from '@apollo/client'
import newsletterSignup from './mutations/newsletterSignup'
import updateNewsletterSettings from './mutations/updateNewsletterSettings'
import {
  subscribeToNewsletter,
  subscribeToNewsletterVariables,
} from '__generated__/subscribeToNewsletter'
import { NewsletterListEnum } from '__generated__/globalTypes'
import useLoginStatus from 'v2/hooks/useLoginStatus'
import getNewsletterSettings from './queries/getNewsletterSettings'
import { NewsletterSettings } from '__generated__/NewsletterSettings'
import {
  UpdateNewsletterSettingsMutation,
  UpdateNewsletterSettingsMutationVariables,
} from '__generated__/UpdateNewsletterSettingsMutation'

const Container = styled(Box).attrs({
  px: 8,
  py: 7,
  borderRadius: '0.5em',
})`
  background-color: ${p => p.theme.colors.gray.input};
  text-align: center;
`

const Caption = styled(Text).attrs({
  f: 4,
})``

const InputContainer = styled(Box).attrs({})`
  display: flex;
  width: 100%;
`

const EmailInput = styled(Input).attrs({
  borderColor: 'gray.light',
  borderRadius: '0.25em',
  mr: 3,
})`
  flex: 3;
`

const SubmitButton = styled(Button).attrs({
  f: 2,
})``

const LoggedInNewsletterSignup: React.FC = () => {
  const { data } = useQuery<NewsletterSettings>(getNewsletterSettings)
  const [updateSettings] = useMutation<
    UpdateNewsletterSettingsMutation,
    UpdateNewsletterSettingsMutationVariables
  >(updateNewsletterSettings)

  const onSubmit = useCallback(() => {
    updateSettings({
      variables: {
        receive_editorial_emails: !data.me.settings.receive_editorial_emails,
      },
      optimisticResponse: {
        update_account: {
          __typename: 'UpdateAccountMutationPayload',
          me: {
            ...data.me,
            settings: {
              ...data.me.settings,
              receive_editorial_emails: !data.me.settings
                .receive_editorial_emails,
            },
          },
        },
      },
    })
  }, [data?.me])

  return (
    <Container>
      <Caption pb={data?.me?.settings.receive_editorial_emails ? 0 : 6}>
        {data?.me?.settings.receive_editorial_emails
          ? "You're subscribed to our editorial newsletter."
          : 'You can also get our blog posts via email'}
      </Caption>
      {!data?.me?.settings.receive_editorial_emails && (
        <SubmitButton onClick={onSubmit}>
          Subscribe to our editorial newsletter
        </SubmitButton>
      )}
    </Container>
  )
}

export const NewsletterSignup = () => {
  const { isLoggedIn } = useLoginStatus()
  const [mode, setMode] = useState<
    'resting' | 'submitting' | 'submitted' | 'error'
  >('resting')
  const [signupNewsletter] = useMutation<
    subscribeToNewsletter,
    subscribeToNewsletterVariables
  >(newsletterSignup)

  const onSubmit = useCallback(
    values => {
      setMode('submitting')
      signupNewsletter({
        variables: { email: values.email, list: NewsletterListEnum.EDITORIAL },
      })
        .then(() => {
          setMode('submitted')
          setTimeout(() => {
            setMode('resting')
          }, 2000)
        })
        .catch(err => {
          console.error(err)
          setMode('error')
        })
    },
    [mode, setMode, signupNewsletter]
  )

  const { form, handleSubmit, submitting, pristine } = useForm({
    initialValues: { email: '' },
    onSubmit,
  })

  const emailField = useField('email', form)

  if (isLoggedIn) {
    return <LoggedInNewsletterSignup />
  }

  return (
    <Container>
      <Caption pb={6}>You can also get our blog posts via email</Caption>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <EmailInput
            type="email"
            placeholder="Enter email address"
            errorMessage={emailField.meta.error || emailField.meta.submitError}
            {...emailField.input}
          />
          <SubmitButton type="submit" disabled={submitting || pristine}>
            {
              {
                resting: 'Subscribe',
                submitting: 'Subscribing...',
                submitted: 'Subscribed!',
                error: 'Error!',
              }[mode]
            }
          </SubmitButton>
        </InputContainer>
      </form>
    </Container>
  )
}
