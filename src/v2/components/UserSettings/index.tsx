import React from 'react'

import Box from 'v2/components/UI/Box'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import { Input, Textarea, Label, LabelledInput } from 'v2/components/UI/Inputs'
import Text from 'v2/components/UI/Text'

import { Query } from 'react-apollo'
import userSettingsQuery from 'v2/components/UserSettings/queries/UserSettingsQuery'
import { MySettings, MySettings_me as Me } from '__generated__/MySettings'

interface UserSettingsProps {
  me: Me
}

const UserSettings: React.FC<UserSettingsProps> = ({ me }) => {
  return (
    <Box>
      <LabelledInput mt={6} mb={5}>
        <Label>First name</Label>

        <Input
          f={4}
          placeholder="First name"
          autoFocus
          required
          value={me.first_name}
          flex={1}
        />
      </LabelledInput>
      <LabelledInput mt={6} mb={5}>
        <Label>Last name</Label>

        <Input
          f={4}
          placeholder="Last name"
          autoFocus
          required
          value={me.last_name}
          flex={1}
        />
      </LabelledInput>

      <LabelledInput mt={6} mb={5}>
        <Label>Email</Label>

        <Input
          f={4}
          placeholder="Email"
          autoFocus
          required
          value={me.email}
          flex={1}
        />
      </LabelledInput>

      {me.unconfirmed_email && me.unconfirmed_email !== '' && (
        <Box>
          <LabelledInput mt={6} mb={5}>
            <Label />
            <Input
              f={4}
              placeholder="Unconfirmed email address"
              readOnly
              disabled
              autoFocus
              value={me.unconfirmed_email}
              flex={1}
            />
          </LabelledInput>
          <LabelledInput mt={0} mb={5}>
            <Label />
            <Text f={2} mb={7}>
              Please check your email to confirm your new email address
            </Text>
          </LabelledInput>
        </Box>
      )}

      <LabelledInput mt={6} mb={5}>
        <Label>Password</Label>

        <Input f={4} placeholder="Password" flex={1} />
      </LabelledInput>
      <LabelledInput mt={6} mb={5}>
        <Label />

        <Input f={4} placeholder="Confirm password" flex={1} />
      </LabelledInput>

      {me.can.edit_profile_description && (
        <LabelledInput mt={8} mb={5}>
          <Label>About</Label>

          <Textarea
            name="bio"
            defaultValue={me.bio}
            placeholder="Bio"
            rows={4}
          />
        </LabelledInput>
      )}
    </Box>
  )
}

const UserSettingsContainer: React.FC = () => (
  <Query<MySettings> query={userSettingsQuery}>
    {({ data, error, loading }) => {
      if (error) {
        return <ErrorAlert>{error.message}</ErrorAlert>
      }

      if (loading) return <LoadingIndicator mt={6} f={8} />

      return <UserSettings me={data.me} />
    }}
  </Query>
)

export default UserSettingsContainer
