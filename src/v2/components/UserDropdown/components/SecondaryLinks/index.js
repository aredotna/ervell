import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import SmallLink from 'v2/components/UserDropdown/components/SecondaryLinks/components/SmallLink'
import SignOutLink from 'v2/components/UserDropdown/components/SecondaryLinks/components/SignOutLink'
import Icons from 'v2/components/UI/Icons'

export default class SecondaryLinks extends PureComponent {
  static propTypes = {
    isPremium: PropTypes.bool,
    hasRecentlyJoined: PropTypes.bool,
  }

  static defaultProps = {
    isPremium: false,
    hasRecentlyJoined: false,
  }

  render() {
    const { isPremium, hasRecentlyJoined } = this.props

    return (
      <React.Fragment>
        {hasRecentlyJoined && (
          <SmallLink
            href="https://vimeo.com/318041294"
            target="_blank"
            fontWeight="bold"
          >
            <Icons name="Cap" size="1rem" color="gray.medium" mr={4} />
            Video tutorial
          </SmallLink>
        )}

        <SmallLink href="/settings">
          <Icons name="Cog" size="1rem" color="gray.medium" mr={4} />
          Settings
        </SmallLink>

        <SmallLink href="/tools">
          <Icons name="Tools" size="1rem" color="gray.medium" mr={4} />
          Install browser extension
        </SmallLink>

        <SmallLink href="/tools/send-invitation">
          <Icons name="Follow" size="1rem" color="gray.medium" mr={4} />
          Send an invite
        </SmallLink>

        <SmallLink href="http://help.are.na">
          <Icons name="Question" size="1rem" color="gray.medium" mr={4} />
          Help / FAQs
        </SmallLink>

        <SmallLink href="http://store.are.na">
          <Icons name="CircleFilled" size="1rem" color="gray.medium" mr={4} />
          Store / Gift shop
        </SmallLink>

        <SmallLink href="/about">
          <Icons name="Info" size="1rem" color="gray.medium" mr={4} />
          About
        </SmallLink>

        {!isPremium && (
          <SmallLink
            fontWeight="bold"
            color="state.premium"
            href="/settings/billing"
          >
            <Icons name="Medallion" size="1rem" color="state.premium" mr={4} />
            Upgrade to Premium
          </SmallLink>
        )}

        <SignOutLink />
      </React.Fragment>
    )
  }
}
