import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'

import customBadgeQuery from 'v2/components/CustomBadgeUploader/queries/customBadge'

import Uploader from 'v2/components/CustomBadgeUploader/components/Uploader'

export default class CustomBadgeUploader extends PureComponent {
  render() {
    return (
      <Query query={customBadgeQuery} ssr={false}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) {
            return <span />
          }

          if (error) {
            return <span />
          }

          const { me } = data

          if (!me.can.set_custom_badge) {
            return <span />
          }

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
