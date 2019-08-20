import React from 'react'
import styled from 'styled-components'
import { Query, Mutation, MutationFn } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'

import Box from 'v2/components/UI/Box'
import Alert from 'v2/components/UI/Alert'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import { Input, Textarea, Label, LabelledInput } from 'v2/components/UI/Inputs'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'
import Text from 'v2/components/UI/Text'
import Pulldown from 'v2/components/UI/Pulldown'

import mapErrors from 'v2/util/mapErrors'

import USER_SETTINGS_QUERY from 'v2/components/UserSettings/queries/userSettingsQuery'
import UPDATE_ACCOUNT_MUTATION from 'v2/components/UserSettings/mutations/updateAccountMutation'

import { MySettings, MySettings_me as Me } from '__generated__/MySettings'
import {
  UpdateAccountMutation,
  UpdateAccountMutationVariables,
} from '__generated__/updateAccountMutation'

interface UserSettingsProps {
  me: Me
  updateAccount: MutationFn<
    UpdateAccountMutation,
    UpdateAccountMutationVariables
  >
}

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
)

const InputContainer = styled(LabelledInput)``

const TextInput = styled(Input).attrs({
  flex: 1,
  f: 4,
})``

const Bio = styled(Textarea)``

const Select = styled(Pulldown)``

