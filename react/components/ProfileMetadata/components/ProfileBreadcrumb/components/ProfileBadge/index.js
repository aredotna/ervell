import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Styles from 'react/styles';

import profileBadgeFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge/fragments/profileBadge';

import ArenaMark from 'react/components/UI/ArenaMark/index.svg';

const PATH_FONT_SIZE = Styles.Type.size.h3;
const CALCULATED_FONT_SIZE = `${100 / parseFloat(PATH_FONT_SIZE)}%`;
const LOGO_WIDTH = '0.66em';

const Container = styled.a`
  position: relative;
  display: inline-block;
  margin: 0 0 0 ${Styles.Constants.emptySpaceWidth};
  width: ${LOGO_WIDTH};
  height: ${PATH_FONT_SIZE};
  vertical-align: bottom;

  > span {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    &:first-child {
      display: none;
    }

    &:last-child {
      display: block;
    }
  }

  &:hover > span {
    &:first-child {
      display: block;
    }

    &:last-child {
      display: none;
    }
  }
`;

const Label = styled.span`
  font-family: 'Arial Narrow', 'Arial', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: ${x => Styles.Colors.state[x.type]};
  font-size: ${CALCULATED_FONT_SIZE};

  > span {
    vertical-align: middle;
  }
`;

const Mark = styled.span`
  display: inline-block;
  width: ${LOGO_WIDTH};
  height: 100%;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: ${x => Styles.Colors.state[x.type]};
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
        <Label type={badge}>
          <span>{badge}</span>
        </Label>

        <Mark type={badge}>
          <ArenaMark />
        </Mark>
      </Container>
    );
  }
}
