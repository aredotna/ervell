import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';

import profileAvatarQuery from 'react/components/ProfileMetadata/components/ProfileAvatar/queries/profileAvatar';

import profileAvatarFragment from 'react/components/ProfileMetadata/components/ProfileAvatar/fragments/profileAvatar';

import Box from 'react/components/UI/Box';
import Avatar from 'react/components/ProfileMetadata/components/ProfileAvatar/components/Avatar';
import AvatarUploader from 'react/components/ProfileMetadata/components/ProfileAvatar/components/AvatarUploader';

export default class ProfileAvatar extends Component {
  static propTypes = {
    identifiable: propType(profileAvatarFragment).isRequired,
  }

  render() {
    const { identifiable, identifiable: { id, can, avatar } } = this.props;

    if (!can.update && !avatar) return '';

    return (
      <Query query={profileAvatarQuery} variables={{ id }}>
        {({ startPolling, stopPolling }) => (
          <Box mb={8} display="flex" alignItems="center" justifyContent="center">
            {!can.update &&
              <Avatar avatar={avatar} />
            }

            {can.update &&
              <AvatarUploader
                identifiable={identifiable}
                startPolling={startPolling}
                stopPolling={stopPolling}
              />
            }
          </Box>
        )}
      </Query>
    );
  }
}
