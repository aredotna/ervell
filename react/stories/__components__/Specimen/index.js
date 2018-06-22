import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1em 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Specimen = ({ children }) => (
  <Container>
    {children}
  </Container>
);

Specimen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Specimen;
