import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import profileMetadataInfoFragment from 'react/components/ProfileMetadata/components/ProfileMetadataInfo/fragments/profileMetadataInfo';

import Box from 'react/components/UI/Box';
import Pocket from 'react/components/UI/Pocket';
import { Expandable } from 'react/components/UI/ExpandableSet';
import ProfileLinkUnlessCurrent from 'react/components/ProfileMetadata/components/ProfileLinkUnlessCurrent';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

const Buttons = styled(Box).attrs({
  my: 6,
  neutralMarginsY: true,
})`
  a {
    display: block;
  }
`;

class ProfileMetadataInfo extends Component {
  static propTypes = {
    identifiable: propType(profileMetadataInfoFragment).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { identifiable, isLoggedIn } = this.props;

    return (
      <Pocket
        title={{
          User: 'Info',
          Group: 'Group Info',
        }[identifiable.__typename]}
      >
        <Expandable>
          <div dangerouslySetInnerHTML={{ __html: identifiable.about || '—' }} />
        </Expandable>

        {isLoggedIn && (identifiable.counts.followers > 0 || identifiable.counts.following > 1) &&
          <Buttons>
            {identifiable.counts.followers > 0 &&
              <ProfileLinkUnlessCurrent to={`${identifiable.href}/followers`}>
                Followers
              </ProfileLinkUnlessCurrent>
            }

            {/* Subtract 1 to ignore the default Are.na follow */}
            {(identifiable.counts.following - 1) > 0 &&
              <ProfileLinkUnlessCurrent to={`${identifiable.href}/following`}>
                Following
              </ProfileLinkUnlessCurrent>
            }
          </Buttons>
        }

        {identifiable.__typename === 'Group' &&
          <Box my={6} neutralMarginsY>
            {'Admin — '}

            <ProfileLinkUnlessCurrent to={identifiable.user.href}>
              {identifiable.user.name}
            </ProfileLinkUnlessCurrent>
          </Box>
        }
      </Pocket>
    );
  }
}

export default WithLoginStatus(ProfileMetadataInfo);
