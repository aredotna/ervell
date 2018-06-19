import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from 'react/styles';

const Container = styled.div`
  font-family: ${x => styles.Type.font[x.family]};
  font-size: ${x => styles.Type.size[x.size]};
  line-height: ${styles.Type.lineHeight.tall};
`;

const TypeSpecimen = ({ family, size }) => (
  <Container family={family} size={size}>
    {family} / {size} / {`${styles.Type.size[size]}`} = The wizard quickly jinxed the gnomes before they vaporized.
  </Container>
);

TypeSpecimen.propTypes = {
  size: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
};

export default TypeSpecimen;
