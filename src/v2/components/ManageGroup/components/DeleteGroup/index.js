import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import GenericButton from 'v2/components/UI/GenericButton'

import deleteGroupFragment from 'v2/components/ManageGroup/components/DeleteGroup/fragments/deleteGroup'
import deleteGroupMutation from 'v2/components/ManageGroup/components/DeleteGroup/mutations/deleteGroup'

class DeleteGroup extends Component {
  static propTypes = {
    group: propType(deleteGroupFragment).isRequired,
    deleteGroup: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  pendDeleteGroup = () => {
    this.setState({ mode: 'pending' })
  }

  deleteGroup = () => {
    const { mode } = this.state

    if (mode !== 'pending') return null

    const {
      group: { id },
      deleteGroup,
    } = this.props

    this.setState({ mode: 'deleting' })

    return deleteGroup({
      variables: { id },
    })
      .then(() => {
        window.location = '/'
      })
      .catch(err => {
        console.error(err)
        // TODO: Better error handling
        this.setState({ mode: 'error' })
      })
  }

  cancelDeleteGroup = () => {
    this.setState({ mode: 'resting' })
  }

  render() {
    const { mode } = this.state
    const {
      group: { name },
    } = this.props

    return (
      <div>
        <Text f={2} fontWeight="bold" color="state.alert">
          <a role="button" tabIndex={0} onClick={this.pendDeleteGroup}>
            Delete group
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

            {mode === 'pending' && (
              <div>
                <Text mb={6} f={2} color="state.alert">
                  All channels owned by <strong>{name}</strong> will be
                  permanently deleted and your group will lose access to any
                  channels it is a collaborator on.{' '}
                  <strong>This action cannot be undone.</strong> Are you sure
                  you want to delete the group?
                </Text>

                <div>
                  <GenericButton
                    f={2}
                    minWidth="6em"
                    color="state.alert"
                    onClick={this.deleteGroup}
                  >
                    Yes, delete group and all associated channels
                  </GenericButton>{' '}
                  <GenericButton
                    f={2}
                    minWidth="6em"
                    color="state.alert"
                    onClick={this.cancelDeleteGroup}
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

export default graphql(deleteGroupMutation, {
  name: 'deleteGroup',
})(DeleteGroup)
