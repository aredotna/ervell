import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SmallLink from 'react/components/UserDropdown/components/SecondaryLinks/components/SmallLink';
import SignOutLink from 'react/components/UserDropdown/components/SecondaryLinks/components/SignOutLink';
import Icons from 'react/components/UI/Icons';

export default class SecondaryLinks extends Component {
  static propTypes = {
    isPremium: PropTypes.bool,
    hasRecentlyJoined: PropTypes.bool,
  }

  static defaultProps = {
    isPremium: false,
    hasRecentlyJoined: false,
  }

  render() {
    const { isPremium, hasRecentlyJoined } = this.props;

    return (
      <div>
        {hasRecentlyJoined &&
          <SmallLink href="https://vimeo.com/318041294" target="_blank" fontWeight="bold">
            <span role="img" aria-label="graduation cap">🎓</span> Video tutorial <span role="img" aria-label="graduation cap">🎓</span>
          </SmallLink>
        }

        <SmallLink href="/settings">
          <Icons name="Cog" color="gray.medium" mr={4} />
          Settings
        </SmallLink>

        <SmallLink href="/tools">
          <Icons name="Tools" color="gray.medium" mr={4} />
          More tools
        </SmallLink>

        <SmallLink href="http://help.are.na">
          <Icons name="Question" color="gray.medium" mr={4} />
          Help / FAQs
        </SmallLink>

        <SmallLink href="/tools/send-invitation">
          <Icons name="Follow" color="gray.medium" mr={4} />
          Send an invite
        </SmallLink>

        <SmallLink href="/about">
          <Icons name="Info" color="gray.medium" mr={4} />
          About
        </SmallLink>

        {!isPremium &&
          <SmallLink fontWeight="bold" color="state.premium" href="/settings/billing">
            <Icons name="Medallion" color="state.premium" mr={4} />
            Upgrade to Premium
          </SmallLink>
        }

        <SignOutLink />
      </div>
    );
  }
}
