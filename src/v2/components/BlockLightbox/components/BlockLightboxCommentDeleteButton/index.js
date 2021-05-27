import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'

import Text from 'v2/components/UI/Text'

import deleteCommentMutation from 'v2/components/BlockLightbox/components/BlockLightboxCommentDeleteButton/mutations/deleteComment'

class BlockLightboxCommentDeleteButton extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  deleteComment = e => {
    e.preventDefault()

    const { id, deleteComment } = this.props

    this.setState({ mode: 'deleting' })

    return deleteComment({
      variables: { id },
    }).catch(err => {
      console.error(err)
      this.setState({ mode: 'error' })
    })
  }

  render() {
    const { mode } = this.state
    const { id: _id, deleteComment: _deleteComment, ...rest } = this.props

    return (
      <Text {...rest}>
        <a onClick={this.deleteComment} role="button" tabIndex={0}>
          {
            {
              resting: 'Delete',
              deleting: 'Deleting...',
              error: 'Error',
            }[mode]
          }
        </a>
      </Text>
    )
  }
}

export default graphql(deleteCommentMutation, {
  name: 'deleteComment',
})(BlockLightboxCommentDeleteButton)
