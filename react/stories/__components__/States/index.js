import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, bgColor } from 'styled-system';

import provideChildrentWithProps from 'react/util/provideChildrenWithProps';

import Text from 'react/components/UI/Text';

const Container = styled.div`
  display: flex;
`;

const Example = styled.div.attrs({
  p: 4,
  m: 3,
})`
  ${space}
  ${bgColor}
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.25em;
`;

export default class States extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    states: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  render() {
    const { states, children, ...rest } = this.props;

    return (
      <Container>
        {states.map(stateProps => (
          <Example key={JSON.stringify(stateProps)} {...rest}>
            {provideChildrentWithProps(children, stateProps)}

            <Text font="mono" fontSize={1} px={5} pt={5} color="gray.semiBold" textAlign="center">
              {JSON.stringify(stateProps)}
            </Text>
          </Example>
        ))}
      </Container>
    );
  }
}
