import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import constants from 'v2/styles/constants'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'

import WithSerializedMe from 'v2/hocs/WithSerializedMe'

const Table = styled(Box).attrs({ mb: 7 })`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${constants.media.mobile`
    align-items: center;
    flex-direction: column;
  `}
`

const Cell = styled(Box).attrs({
  py: [8, 6, 6],
  px: [7, 6, 6],
  width: [1, 1 / 3, 1 / 2],
})`
  display: flex;
  flex-direction: column;
  max-width: 20em;
  border-right: 2px solid ${x => x.theme.colors.gray.light};

  &:last-child {
    border-right-color: transparent;
  }

  ${constants.media.mobile`
    border-right: none;
    border-bottom: 2px solid ${x => x.theme.colors.gray.light};
  `}
`

const PlanTitle = styled(Text).attrs({
  f: 2,
  fontWeight: 'bold',
})``

const PlanPrice = styled(Text).attrs({
  f: 7,
  fontWeight: 'bold',
  color: 'gray.extraBold',
  pt: 4,
})``

const PlanSubPrice = styled(Text).attrs({
  f: 4,
  color: 'gray.base',
})``

const CTAButton = styled(Button).attrs({
  f: 5,
  flex: 1,
  mt: 9,
})``

const PremiumButton = styled(CTAButton)`
  background-color: ${x => x.theme.colors.state.premium};
  border-color: ${x => x.theme.colors.state.premium};
  color: white;

  &:hover {
    border-color: ${x => x.theme.colors.state.premium};
    background-color: ${props => props.theme.colors.background};
    color: ${x => x.theme.colors.state.premium};
  }
`

const GroupButton = styled(CTAButton)`
  background-color: ${x => x.theme.colors.gray.base};
  border-color: ${x => x.theme.colors.gray.base};
  color: white;

  &:hover {
    border-color: ${x => x.theme.colors.gray.base};
    background-color: ${props => props.theme.colors.background};
    color: ${x => x.theme.colors.gray.base};
  }
`

const Features = styled(Box).attrs({
  mt: 7,
})``

const Feature = styled(Text).attrs({
  f: 4,
  py: 3,
  color: 'gray.extraBold',
})``

class PricingTable extends PureComponent {
  static propTypes = {
    serializedMe: PropTypes.shape({
      id: PropTypes.number,
      is_premium: PropTypes.bool,
    }),
  }

  render() {
    const { serializedMe } = this.props

    const isLoggedIn = serializedMe && serializedMe.id !== null
    const isPremium = isLoggedIn && serializedMe.is_premium

    const signUpLink = isLoggedIn ? '/' : '/sign_up'
    const signUpCopy = isLoggedIn ? '👍 Thank you!' : 'Sign up'

    const premiumButtonCopy = (() => {
      if (isPremium) {
        return '👍 Thank you!'
      } else if (isLoggedIn) {
        return 'Go Premium'
      } else {
        return 'Join w/ Premium'
      }
    })()

    const premiumLink = isLoggedIn ? '/settings/billing' : '/sign_up/premium'

    const groupLink = isLoggedIn ? '/getting-started-with-groups' : '/sign_up'

    return (
      <Table>
        <Cell>
          <PlanTitle>Are.na</PlanTitle>
          <PlanPrice>Free</PlanPrice>
          <PlanSubPrice>&nbsp;</PlanSubPrice>
          <CTAButton
            color="gray.extraBold"
            href={signUpLink}
            disabled={isLoggedIn}
          >
            {signUpCopy}
          </CTAButton>
          <Features>
            <Feature>Up to 500 total blocks*</Feature>
            <Feature>Up to 50 private blocks</Feature>
          </Features>
        </Cell>
        <Cell>
          <PlanTitle color="state.premium">Are.na Premium</PlanTitle>
          <PlanPrice>$5 / month</PlanPrice>
          <PlanSubPrice>or $45 / year</PlanSubPrice>
          <PremiumButton href={premiumLink} disabled={isPremium}>
            {premiumButtonCopy}
          </PremiumButton>
          <Features>
            <Feature fontWeight="bold">
              Unlimited public and private blocks
            </Feature>
            <Feature fontWeight="bold">Hide from search engines</Feature>
            <Feature fontWeight="bold">Reader mode</Feature>
            <Feature fontWeight="bold">Priority support</Feature>
          </Features>
        </Cell>
        <Cell>
          <PlanTitle color="state.premium">Are.na Premium (Team)</PlanTitle>
          <PlanPrice>$5 / user / month</PlanPrice>
          <PlanSubPrice>or $45 / user / year</PlanSubPrice>
          <GroupButton href={groupLink}>Create group</GroupButton>
          <Features>
            <Feature>Unlimited public and private blocks</Feature>

            <Feature>Hide from search engines</Feature>
            <Feature>Reader mode</Feature>
            <Feature>Priority support</Feature>
            <Feature fontWeight="bold">Upgrade team members</Feature>
          </Features>
        </Cell>
      </Table>
    )
  }
}

export default WithSerializedMe(PricingTable)
