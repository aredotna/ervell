import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageOnLoad from 'react-image-onload';

const Img = styled(ImageOnLoad)`
  display: none;

  ${({ mode }) => {
    if (mode === 'done') {
      return `
        display: block;
      `;
    }

    return '';
  }}
`;

export default class LoadableImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    title: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
  }

  static defaultProps = {
    alt: null,
    title: null,
    onLoad: () => {},
    onError: () => {},
  }

  state = {
    mode: 'loading',
  }

  handleLoad = () => {
    this.setState({ mode: 'done' });
    this.props.onLoad();
  }

  handleError = () => {
    this.setState({ mode: 'error' });
    this.props.onError();
  }

  render() {
    const { mode } = this.state;
    const {
      src,
      alt,
      title,
      onLoad: _onLoad,
      onError: _onError,
      ...rest
    } = this.props;

    return (
      <Img
        src={src}
        alt={alt}
        title={title}
        mode={mode}
        onLoad={this.handleLoad}
        onError={this.handleError}
        {...rest}
      />
    );
  }
}
