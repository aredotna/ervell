import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Cookies from 'cookies-js';

import LinkUnlessCurrent from 'react/components/UI/LinkUnlessCurrent';

const Link = styled(LinkUnlessCurrent)`
  display: block;
  color: ${x => x.theme.colors.gray.regular};

  &:not([href]) {
    color: ${x => x.theme.colors.gray.semiBold};
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
