import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bgColor, themeGet } from 'styled-system';

import theme from 'react/styles/theme';

import Text from 'react/components/UI/Text';

const Container = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${theme.colors.gray.light};
`;

const Swatch = styled.div`
  height: 2rem;
  width: 2rem;
  margin-right: 1em;
  ${bgColor}
`;

const Info = styled(Text)`
  flex: 1;
  margin: 0;
`;

const ColorSwatch = ({ color }) => (
  <Container>
    <Swatch bg={color} />

    <Info font="sans" color={color}>
      all their equipment and instruments are alive
    </Info>

    <Info font="mono" f={1}>
      {color}
    </Info>

    <Info font="mono" f={1}>
      {themeGet(`colors.${color}`)({ theme })}
    </Info>
  </Container>
);

ColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorSwatch;
