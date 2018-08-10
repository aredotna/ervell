import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'cookies-js';

import HeaderMetadataLinkUnlessCurrent from 'react/components/UI/HeaderMetadata/HeaderMetadataLinkUnlessCurrent';

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
      <HeaderMetadataLinkUnlessCurrent {...rest} onClick={this.setCookie} />
    );
  }
}
