import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'v2/components/UI/Box';

const Container = styled(Box).attrs({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})`
  position: relative;
  width: 100%;
  height: 100%;

  > img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
`;

class Img extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }

  static defaultProps = {
    alt: null,
  }

  render() {
    const { src, alt } = this.props;

    return (
      <Container>
        <img src={src} alt={alt} />
      </Container>
    );
  }
}

export default Img;
