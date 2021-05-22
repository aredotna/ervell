import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import GenericButton from 'v2/components/UI/GenericButton'

import deleteChannelMutation from 'v2/components/ManageChannel/components/DeleteChannel/mutations/deleteChannel'

class DeleteChannel extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    deleteChannel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    refetchQueries: PropTypes.arrayOf(
      PropTypes.shape({
        query: PropTypes.object.isRequired,
        variables: PropTypes.object,
      })
    ),
  }

  state = {
    mode: 'resting',
  }

  pendDeleteChannel = () => {
    this.setState({ mode: 'pending' })
  }

  deleteChannel = () => {
    const { mode } = this.state

    if (mode !== 'pending') return null

    const { id, deleteChannel, onDelete, refetchQueries } = this.props

    this.setState({ mode: 'deleting' })

    return deleteChannel({
      variables: { id },
      refetchQueries,
    })
      .then(() => {
        this.setState({ mode: 'deleted' })
        onDelete()
      })
      .catch(err => {
        console.error(err)
        // TODO: Better error handling
        this.setState({ mode: 'error' })
      })
  }

  cancelDeleteChannel = () => {
    this.setState({ mode: 'resting' })
  }

  render() {
    const { mode } = this.state

    return (
      <div>
        <Text f={2} fontWeight="bold" color="state.alert">
          <a
            role="button"
            tabIndex={0}
            onClick={this.pendDeleteChannel}
            style={{ cursor: 'pointer' }}
          >
            Delete channel
          </a>
        </Text>

        {mode !== 'resting' && (
          <Box my={3}>
            {mode === 'error' && (
              <Text mb={6} f={2} color="state.alert">
                An error has occurred. Try again.
              </Text>
            )}

            {mode === 'deleting' && (
              <Text mb={6} f={2} color="state.alert">
                Deleting...
              </Text>
            )}

            {mode === 'deleted' && (
              <Text mb={6} f={2} color="state.alert">
                Deleted!
              </Text>
            )}

            {mode === 'pending' && (
              <div>
                <Text mb={6} f={2} color="state.alert">
                  Are you sure? This action cannot be undone.
                </Text>

                <div>
                  <GenericButton
                    f={2}
                    minWidth="6em"
                    color="state.alert"
                    onClick={this.deleteChannel}
                  >
                    Delete
                  </GenericButton>{' '}
                  <GenericButton
                    f={2}
                    minWidth="6em"
                    color="state.alert"
                    onClick={this.cancelDeleteChannel}
                  >
                    Cancel
                  </GenericButton>
                </div>
              </div>
            )}
          </Box>
        )}
      </div>
    )
  }
}

export default graphql(deleteChannelMutation, {
  name: 'deleteChannel',
})(DeleteChannel)
