import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import styles from 'react/styles';

import profileMetadataInfoFragment from 'react/components/ProfileMetadata/components/ProfileMetadataInfo/fragments/profileMetadataInfo';

import Pocket from 'react/components/UI/Pocket';
import Expandable from 'react/components/UI/Expandable';

const N_LINES = 5;
const FIVE_LINES = `${styles.Type.functions.calculateLineHeight('xs', 'tall') * N_LINES}rem`;

const Link = styled.a`
  display: block;
`;

const About = styled.div`
  margin-bottom: 1em;
`;

export default class ProfileMetadataInfo extends Component {
  static propTypes = {
    user: propType(profileMetadataInfoFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <Pocket title="Info">
        {user.about &&
          <Expandable height={FIVE_LINES}>
            <About dangerouslySetInnerHTML={{ __html: user.about }} />
          </Expandable>
        }

        {user.counts.followers > 0 &&
          <Link href={`${user.href}/followers`}>
            Followers
          </Link>
        }

        {/* Subtract 1 to ignore the default Are.na follow */}
        {(user.counts.following - 1) > 0 &&
          <Link href={`${user.href}/following`}>
            Following
          </Link>
        }
      </Pocket>
    );
  }
}
