import React, { Component } from 'react';
import { Query } from 'react-apollo';

import constants from 'react/styles/constants';

import profileTipsQuery from 'react/components/ProfileTips/queries/profileTips';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import ProfileTip from 'react/components/ProfileTips/components/ProfileTip';

export default class ProfileTips extends Component {
  render() {
    return (
      <Query query={profileTipsQuery}>
        {({ data, error, loading }) => {
          if (loading || error) return '';

          const { me } = data;

          return (
            <Box mt={8} mr={constants.doubleBlockGutter}>
              {!me.has_seen_classic_channels &&
                <ProfileTip name="has_seen_classic_channels">
                  Infographics, cyberfeminism, and unschooling and more:{' '}

                  <strong>
                    <a href="/examples">
                      See what other people are thinking about on Are.na
                    </a>
                  </strong>
                </ProfileTip>
              }

              {!me.has_seen_bookmarklet_message &&
                <ProfileTip name="has_seen_bookmarklet_message">
                  Save to Are.na faster with{' '}

                  <strong>
                    <a href="/tools/bookmarklet">
                      the bookmarklet
                    </a>
                  </strong>
                </ProfileTip>
              }
            </Box>
          );
        }}
      </Query>
    );
  }
}
