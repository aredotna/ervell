import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';

import customBadgeQuery from 'react/components/CustomBadgeUploader/queries/customBadge';

import Uploader from 'react/components/CustomBadgeUploader/components/Uploader';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';

export default class CustomBadgeUploader extends PureComponent {
  render() {
    return (
      <Query query={customBadgeQuery} ssr={false}>
        {({
          loading, error, data, startPolling, stopPolling,
        }) => {
          if (loading) {
            return (
              <LoadingIndicator p={6} />
            );
          }

          if (error) {
            return (
              <ErrorAlert m={6}>
                {error.message}
              </ErrorAlert>
            );
          }

          const { me } = data;

          return (
            <Uploader
              me={me}
              startPolling={startPolling}
              stopPolling={stopPolling}
            />
          );
        }}
      </Query>
    );
  }
}