const UserSettings: React.FC<UserSettingsProps> = ({ me, updateAccount }) => {
  const isCustom =
    me.home_path !== '/' &&
    me.home_path !== '/explore' &&
    me.home_path !== `/${me.slug}`
  const homePath = isCustom ? 'custom' : me.home_path

  const handleSubmit = values => {
    const variables = {
      ...values,
      home_path: values.custom_home_path || values.home_path,
      custom_home_path: undefined,
      show_nsfw: values.show_nsfw === 'true',
      exclude_from_indexes: values.exclude_from_indexes
        ? values.exclude_from_indexes === 'true'
        : undefined,
    }

    return updateAccount({ variables })
      .then(() => true)
      .catch(err => {
        const mappedErrors = mapErrors(err)
        const errors = {
          [FORM_ERROR]: mappedErrors.errorMessage,
          ...mappedErrors.attributeErrors,
        }
        return errors
      })
  }

  return (
    <Box>
      <Form
        onSubmit={handleSubmit}
        render={({
          handleSubmit,
          pristine,
          submitFailed,
          submitSucceeded,
          submitting,
          submitError,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="first_name" initialValue={me.first_name}>
                {props => {
                  return (
                    <InputContainer mt={6} mb={5}>
                      <Label>First name</Label>

                      <TextInput
                        {...props.input}
                        placeholder="First name"
                        errorMessage={
                          props.meta.error || props.meta.submitError
                        }
                        autoFocus
                      />
                    </InputContainer>
                  )
                }}
              </Field>

              <Field name="last_name" initialValue={me.last_name}>
                {props => {
                  return (
                    <InputContainer mt={6} mb={5}>
                      <Label>Last name</Label>

                      <TextInput
                        {...props.input}
                        placeholder="Last name"
                        errorMessage={
                          props.meta.error || props.meta.submitError
                        }
                      />
                    </InputContainer>
                  )
                }}
              </Field>

              <Field name="email" initialValue={me.email}>
                {props => {
                  return (
                    <InputContainer mt={6} mb={5}>
                      <Label>Email</Label>

                      <TextInput
                        {...props.input}
                        placeholder="Email"
                        errorMessage={
                          props.meta.error || props.meta.submitError
                        }
                      />
                    </InputContainer>
                  )
                }}
              </Field>

              {me.unconfirmed_email && me.unconfirmed_email !== '' && (
                <>
                  <InputContainer mt={6} mb={5}>
                    <Label />
                    <TextInput
                      placeholder="Unconfirmed email address"
                      readOnly
                      disabled
                      value={me.unconfirmed_email}
                    />
                  </InputContainer>
                  <InputContainer mt={0} mb={5}>
                    <Label />
                    <Text f={2} mb={7}>
                      Please check your email to confirm your new email address
                    </Text>
                  </InputContainer>
                </>
              )}

              <Field name="password">
                {props => {
                  return (
                    <InputContainer mt={6} mb={5}>
                      <Label>Password</Label>

                      <TextInput
                        {...props.input}
                        type="password"
                        placeholder="Password"
                        errorMessage={
                          props.meta.error || props.meta.submitError
                        }
                      />
                    </InputContainer>
                  )
                }}
              </Field>

              <Field name="password_confirmation">
                {props => {
                  return (
                    <InputContainer mt={6} mb={5}>
                      <Label />

                      <TextInput
                        {...props.input}
                        type="password"
                        placeholder="Confirm password"
                        errorMessage={
                          props.meta.error || props.meta.submitError
                        }
                      />
                    </InputContainer>
                  )
                }}
              </Field>

              {me.can.edit_profile_description && (
                <Field name="bio" initialValue={me.bio}>
                  {props => {
                    return (
                      <InputContainer mt={6} mb={5}>
                        <Label>About</Label>

                        <Bio
                          {...props.input}
                          placeholder="Bio"
                          rows={4}
                          errorMessage={
                            props.meta.error || props.meta.submitError
                          }
                        />
                      </InputContainer>
                    )
                  }}
                </Field>
              )}

              <Field name="show_nsfw" initialValue={me.settings.show_nsfw}>
                {props => {
                  return (
                    <>
                      <InputContainer mt={6} mb={5}>
                        <Label>Show NSFW?</Label>

                        <Select
                          {...props.input}
                          options={{
                            true: <span>Yes</span>,
                            false: <span>No</span>,
                          }}
                        />
                      </InputContainer>
                      <InputContainer mt={0} mb={5}>
                        <Label />
                        <Text f={2} mb={7}>
                          Show content marked as NSFW on profiles, explore and
                          feed
                        </Text>
                      </InputContainer>
                    </>
                  )
                }}
              </Field>

              <Field name="home_path" initialValue={homePath}>
                {props => {
                  return (
                    <InputContainer mt={6} mb={5}>
                      <Label>Default landing page</Label>

                      <Select
                        {...props.input}
                        options={{
                          '/': <span>Feed</span>,
                          '/explore': <span>Explore</span>,
                          [`/${me.slug}`]: <span>Profile</span>,
                          custom: <span>Custom</span>,
                        }}
                      />
                    </InputContainer>
                  )
                }}
              </Field>

              <Condition when="home_path" is="custom">
                <Field name="custom_home_path" initialValue={me.home_path}>
                  {props => {
                    return (
                      <InputContainer mt={6} mb={5}>
                        <Label />

                        <Input
                          {...props.input}
                          placeholder="i.e. /user-name/channel-url"
                        />
                      </InputContainer>
                    )
                  }}
                </Field>
              </Condition>

              {me.is_premium && (
                <>
                  <Field
                    name="exclude_from_indexes"
                    initialValue={me.settings.exclude_from_indexes}
                  >
                    {props => {
                      return (
                        <>
                          <InputContainer mt={6} mb={5}>
                            <Label>Hide from search engines?</Label>

                            <Pulldown
                              {...props.input}
                              options={{
                                true: <span>Yes</span>,
                                false: <span>No</span>,
                              }}
                            />
                          </InputContainer>
                          <InputContainer mt={0} mb={5}>
                            <Label />
                            <Text f={2} mb={7}>
                              This will exclude your profile and channels from
                              being indexed by external search engines (e.g.
                              Google, Bing, etc.)
                            </Text>
                          </InputContainer>
                        </>
                      )
                    }}
                  </Field>
                </>
              )}
              <Box mt={8} pt={6} borderTop="1px solid" borderColor="gray.light">
                {submitSucceeded && (
                  <Alert bg="state.premium" color="white" mb={6}>
                    Settings saved.
                  </Alert>
                )}

                {submitFailed && submitError && (
                  <Alert bg="state.alert" color="white" mb={6}>
                    {submitError}
                  </Alert>
                )}
                <Box align="center">
                  <Button f={4} type="submit" disabled={!!pristine}>
                    {submitting ? 'Saving' : 'Save changes'}
                  </Button>
                </Box>
              </Box>
            </form>
          )
        }}
      />
    </Box>
  )
}

const UserSettingsContainer: React.FC = () => (
  <Query<MySettings> query={USER_SETTINGS_QUERY}>
    {({ data, error, loading }) => {
      if (error) {
        return <ErrorAlert>{error.message}</ErrorAlert>
      }

      if (loading) return <LoadingIndicator mt={6} f={8} />

      return (
        <Mutation<UpdateAccountMutation, UpdateAccountMutationVariables>
          mutation={UPDATE_ACCOUNT_MUTATION}
        >
          {updateAccountMutation => {
            return (
              <UserSettings
                me={data.me}
                updateAccount={updateAccountMutation}
              />
            )
          }}
        </Mutation>
        //
      )
    }}
  </Query>
)

export default UserSettingsContainer
