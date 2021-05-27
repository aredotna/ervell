import React from 'react'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import axios from 'axios'
import { useApolloClient, MutationFunction as MutationFn } from '@apollo/client'
import { Query, Mutation } from '@apollo/client/react/components'

import Box from 'v2/components/UI/Box'
import Alert from 'v2/components/UI/Alert'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import {
  Input,
  Textarea,
  Label,
  LabelledInput,
  LargeLabelledCheckbox,
} from 'v2/components/UI/Inputs'
import { DividerButton as Button } from 'v2/components/UI/Buttons'
import Text from 'v2/components/UI/Text'
import RadioOptions from 'v2/components/UI/RadioOptions'
import Pulldown from 'v2/components/UI/Pulldown'
import HorizontalRule from 'v2/components/UI/HorizontalRule'
import { toggle as toggleOrSetTheme } from 'v2/components/UI/Layouts/BlankLayout/components/LegacyDarkTheme'

import mapErrors from 'v2/util/mapErrors'

import USER_SETTINGS_QUERY from 'v2/components/UserSettings/queries/UserSettingsQuery'
import UPDATE_ACCOUNT_MUTATION from 'v2/components/UserSettings/mutations/updateAccountMutation'

import { MySettings, MySettings_me as Me } from '__generated__/MySettings'
import {
  UpdateAccountMutation,
  UpdateAccountMutationVariables,
} from '__generated__/UpdateAccountMutation'

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

const ContextDivider = styled(HorizontalRule).attrs({
  my: 2,
  color: 'gray.semiLight',
})``

const CheckboxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`

const UserSettings: React.FC<UserSettingsProps> = ({ me, updateAccount }) => {
  const isCustom =
    me.home_path !== '/' &&
    me.home_path !== '/explore' &&
    me.home_path !== `/${me.slug}`
  const homePath = isCustom ? 'custom' : me.home_path

  const client = useApolloClient()
  const results = client.readQuery({
    query: gql`
      query ThemeQuery {
        sharify @client {
          theme: THEME
        }
      }
    `,
  })

  const theme = results.sharify && results.sharify.theme
  const darkModeEnabled = theme === 'dark'

  const handleSubmit = values => {
    const variables = {
      ...values,
      home_path:
        values.home_path == 'custom'
          ? values.custom_home_path
          : values.home_path,
      custom_home_path: undefined,
    }

    return updateAccount({ variables })
      .then(() => {
        return axios.get('/me/refresh')
      })
      .then(() => {
        window.location.reload()
        true
      })
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

              <ContextDivider />

              <Field
                name="receive_email"
                initialValue={me.settings.receive_email}
              >
                {props => {
                  return (
                    <>
                      <InputContainer mt={6} mb={5}>
                        <Label>Notification emails</Label>

                        <RadioOptions
                          value={props.input.value}
                          onSelect={props.input.onChange}
                        >
                          <RadioOptions.Option value={'none'}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Never send me notification emails
                              </Text>
                            )}
                          </RadioOptions.Option>

                          <RadioOptions.Option value={'digest'}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Only send me a periodic notification digest
                                email
                              </Text>
                            )}
                          </RadioOptions.Option>

                          <RadioOptions.Option value={'notifications'}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Send me an email for every notification
                              </Text>
                            )}
                          </RadioOptions.Option>
                        </RadioOptions>
                      </InputContainer>
                    </>
                  )
                }}
              </Field>

              <ContextDivider />

              <InputContainer mt={6} mb={5}>
                <Label>Other emails</Label>

                <CheckboxContainer>
                  <Field
                    name="receive_newsletter"
                    initialValue={me.settings.receive_newsletter}
                  >
                    {props => {
                      return (
                        <LargeLabelledCheckbox
                          name={props.input.name}
                          checked={props.input.value}
                          onChange={props.input.onChange}
                        >
                          Send me the monthly Are.na newsletter
                        </LargeLabelledCheckbox>
                      )
                    }}
                  </Field>

                  <Field
                    name="receive_tips_emails"
                    initialValue={me.settings.receive_tips_emails}
                  >
                    {props => {
                      return (
                        <LargeLabelledCheckbox
                          name={props.input.name}
                          checked={props.input.value}
                          onChange={props.input.onChange}
                        >
                          Send me periodic tips for how to use Are.na
                        </LargeLabelledCheckbox>
                      )
                    }}
                  </Field>

                  <Field
                    name="receive_group_premium_emails"
                    initialValue={me.settings.receive_group_premium_emails}
                  >
                    {props => {
                      return (
                        <LargeLabelledCheckbox
                          name={props.input.name}
                          checked={props.input.value}
                          onChange={props.input.onChange}
                        >
                          Send me alerts when members of my group hit their
                          block limits
                        </LargeLabelledCheckbox>
                      )
                    }}
                  </Field>

                  <Field
                    name="receive_sunday_review_emails"
                    initialValue={me.settings.receive_sunday_review_emails}
                  >
                    {props => {
                      return (
                        <LargeLabelledCheckbox
                          name={props.input.name}
                          checked={props.input.value}
                          onChange={props.input.onChange}
                        >
                          <Text>Receive Sunday Review emails</Text>
                        </LargeLabelledCheckbox>
                      )
                    }}
                  </Field>
                </CheckboxContainer>
              </InputContainer>

              <ContextDivider />

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

              <Field name="show_nsfw" initialValue={me.settings.show_nsfw}>
                {props => {
                  return (
                    <>
                      <InputContainer mt={6} mb={5}>
                        <Label>Show NSFW?</Label>

                        <RadioOptions
                          value={props.input.value}
                          onSelect={props.input.onChange}
                        >
                          <RadioOptions.Option value={true}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Show NSFW content
                              </Text>
                            )}
                          </RadioOptions.Option>

                          <RadioOptions.Option value={false}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Hide NSFW content
                              </Text>
                            )}
                          </RadioOptions.Option>
                        </RadioOptions>
                      </InputContainer>
                      <InputContainer mt={0} mb={5}>
                        <Label />
                        <Text f={2} mb={7}>
                          Show or hide content marked as Not Safe For Work on
                          profiles, explore and feed
                        </Text>
                      </InputContainer>
                    </>
                  )
                }}
              </Field>

              <Field
                name="hide_notification_count"
                initialValue={me.settings.hide_notification_count}
              >
                {props => {
                  return (
                    <>
                      <InputContainer mt={6} mb={5}>
                        <Label>Hide notification counter?</Label>

                        <RadioOptions
                          value={props.input.value}
                          onSelect={props.input.onChange}
                        >
                          <RadioOptions.Option value={false}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Show counter
                              </Text>
                            )}
                          </RadioOptions.Option>

                          <RadioOptions.Option value={true}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Hide counter
                              </Text>
                            )}
                          </RadioOptions.Option>
                        </RadioOptions>
                      </InputContainer>
                      <InputContainer mt={0} mb={5}>
                        <Label />
                        <Text f={2} mb={7}>
                          Show or hide the notification counter in the top right
                          corner. You will still be able to visit the
                          notifications page.
                        </Text>
                      </InputContainer>
                    </>
                  )
                }}
              </Field>

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

                            <RadioOptions
                              value={props.input.value}
                              onSelect={props.input.onChange}
                            >
                              <RadioOptions.Option value={true}>
                                {({ selected }) => (
                                  <Text f={4} mb={3} selected={selected}>
                                    Do not allow external search engines to
                                    index my content.
                                  </Text>
                                )}
                              </RadioOptions.Option>

                              <RadioOptions.Option value={false}>
                                {({ selected }) => (
                                  <Text f={4} mb={3} selected={selected}>
                                    External search engines can index my
                                    content.
                                  </Text>
                                )}
                              </RadioOptions.Option>
                            </RadioOptions>
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

              <ContextDivider />

              <Field name="darkmode" initialValue={darkModeEnabled}>
                {props => {
                  return (
                    <>
                      <InputContainer mt={6} mb={5}>
                        <Label>Dark mode</Label>

                        <RadioOptions
                          value={props.input.value}
                          onSelect={value => {
                            const theme = value === true ? 'dark' : 'default'
                            toggleOrSetTheme(theme)
                            props.input.onChange(value)
                          }}
                        >
                          <RadioOptions.Option value={true}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Enable
                              </Text>
                            )}
                          </RadioOptions.Option>
                          <RadioOptions.Option value={false}>
                            {({ selected }) => (
                              <Text f={4} mb={3} selected={selected}>
                                Disable
                              </Text>
                            )}
                          </RadioOptions.Option>
                        </RadioOptions>
                      </InputContainer>
                    </>
                  )
                }}
              </Field>

              <Box mt={8} pt={6}>
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
  <Query<MySettings> query={USER_SETTINGS_QUERY} ssr={false}>
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
