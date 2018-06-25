import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { selectColor } from 'react/styles/Colors';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Swatch = styled.div`
  height: 2rem;
  width: 2rem;
  margin-right: 1em;
  background-color: ${selectColor};
`;

const Info = styled.div`
  flex: 1;
`;

const ColorSwatch = ({ color }) => (
  <Container>
    <Swatch color={color} />
    <Info>{color}</Info>
    <Info>{selectColor({ color })}</Info>
  </Container>
);

ColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorSwatch;
