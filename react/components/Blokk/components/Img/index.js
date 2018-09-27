import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import LoadableImage from 'react/components/UI/LoadableImage';

const Container = styled(Box).attrs({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})`
  position: relative;
  width: 100%;
  height: 100%;

  > img {
    max-width: 100%;
    max-height: 100%;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: ${x => x.theme.colors.gray.light};
    z-index: -1;
  }
`;

class Img extends Component {
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
        <LoadableImage src={src} alt={alt} />
      </Container>
    );
  }
}

export default Img;
