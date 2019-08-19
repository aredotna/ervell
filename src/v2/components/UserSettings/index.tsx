import React from 'react'
import styled from 'styled-components'
import { Query, Mutation, MutationFn } from 'react-apollo'
import { Form, Field } from 'react-final-form'

import Box from 'v2/components/UI/Box'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import { Input, Textarea, Label, LabelledInput } from 'v2/components/UI/Inputs'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'
import Text from 'v2/components/UI/Text'
import Pulldown from 'v2/components/UI/Pulldown'

import USER_SETTINGS_QUERY from 'v2/components/UserSettings/queries/userSettingsQuery'
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

const TextInput = styled(Input).attrs({
  flex: 1,
  f: 4,
})``

const UserSettings: React.FC<UserSettingsProps> = ({ me }) => {
  const isCustom =
    me.home_path !== '/' &&
    me.home_path !== '/explore' &&
    me.home_path !== `/${me.slug}`
  const homePath = isCustom ? 'custom' : me.home_path

  return (
    <Box>
      <Form
        onSubmit={values => console.log('submitted', values)}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="first_name" initialValue={me.first_name}>
                {props => {
                  return (
                    <LabelledInput mt={6} mb={5}>
                      <Label>First name</Label>

                      <TextInput
                        {...props.input}
                        placeholder="First name"
                        autoFocus
                      />
                    </LabelledInput>
                  )
                }}
              </Field>

              <Field name="last_name" initialValue={me.last_name}>
                {props => {
                  return (
                    <LabelledInput mt={6} mb={5}>
                      <Label>Last name</Label>

                      <TextInput {...props.input} placeholder="Last name" />
                    </LabelledInput>
                  )
                }}
              </Field>

              <Field name="email" initialValue={me.email}>
                {props => {
                  return (
                    <LabelledInput mt={6} mb={5}>
                      <Label>Email</Label>

                      <TextInput {...props.input} placeholder="Email" />
                    </LabelledInput>
                  )
                }}
              </Field>

              {me.unconfirmed_email && me.unconfirmed_email !== '' && (
                <>
                  <LabelledInput mt={6} mb={5}>
                    <Label />
                    <TextInput
                      placeholder="Unconfirmed email address"
                      readOnly
                      disabled
                      value={me.unconfirmed_email}
                    />
                  </LabelledInput>
                  <LabelledInput mt={0} mb={5}>
                    <Label />
                    <Text f={2} mb={7}>
                      Please check your email to confirm your new email address
                    </Text>
                  </LabelledInput>
                </>
              )}

              <Field name="password">
                {props => {
                  return (
                    <LabelledInput mt={6} mb={5}>
                      <Label>Password</Label>

                      <TextInput {...props.input} placeholder="Password" />
                    </LabelledInput>
                  )
                }}
              </Field>

              <Field name="password_confirmation">
                {props => {
                  return (
                    <LabelledInput mt={6} mb={5}>
                      <Label />

                      <Input {...props.input} placeholder="Confirm password" />
                    </LabelledInput>
                  )
                }}
              </Field>

              {me.can.edit_profile_description && (
                <Field name="bio" initialValue={me.bio}>
                  {props => {
                    return (
                      <LabelledInput mt={8} mb={5}>
                        <Label>About</Label>

                        <Textarea {...props.input} placeholder="Bio" rows={4} />
                      </LabelledInput>
                    )
                  }}
                </Field>
              )}

              <Field name="show_nsfw" initialValue={me.settings.show_nsfw}>
                {props => {
                  return (
                    <>
                      <LabelledInput mt={6} mb={5}>
                        <Label>Show NSFW?</Label>

                        <Pulldown
                          {...props.input}
                          options={{
                            true: <span>Yes</span>,
                            false: <span>No</span>,
                          }}
                        />
                      </LabelledInput>
                      <LabelledInput mt={0} mb={5}>
                        <Label />
                        <Text f={2} mb={7}>
                          Show content marked as NSFW on profiles, explore and
                          feed
                        </Text>
                      </LabelledInput>
                    </>
                  )
                }}
              </Field>

              <Field name="home_path" initialValue={homePath}>
                {props => {
                  return (
                    <LabelledInput mt={6} mb={5}>
                      <Label>Default landing page</Label>

                      <Pulldown
                        {...props.input}
                        options={{
                          '/': <span>Feed</span>,
                          '/explore': <span>Explore</span>,
                          [`/${me.slug}`]: <span>Profile</span>,
                          custom: <span>Custom</span>,
                        }}
                      />
                    </LabelledInput>
                  )
                }}
              </Field>

              <Condition when="home_path" is="custom">
                <Field name="custom_home_path" initialValue={me.home_path}>
                  {props => {
                    return (
                      <LabelledInput mt={6} mb={5}>
                        <Label />

                        <Input
                          {...props.input}
                          placeholder="i.e. /user-name/channel-url"
                        />
                      </LabelledInput>
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
                          <LabelledInput mt={6} mb={5}>
                            <Label>Hide from search engines?</Label>

                            <Pulldown
                              {...props.input}
                              options={{
                                true: <span>Yes</span>,
                                false: <span>No</span>,
                              }}
                            />
                          </LabelledInput>
                          <LabelledInput mt={0} mb={5}>
                            <Label />
                            <Text f={2} mb={7}>
                              This will exclude your profile and channels from
                              being indexed by external search engines (e.g.
                              Google, Bing, etc.)
                            </Text>
                          </LabelledInput>
                        </>
                      )
                    }}
                  </Field>
                </>
              )}
              <Box align="center" mt={7}>
                <Button type="submit">Submit</Button>
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
