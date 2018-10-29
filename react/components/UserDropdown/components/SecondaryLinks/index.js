import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'react/components/UserDropdown/components/Link';

const SmallLink = styled(Link).attrs({
  f: 2,
  fontWeight: 'normal',
})`
`;

export default class SecondaryLinks extends Component {
  static propTypes = {
    isPremium: PropTypes.bool.isRequired,
  }

  signOut = () => {
    window.localStorage.clear();
    window.location.href = '/me/sign_out';
  }

  render() {
    const { isPremium } = this.props;

    return (
      <div>
        <SmallLink href="/settings">
          Settings
        </SmallLink>

        <SmallLink href="/tools">
          More tools
        </SmallLink>

        <SmallLink href="http://help.are.na">
          Help / FAQs
        </SmallLink>

        <SmallLink href="/tools/send-invitation">
          Send an invite
        </SmallLink>

        <SmallLink href="/about">
          About
        </SmallLink>

        {!isPremium &&
          <SmallLink color="state.premium" href="/pricing">
            Premium features
          </SmallLink>
        }

        <SmallLink onClick={this.signOut}>
          Log Out
        </SmallLink>
      </div>
    );
  }
}
