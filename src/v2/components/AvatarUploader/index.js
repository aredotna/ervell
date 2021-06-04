import React, { PureComponent } from 'react'
import { Query } from '@apollo/client/react/components'

import avatarQuery from 'v2/components/AvatarUploader/queries/avatar'

import Uploader from 'v2/components/AvatarUploader/components/Uploader'

export default class AvatarUploader extends PureComponent {
  render() {
    return (
      <Query query={avatarQuery} ssr={false}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) {
            return null
          }

          if (error) {
            return null
          }

          const { me } = data

          return (
            <Uploader
              me={me}
              startPolling={startPolling}
              stopPolling={stopPolling}
            />
          )
        }}
      </Query>
    )
  }
}
