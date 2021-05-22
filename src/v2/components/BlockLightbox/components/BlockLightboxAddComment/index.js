import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from '@apollo/client/react/hoc'

import mapErrors from 'v2/util/mapErrors'

import createCommentMutation from 'v2/components/BlockLightbox/components/BlockLightboxAddComment/mutations/createComment'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import { FilledButton } from 'v2/components/UI/Buttons'
import MentionTextarea, {
  SPECIAL_CHARACTER,
} from 'v2/components/UI/MentionTextarea'

const Tip = styled(Box)`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
`

class BlockLightboxAddComment extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    createComment: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    comment: '',
    inputKey: new Date().getTime(),
    errorMessage: null,
  }

  handleChange = newValue => {
    const mode = newValue === '' ? 'resting' : 'active'
    this.setState({ mode, comment: newValue })
  }

  handleKeyDown = e => {
    const { key, shiftKey } = e

    if (key === 'Enter' && !shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      this.handleSubmit()
    }

    // Allows <shift+enter> to pass through
  }

  handleErrors = err => {
    this.setState({
      mode: 'error',
      ...mapErrors(err),
    })
  }

  handleSubmit = () => {
    const { createComment, id: block_id } = this.props
    const { comment: body, mode } = this.state

    if (mode === 'resting') return

    this.setState({ mode: 'submitting' })

    // This is a weird thing we have to do to get
    // around a limitation in react-mention
    const re = new RegExp(SPECIAL_CHARACTER, 'g')

    createComment({
      variables: { body: body.replace(re, ''), block_id },
    })
      .then(() => {
        this.setState({
          mode: 'done',
          comment: '',
          inputKey: new Date().getTime(),
        })

        setTimeout(
          () =>
            this.setState(prevState => ({
              mode: prevState.comment === '' ? 'resting' : 'active',
            })),
          2500
        )
      })
      .catch(this.handleErrors)
  }

  render() {
    const { mode, inputKey, errorMessage, comment } = this.state
    const { ...rest } = this.props

    return (
      <Box {...rest}>
        <Box position="relative">
          {mode === 'error' && (
            <ErrorAlert mb={6} isReloadable={false}>
              {errorMessage}
            </ErrorAlert>
          )}

          <MentionTextarea
            key={inputKey}
            value={comment}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />

          {mode === 'active' && (
            <Tip pb={3}>
              <Text f={0} color="gray.regular">
                shift + enter for line break
              </Text>
            </Tip>
          )}
        </Box>

        <Box mt={6} textAlign="center">
          <FilledButton
            disabled={mode !== 'active'}
            onClick={this.handleSubmit}
          >
            {
              {
                resting: 'Add comment',
                active: 'Add comment',
                submitting: 'Adding...',
                done: 'Added!',
                error: 'Error',
              }[mode]
            }
          </FilledButton>
        </Box>
      </Box>
    )
  }
}

export default graphql(createCommentMutation, {
  name: 'createComment',
})(BlockLightboxAddComment)
