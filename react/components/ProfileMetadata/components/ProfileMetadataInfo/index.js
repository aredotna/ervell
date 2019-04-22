import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import profileMetadataInfoFragment from 'react/components/ProfileMetadata/components/ProfileMetadataInfo/fragments/profileMetadataInfo';

import Box from 'react/components/UI/Box';
import Pocket from 'react/components/UI/Pocket';
import { Expandable } from 'react/components/UI/ExpandableSet';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

const BlockLink = styled(Link)`
  display: inline-block;
`;

const NormalBlockLink = styled.a`
  display: inline-block;
`;

const InfoLine = styled(Box).attrs({ pr: 4 })``;

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

    const showButtons = (isLoggedIn && (
      identifiable.counts.followers > 0 ||
      identifiable.counts.following > 1 ||
      identifiable.counts.groups > 0)
    );

    return (
      <Pocket
        title={{
          User: 'Info',
          Group: 'Group Info',
        }[identifiable.__typename]}
      >
        <Expandable>
          <InfoLine dangerouslySetInnerHTML={{ __html: identifiable.about || '—' }} />
        </Expandable>

        {identifiable.__typename === 'Group' &&
          <Box my={6} neutralMarginsY>
            {'Admin: '}

            <NormalBlockLink href={identifiable.user.href}>
              {identifiable.user.name}
            </NormalBlockLink>
          </Box>
        }

        {showButtons &&
          <Buttons>
            {identifiable.counts.followers > 0 &&
              <BlockLink to={`${identifiable.href}/followers`}>
                Followers
              </BlockLink>
            }

            {/* Subtract 1 to ignore the default Are.na follow */}
            {(identifiable.counts.following - 1) > 0 &&
              <BlockLink to={`${identifiable.href}/following`}>
                Following
              </BlockLink>
            }

            {identifiable.counts.groups > 0 &&
              <BlockLink to={`${identifiable.href}/groups`}>
                Groups
              </BlockLink>
            }
          </Buttons>
        }
      </Pocket>
    );
  }
}

export default WithLoginStatus(ProfileMetadataInfo);
