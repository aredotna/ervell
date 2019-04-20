import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, fontSize } from 'styled-system';

import { neutralMarginsY } from 'v2/styles/mixins';

const Container = styled.div.attrs(({ my = 5 }) => ({
  my,
}))`
  ${space}
  ${fontSize}
  ${neutralMarginsY}
`;

const Specimen = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

Specimen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Specimen;
