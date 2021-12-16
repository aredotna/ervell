import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { pick, omit } from 'underscore'

import { space } from 'styled-system'

import compactObject from 'v2/util/compactObject'

import Box from 'v2/components/UI/Box'
import TextInput from 'v2/components/UI/Inputs/components/TextInput'
import ErrorMessage from 'v2/components/UI/Inputs/components/ErrorMessage'

const SPACE_MARGIN_PROPS_KEYS = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'width',
  'height',
]

// TODO: Needs to be configured to accept a tag
// so that other input types can have errors
class Input extends PureComponent {
  static propTypes = {
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    ...space.propTypes,
  }

  static defaultProps = {
    errorMessage: null,
    hasError: false,
  }

  constructor(props) {
    super(props)

    const { errorMessage, hasError } = props

    this.state = {
      mode: hasError || errorMessage ? 'error' : 'resting',
    }
  }

  componentWillReceiveProps({ hasError, errorMessage }) {
    this.setState({
      mode: hasError || errorMessage ? 'error' : 'resting',
    })
  }

  render() {
    const { mode } = this.state
    const { errorMessage, forwardRef } = this.props

    // Allow the outerbox to have configurable margins
    const boxProps = compactObject(pick(this.props, ...SPACE_MARGIN_PROPS_KEYS))

    // While the input can still have configurable padding
    const inputProps = omit(this.props, ...SPACE_MARGIN_PROPS_KEYS)

    return (
      <Box flex={1} {...boxProps}>
        <TextInput
          {...inputProps}
          ref={forwardRef}
          hasError={mode === 'error'}
        />

        {mode === 'error' && (
          <ErrorMessage textAlign="left">{errorMessage}</ErrorMessage>
        )}
      </Box>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <Input forwardRef={ref} {...props} />
))
