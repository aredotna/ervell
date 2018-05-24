import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Cookies from 'cookies-js';

import Styles from 'react/styles';

import LinkUnlessCurrent from 'react/components/UI/LinkUnlessCurrent';

const Link = styled(LinkUnlessCurrent)`
  display: block;
  color: ${Styles.Colors.gray.regular};

  &:not([href]) {
    color: ${Styles.Colors.gray.semiBold};
    cursor: default;
  }
`;

export default class ProfileLinkUnlessCurrent extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }

  setCookie = () => {
    const { name, value } = this.props;

    Cookies.set(name, value);
  }

  render() {
    const {
      name: _name, value: _value, ...rest
    } = this.props;

    return (
      <Link {...rest} onClick={this.setCookie} />
    );
  }
}
