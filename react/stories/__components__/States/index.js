import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';

import provideChildrentWithProps from 'react/util/provideChildrenWithProps';

import Text from 'react/components/UI/Text';

const Container = styled.div`
  display: flex;
`;

const Example = styled.div.attrs({
  p: 3,
  m: 3,
})`
  ${space}
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default class States extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    states: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  render() {
    const { states, children } = this.props;

    return (
      <Container>
        {states.map(stateProps => (
          <Example>
            {provideChildrentWithProps(children, stateProps)}

            <Text font="mono" fontSize={1} p={5} color="gray.semiBold">
              {JSON.stringify(stateProps)}
            </Text>
          </Example>
        ))}
      </Container>
    );
  }
}
