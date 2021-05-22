import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { Query } from '@apollo/client/react/components'

import profileAvatarQuery from 'v2/components/ProfileMetadata/components/ProfileAvatar/queries/profileAvatar'

import profileAvatarFragment from 'v2/components/ProfileMetadata/components/ProfileAvatar/fragments/profileAvatar'

import Box from 'v2/components/UI/Box'
import Avatar from 'v2/components/ProfileMetadata/components/ProfileAvatar/components/Avatar'
import AvatarUploader from 'v2/components/ProfileMetadata/components/ProfileAvatar/components/AvatarUploader'

export default class ProfileAvatar extends Component {
  static propTypes = {
    identifiable: propType(profileAvatarFragment).isRequired,
  }

  render() {
    const {
      identifiable,
      identifiable: { id, can, avatar },
    } = this.props

    if (!can.update && !avatar) return ''

    return (
      <Query query={profileAvatarQuery} variables={{ id }}>
        {({ startPolling, stopPolling }) => (
          <Box
            mb={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {!can.update && <Avatar avatar={avatar} />}

            {can.update && (
              <AvatarUploader
                identifiable={identifiable}
                startPolling={startPolling}
                stopPolling={stopPolling}
              />
            )}
          </Box>
        )}
      </Query>
    )
  }
}
