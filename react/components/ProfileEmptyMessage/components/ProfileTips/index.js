import React, { Component } from 'react';
import { Query } from 'react-apollo';

import profileTipsQuery from 'react/components/ProfileEmptyMessage/components/ProfileTips/queries/profileTips';

import Text from 'react/components/UI/Text';
import ProfileTip from 'react/components/ProfileEmptyMessage/components/ProfileTip';

export default class ProfileTips extends Component {
  render() {
    return (
      <Query query={profileTipsQuery}>
        {({ data, error, loading }) => {
          if (loading || error) return '';

          const { me } = data;

          return (
            <div>
              <Text f={6} mt={8} mb={6} color="gray.medium" lineHeight={2} neutralMarginsY={false}>
                Welcome to Are.na, this is your profile.{' '}
                All of your channels and content will show up here.
              </Text>

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
            </div>
          );
        }}
      </Query>
    );
  }
}
