import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.div`
  font-size: ${x => x.theme.fontSizes[1]};
  line-height: 1;
  font-family: ${x => x.theme.fonts.mono};
  color: ${x => x.theme.colors.gray.base};
  margin-left: ${x => x.theme.space[5]};
`;

const Ruler = styled.div`
  height: ${x => x.height};
  width: 1em;
  background-color: ${x => x.theme.colors.gray.base};
`;

export default class Measurement extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const { value, name } = this.props;

    return (
      <Container>
        <Ruler height={value} />

        <Label>
          {name} = {value} = {parseFloat(value) * 16}px (@1rem = 16px)
        </Label>
      </Container>
    );
  }
}
