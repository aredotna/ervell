import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import constants from 'react/styles/constants';

import profileBadgeFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge/fragments/profileBadge';

import ArenaMark from 'react/components/UI/Icon/ArenaMark/index.svg';

const Container = styled.a`
  position: relative;
  display: block;
  margin: 0 0 0 ${constants.emptySpaceWidth};
`;

const Mark = styled.div`
  position: relative;
  width: 1em;
  height: 1em;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 75%;
    height: 100%;
    fill: ${x => x.theme.colors.state[x.type]};
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: white;

  font-family: 'Arial Narrow', 'Arial', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: ${x => x.theme.colors.state[x.type]};
  font-size: 0.5em;

  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const HREFS = {
  premium: 'https://www.are.na/tools/premium',
  investor: 'https://www.are.na/blog/hello%20world/2018/03/21/announcing-crowdfunding-campaign.html',
};

export default class ProfileBadge extends Component {
  static propTypes = {
    user: propType(profileBadgeFragment).isRequired,
  }

  render() {
    const { user: { badge } } = this.props;

    if (!badge) return <span />;

    return (
      <Container href={HREFS[badge]} target="_blank">
        <Mark type={badge}>
          <ArenaMark />
        </Mark>

        <Label type={badge}>
          <span>{badge}</span>
        </Label>
      </Container>
    );
  }
}
