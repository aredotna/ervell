import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SmallLink from 'react/components/UserDropdown/components/SecondaryLinks/components/SmallLink';
import SignOutLink from 'react/components/UserDropdown/components/SecondaryLinks/components/SignOutLink';

export default class SecondaryLinks extends Component {
  static propTypes = {
    isPremium: PropTypes.bool,
  }

  static defaultProps = {
    isPremium: false,
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
          <SmallLink fontWeight="bold" color="state.premium" href="/settings/billing">
            Upgrade to Premium
          </SmallLink>
        }

        <SignOutLink />
      </div>
    );
  }
}
