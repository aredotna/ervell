import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'react/components/UI/Box';
import TextInput from 'react/components/UI/Inputs/components/TextInput';
import ErrorMessage from 'react/components/UI/Inputs/components/ErrorMessage';

// TODO: Needs to be configured to accept a tag
// so that other input types can have errors
export default class Input extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
  }

  static defaultProps = {
    errorMessage: null,
    hasError: false,
  }

  constructor(props) {
    super(props);

    const { errorMessage, hasError } = props;

    this.state = {
      mode: (hasError || errorMessage) ? 'error' : 'resting',
    };
  }

  componentWillReceiveProps({ hasError, errorMessage }) {
    console.log(errorMessage);
    this.setState({
      mode: (hasError || errorMessage) ? 'error' : 'resting',
    });
  }

  render() {
    const { mode } = this.state;
    const { errorMessage, hasError: _hasError, ...rest } = this.props;

    return (
      <Box {...rest}>
        <TextInput
          onChange={this.handleChange}
          hasError={mode === 'error'}
          {...rest}
          mb={0}
        />

        {mode === 'error' &&
          <ErrorMessage textAlign="left">
            {errorMessage}
          </ErrorMessage>
        }
      </Box>
    );
  }
}
