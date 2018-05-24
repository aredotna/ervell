import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

export default class CopyToClipboard extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    copiedLabel: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => {},
    copiedLabel: 'Copied!',
  }

  constructor(props) {
    super(props);

    this.state = {
      currentLabel: props.label,
    };
  }

  copyToClipboard = () => {
    const {
      value, onClick, label, copiedLabel,
    } = this.props;

    copy(value);

    this.setState({
      currentLabel: copiedLabel,
    });

    setTimeout(() => {
      this.setState({
        currentLabel: label,
      })
    }, 2000);

    return onClick();
  }


  render() {
    const { currentLabel } = this.state;

    return (
      <a role="button" tabIndex={0} onClick={this.copyToClipboard}>
        {currentLabel}
      </a>
    );
  }
}
