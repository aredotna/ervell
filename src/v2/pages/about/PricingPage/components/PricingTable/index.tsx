import React from 'react'
import styled from 'styled-components'

import constants from 'v2/styles/constants'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'

import useSerializedMe from 'v2/hooks/useSerializedMe'
import { useQuery } from '@apollo/client'
import { PlansQuery } from './queries/plansQuery'
import { Plans } from '__generated__/Plans'

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
  max-width: 21em;
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
  f: [3, 3, 3, 4],
  flex: 1,
  mt: 9,
  px: 'auto',
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
  background-color: ${x => x.theme.colors.state.supporter};
  border-color: ${x => x.theme.colors.state.supporter};
  color: white;

  &:hover {
    border-color: ${x => x.theme.colors.state.supporter};
    background-color: ${props => props.theme.colors.background};
    color: ${x => x.theme.colors.state.supporter};
  }
`

const Features = styled(Box).attrs({
  mt: 7,
})``

const Feature = styled(Text).attrs({
  f: [1, 1, 4, 4],
  py: 3,
  color: 'gray.extraBold',
})``

export const centsToDollars = cents =>
  (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

const PricingTable: React.FC = () => {
  const currentUser = useSerializedMe()
  const isLoggedIn = currentUser && !!currentUser.id
  const isPremium = currentUser.is_premium
  const isSupporter = currentUser.is_supporter

  const { data } = useQuery<Plans>(PlansQuery)

  const signUpLink = isLoggedIn ? '/' : '/sign_up'
  const signUpCopy = isLoggedIn ? '👍 Thank you!' : 'Sign up'

  const premiumYearlyPrice = centsToDollars(
    data?.plans.find(plan => plan.id === 'yearly')?.amount
  )
  const premiumMonthlyPrice = centsToDollars(
    data?.plans.find(plan => plan.id === 'monthly')?.amount
  )
  const supporterYearlyPrice = centsToDollars(
    data?.plans.find(plan => plan.id === 'plus_yearly')?.amount
  )

  const premiumButtonCopy = (() => {
    if (isPremium) {
      return '👍 Thank you!'
    } else if (isLoggedIn) {
      return 'Go Premium'
    } else {
      return 'Join w/ Premium'
    }
  })()

  const supporterButtonCopy = (() => {
    if (isSupporter) {
      return '👍 Thank you!'
    } else if (isLoggedIn) {
      return 'Upgrade to Supporter'
    } else {
      return 'Join as Supporter'
    }
  })()

  const premiumLink = isLoggedIn ? '/settings/billing' : '/sign_up/premium'
  const supporterLink = isLoggedIn ? '/settings/billing' : '/sign_up/premium'

  return (
    <Table>
      <Cell>
        <PlanTitle color="state.premium">Premium</PlanTitle>
        <PlanPrice>${premiumMonthlyPrice} / month</PlanPrice>
        <PlanSubPrice>or ${premiumYearlyPrice} / year</PlanSubPrice>
        <PremiumButton href={premiumLink} disabled={isPremium}>
          {premiumButtonCopy}
        </PremiumButton>
        <Features>
          <Feature fontWeight="bold">
            Unlimited public and private blocks
          </Feature>
          <Feature fontWeight="bold">
            Extract content for links and articles
          </Feature>
          <Feature fontWeight="bold">
            Table / spreadsheet view for channels
          </Feature>
          <Feature fontWeight="bold">Hide from search engines</Feature>
          <Feature fontWeight="bold">Priority support</Feature>
        </Features>
      </Cell>
      <Cell>
        <PlanTitle color="state.supporter">Premium Supporter</PlanTitle>
        <PlanPrice>${supporterYearlyPrice} / year</PlanPrice>
        <PlanSubPrice dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
        <GroupButton href={supporterLink}>{supporterButtonCopy}</GroupButton>
        <Features>
          <Feature fontWeight="bold">Early access to new features</Feature>
          <Feature fontWeight="bold">Free Are.na Annual</Feature>
          <Feature fontWeight="bold">Bi-annual company reports</Feature>
          <Feature fontWeight="bold">
            The fuzzy feeling of giving a little extra to support an independent
            company
          </Feature>
          <Feature>All premium features</Feature>
        </Features>
      </Cell>
      <Cell>
        <PlanTitle>Standard</PlanTitle>
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
          <Feature>Up to 200 total blocks*</Feature>
        </Features>
      </Cell>
    </Table>
  )
}

export default PricingTable
