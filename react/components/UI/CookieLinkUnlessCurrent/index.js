import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'cookies-js';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Link = styled(NavLink)`
  display: block;
  color: ${x => x.theme.colors.gray.regular};

  ${({ isActive, theme }) => isActive && isActive() && `
    color: ${theme.colors.gray.semiBold};
    cursor: default;
  `}
`;

export default class CookieLinkUnlessCurrent extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    prefix: PropTypes.string,
  }

  static defaultProps = {
    name: null,
    value: null,
    prefix: '',
  }

  setCookie = () => {
    const { name, value, prefix } = this.props;

    if (!name || !value) return;

    try {
      Cookies.set(`${prefix}--${name}`, value);
    } catch (err) {
      console.error(err);
    }
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
