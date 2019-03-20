import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { buttonBorderWidth, BUTTON_BORDER_RADIUS } from 'react/components/UI/GenericButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

export const PlanSelect = styled(ButtonGroup)`
  flex: 1;
`;

export const Plan = styled.div`
  border-radius: ${BUTTON_BORDER_RADIUS};
  border: ${buttonBorderWidth} solid ${props => props.theme.colors.gray.medium};
  padding: ${props => props.theme.space[4]};
  flex: 1;
  height: 6em;
  cursor: pointer;
  position: relative;
  
  > div {
    color: ${props => props.theme.colors.gray.medium};
  }

  ${props => !props.selected && `
    &:hover {
      border-color: ${props.theme.colors.gray.semiBold};

      > div {
        color: ${props.theme.colors.gray.semiBold};
      }
    }
  `}

  ${props => props.selected && `
    border-color: ${props.theme.colors.gray.bold};
    z-index: 1;

    > div {
      color: ${props.theme.colors.gray.bold};
    }

    &:after {
      position: absolute;
      content: '✔';
      bottom: 0.25em;
      right: 0.25em;
    }
  `}
`;

export const PremiumPlan = styled(Plan)`
  ${props => props.selected && `
    border-color: ${props.theme.colors.state.premium};
    > div {
      color: ${props.theme.colors.state.premium};
    }

    &:after {
      color: ${props.theme.colors.state.premium};
    }
  `}

  ${props => !props.selected && `
    &:hover {
      border-color: ${props.theme.colors.state.premium};

      > div {
        color: ${props.theme.colors.state.premium};
      }
    }
  `}
  
`;

export default class PlanSelector extends Component {
  static propTypes = {
    selected: PropTypes.oneOf(['basic', 'premium']),
    onPlanSelect: PropTypes.func,
  }

  static defaultProps = {
    selected: 'basic',
    onPlanSelect: () => null,
  }

  state = {
    selected: this.props.selected,
  }

  onPlanSelect = (selected) => {
    this.setState({ selected });
    this.props.onPlanSelect(selected);
  }

  render() {
    const { selected } = this.state;

    return (
      <Box display="flex" justifyContent="center" my={7}>
        <PlanSelect>
          <Plan selected={selected === 'basic'} onClick={() => this.onPlanSelect('basic')}>
            <Text f={5} pb={2}>
              <strong>Basic</strong>
            </Text>
            <Text f={2}>
              Limited to 50 private blocks
            </Text>
            <Text f={1}>
              <strong>Free</strong>
            </Text>

          </Plan>
          <PremiumPlan selected={selected === 'premium'} onClick={() => this.onPlanSelect('premium')}>
            <Text f={5} pb={2}>
              <strong>Premium</strong>
            </Text>
            <Text f={1}>
              Unlimited private blocks + more
            </Text>
            <Text f={1}>
              <strong>$5/month or $45/year</strong>
            </Text>
          </PremiumPlan>
        </PlanSelect>
      </Box>
    );
  }
}
