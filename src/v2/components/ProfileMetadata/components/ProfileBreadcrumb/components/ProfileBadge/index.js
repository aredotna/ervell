import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'
import sharify from 'sharify'

const {
  data: { APP_URL },
} = sharify

import constants from 'v2/styles/constants'

import profileBadgeFragment from 'v2/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge/fragments/profileBadge'

import ArenaMark from 'v2/components/UI/Icons/ArenaMark.svg'

const Container = styled.a`
  position: relative;
  display: block;
  margin: 0 0 0 ${constants.emptySpaceWidth};
`

const CustomBadge = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`

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
`

const Label = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.colors.background};

  font-family: 'Arial Narrow', 'Arial', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: ${x => x.theme.colors.state[x.type]};
  font-size: 0.5em;

  opacity: 0;
  &:hover {
    opacity: 1;
  }
`

const HREFS = {
  premium: `${APP_URL}/pricing`,
  investor: `${APP_URL}/blog/hello%20world/2018/03/21/announcing-crowdfunding-campaign.html`,
  supporter: `${APP_URL}/roadmap`,
}

export default class ProfileBadge extends Component {
  static propTypes = {
    user: propType(profileBadgeFragment).isRequired,
  }

  render() {
    const {
      user: { badge, custom_badge },
    } = this.props

    if (!badge) return <span />

    return (
      <Container href={HREFS[badge]} target="_blank">
        {custom_badge && <CustomBadge src={custom_badge} alt={badge} />}

        {!custom_badge && (
          <Mark type={badge}>
            <ArenaMark />
          </Mark>
        )}

        <Label type={badge}>
          <span>{badge}</span>
        </Label>
      </Container>
    )
  }
}
