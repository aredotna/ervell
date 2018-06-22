import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Swatch = styled.div`
  display: inline-block;
  height: 10em;
  width: 10em;
  vertical-align: top;
  border-radius: 0.25em;
  margin: 0 1em 1em 0;
  background-color: ${x => x.color};
`;


const ColorSwatch = ({ color, children }) => (
  <Swatch color={color}>
    {children}
  </Swatch>
);

ColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ColorSwatch;
