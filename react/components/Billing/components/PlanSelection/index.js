import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import planSelectionFragment from 'react/components/Billing/components/PlanSelection/fragments/planSelection';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import RadioOptions from 'react/components/UI/RadioOptions';
import PrivateBlocksMeter from 'react/components/PrivateBlocksMeter';

const OptionLabel = styled(Text).attrs({
  f: 4,
  mb: 2,
  color: 'gray.medium',
})`
  display: flex;
  justify-content: space-between;

  ${props => props.selected && `
    color: ${props.theme.colors.gray.bold};
  `}
`;

const Option = styled(Box)`
  &:hover ${OptionLabel} {
    color: black;
  }
`;

const OptionDescription = styled(Text).attrs({
  f: 2,
  color: 'gray.medium',
})`
  display: flex;
  justify-content: space-between;
`;

export default class PlanSelection extends Component {
  static propTypes = {
    me: propType(planSelectionFragment).isRequired,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
  }

  render() {
    const { onSelect, me, me: { customer } } = this.props;

    return (
      <RadioOptions value={customer.plan.id} onSelect={onSelect}>
        {({ selectedValue, ...rest }) => (
          <div>
            <RadioOptions.Option
              selectedValue={selectedValue}
              value="basic"
              disabled={customer.is_canceled || customer.is_lifetime}
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
                      Basic members are limited to 100 private blocks.
                    </span>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>

            {selectedValue === 'basic' &&
              <PrivateBlocksMeter me={me} my={6} ml={8} />
            }

            <RadioOptions.Option
              selectedValue={selectedValue}
              value="yearly"
              disabled={customer.is_canceled || customer.is_lifetime}
              {...rest}
            >
              {({ selected }) => (
                <Option>
                  <OptionLabel selected={selected}>
                    <strong>Yearly Premium</strong>
                    <strong>$3.75 / month</strong>
                  </OptionLabel>

                  <OptionDescription>
                    <Box width="75%">
                      Selected members can upload unlimited blocks,{' '}
                      hide from search engines, and gain access to new features.
                    </Box>

                    <Box textAlign="right">
                      $45 billed yearly
                    </Box>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>

            <RadioOptions.Option
              selectedValue={selectedValue}
              value="monthly"
              disabled={customer.is_canceled || customer.is_lifetime}
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
                      Selected members can upload unlimited blocks,{' '}
                      hide from search engines, and gain access to new features.
                    </Box>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>

            {customer.is_lifetime &&
              <RadioOptions.Option
                selectedValue={selectedValue}
                value="lifetime"
                disabled={customer.is_canceled || customer.is_lifetime}
                {...rest}
              >
                {({ selected }) => (
                  <Option>
                    <OptionLabel selected={selected}>
                      <strong>Lifetime Premium</strong>
                    </OptionLabel>

                    <OptionDescription>
                      <Box width="75%">
                        Selected members can upload unlimited blocks,{' '}
                        hide from search engines, and gain access to new features.
                      </Box>
                    </OptionDescription>
                  </Option>
                )}
              </RadioOptions.Option>
            }
          </div>
        )}
      </RadioOptions>
    );
  }
}
