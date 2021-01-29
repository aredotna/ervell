import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import RadioOptions from 'v2/components/UI/RadioOptions'
import PrivateBlocksMeter from 'v2/components/PrivateBlocksMeter'
import TotalBlocksMeter from 'v2/components/TotalBlocksMeter'
import { PlanSelection as PlanSelectionType } from '__generated__/PlanSelection'

const OptionLabel = styled(Text).attrs({
  f: 4,
  mb: 2,
  color: 'gray.bold',
})`
  display: flex;
  justify-content: space-between;

  ${props =>
    props.selected &&
    `
    color: ${props.theme.colors.gray.extraBold};
  `}
`

const Option = styled(Box)`
  &:hover ${OptionLabel} {
    color: ${props => props.theme.colors.gray.extraBold};
  }
`

const OptionDescription = styled(Text).attrs({
  f: 2,
  color: 'gray.bold',
})`
  display: flex;
  justify-content: space-between;
`

const Link = styled.a`
  display: block;
  &:hover {
    color: ${props => props.theme.colors.gray.extraBold};
  }
`

interface PlanSelectionProps {
  me: PlanSelectionType
  onSelect: (plan_id: any) => void
  plan_id?: string
}

const PlanSelection: React.FC<PlanSelectionProps> = props => {
  const {
    onSelect,
    plan_id,
    me,
    me: { customer },
  } = props
  const planId = plan_id || customer.plan?.id

  // TODO: Extract into actual can field
  const plansDisabled =
    customer.is_canceled || customer.is_lifetime || customer.is_beneficiary

  return (
    <RadioOptions value={planId} onSelect={onSelect}>
      {({ selectedValue, ...rest }) => (
        <div>
          {!customer.can_select_lifetime && (
            <RadioOptions.Option
              selectedValue={selectedValue}
              value="basic"
              disabled={plansDisabled}
              {...rest}
            >
              {({ selected }) => (
                <Option>
                  <OptionLabel selected={selected}>
                    <strong>Basic</strong>
                    <strong>Free</strong>
                  </OptionLabel>

                  <OptionDescription>
                    <span>
                      Basic members are limited to{' '}
                      {me.non_premium_private_connections_limit} private blocks{' '}
                      and {me.non_premium_connections_limit} total blocks.
                    </span>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>
          )}

          {selectedValue === 'basic' && (
            <Box ml={8} mb={6}>
              <PrivateBlocksMeter me={me} my={6} />
              <TotalBlocksMeter me={me} my={6} />

              <Text mt={5} f={3} color="state.premium">
                Premium members can upload unlimited private blocks, Reader
                mode, hide from search engines, and more.
              </Text>

              <Text mt={5} f={2} color="state.premium" fontWeight="bold">
                <Link href="/pricing" target="_blank">
                  Learn more about Premium
                </Link>
                <Link href="/blog/building-together" target="_blank">
                  Learn more about the new block limits
                </Link>
              </Text>
            </Box>
          )}

          {!customer.can_select_lifetime && (
            <RadioOptions.Option
              selectedValue={selectedValue}
              value="yearly"
              disabled={plansDisabled}
              {...rest}
            >
              {({ selected }) => (
                <Option>
                  <OptionLabel selected={selected}>
                    <strong>Annual Premium</strong>
                    <strong>$3.75 / month</strong>
                  </OptionLabel>

                  <OptionDescription>
                    <Box width="75%">
                      Premium members can upload unlimited blocks, hide from
                      search engines, and gain access to new features.
                    </Box>

                    <Box textAlign="right">$45 billed annually</Box>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>
          )}

          {!customer.can_select_lifetime && (
            <RadioOptions.Option
              selectedValue={selectedValue}
              value="monthly"
              disabled={plansDisabled}
              {...rest}
            >
              {({ selected }) => (
                <Option>
                  <OptionLabel selected={selected}>
                    <strong>Monthly Premium</strong>
                    <strong>$5 / month</strong>
                  </OptionLabel>

                  <OptionDescription>
                    <Box width="75%">
                      Premium members can upload unlimited blocks, hide from
                      search engines, and gain access to new features.
                    </Box>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>
          )}

          {(customer.is_lifetime || customer.can_select_lifetime) && (
            <RadioOptions.Option
              selectedValue={selectedValue}
              value="lifetime"
              disabled={customer.is_lifetime}
              {...rest}
            >
              {({ selected }) => (
                <Option>
                  <OptionLabel selected={selected}>
                    <strong>Lifetime Premium</strong>
                    <strong>Free</strong>
                  </OptionLabel>

                  <OptionDescription>
                    <Box width="75%">
                      Premium members can upload unlimited blocks, hide from
                      search engines, and gain access to new features.
                    </Box>
                    <Box textAlign="right">Forever</Box>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>
          )}

          <RadioOptions.Option
            selectedValue={selectedValue}
            value="plus_yearly"
            {...rest}
          >
            {({ selected }) => (
              <Option>
                <OptionLabel selected={selected}>
                  <strong>
                    <Text color="state.supporter">Premium Supporter</Text>
                  </strong>
                  <strong>$120 / year</strong>
                </OptionLabel>

                <OptionDescription>
                  <Box width="75%">
                    All the features of Are.na Premium plus a free Are.na
                    Annual, early access to new features, special events, a
                    custom badge and bi-annual reports.
                  </Box>
                </OptionDescription>
              </Option>
            )}
          </RadioOptions.Option>
        </div>
      )}
    </RadioOptions>
  )
}

export default PlanSelection
