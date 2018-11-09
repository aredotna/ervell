import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import RadioOptions from 'react/components/UI/RadioOptions';

const Option = styled(Box)`
`;

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

const OptionDescription = styled(Text).attrs({
  f: 2,
  color: 'gray.medium',
})`
  display: flex;
  justify-content: space-between;
`;

export default class PlanSelection extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
  }

  render() {
    const { onSelect } = this.props;

    return (
      <RadioOptions value="basic" onSelect={onSelect}>
        <RadioOptions.Option value="basic">
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

        <RadioOptions.Option value="yearly">
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

        <RadioOptions.Option value="monthly">
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

                <Box textAlign="right">
                  billed monthly
                </Box>
              </OptionDescription>
            </Option>
          )}
        </RadioOptions.Option>
      </RadioOptions>
    );
  }
}
