import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

import planSelectionFragment from 'v2/components/Billing/components/PlanSelection/fragments/planSelection'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import RadioOptions from 'v2/components/UI/RadioOptions'
import PrivateBlocksMeter from 'v2/components/PrivateBlocksMeter'

const OptionLabel = styled(Text).attrs({
  f: 4,
  mb: 2,
  color: 'gray.medium',
})`
  display: flex;
  justify-content: space-between;

  ${props =>
    props.selected &&
    `
    color: ${props.theme.colors.gray.bold};
  `}
`

const Option = styled(Box)`
  &:hover ${OptionLabel} {
    color: black;
  }
`

const OptionDescription = styled(Text).attrs({
  f: 2,
  color: 'gray.medium',
})`
  display: flex;
  justify-content: space-between;
`

export default class PlanSelection extends PureComponent {
  static propTypes = {
    me: propType(planSelectionFragment).isRequired,
    onSelect: PropTypes.func,
    plan_id: PropTypes.string,
  }

  static defaultProps = {
    plan_id: null,
  }

  static defaultProps = {
    onSelect: () => {},
  }

  render() {
    const {
      onSelect,
      plan_id,
      me,
      me: { customer },
    } = this.props
    const planId = plan_id || customer.plan.id

    // TODO: Extract into actual can field
    const canManagePlan =
      customer.is_canceled || customer.is_lifetime || customer.is_beneficiary

    return (
      <RadioOptions value={planId} onSelect={onSelect}>
        {({ selectedValue, ...rest }) => (
          <div>
            <RadioOptions.Option
              selectedValue={selectedValue}
              value="basic"
              disabled={canManagePlan}
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
                      {me.non_premium_private_connections_limit} private blocks.
                    </span>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>

            {selectedValue === 'basic' && (
              <PrivateBlocksMeter me={me} my={6} ml={8} />
            )}

            <RadioOptions.Option
              selectedValue={selectedValue}
              value="yearly"
              disabled={canManagePlan}
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

            <RadioOptions.Option
              selectedValue={selectedValue}
              value="monthly"
              disabled={canManagePlan}
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

            {customer.is_lifetime && (
              <RadioOptions.Option
                selectedValue={selectedValue}
                value="lifetime"
                disabled
                {...rest}
              >
                {({ selected }) => (
                  <Option>
                    <OptionLabel selected={selected}>
                      <strong>Lifetime Premium</strong>
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
          </div>
        )}
      </RadioOptions>
    )
  }
}
