import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import profileMetadataInfoFragment from 'react/components/ProfileMetadata/components/ProfileMetadataInfo/fragments/profileMetadataInfo';

import Pocket from 'react/components/UI/Pocket';

const Link = styled.a`
  display: block;
`;

export default class ProfileMetadataInfo extends Component {
  static propTypes = {
    user: propType(profileMetadataInfoFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <Pocket title="Info">
        {user.counts.followers > 0 &&
          <Link href={`${user.href}/followers`}>
            Followers
          </Link>
        }

        {user.counts.following > 0 &&
          <Link href={`${user.href}/following`}>
            Following
          </Link>
        }
      </Pocket>
    );
  }
}
