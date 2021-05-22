import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { graphql } from '@apollo/client/react/hoc'
import { some } from 'underscore'
import compose from 'lodash.flowright'

import mapErrors from 'v2/util/mapErrors'
import compactObject from 'v2/util/compactObject'

import manageGroupFragment from 'v2/components/ManageGroup/fragments/manageGroup'
import manageGroupQuery from 'v2/components/ManageGroup/queries/manageGroup'

import updateGroupMutation from 'v2/components/ManageGroup/mutations/updateGroup'

import Box from 'v2/components/UI/Box'
import Accordion from 'v2/components/UI/Accordion'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import TitledDialog from 'v2/components/UI/TitledDialog'
import DeleteGroup from 'v2/components/ManageGroup/components/DeleteGroup'
import ManageUsers from 'v2/components/ManageGroup/components/ManageUsers'
import { GroupInvite } from 'v2/components/ManageGroup/components/Invite'
import {
  LabelledInput,
  Label,
  Input,
  Textarea,
  ErrorMessage,
} from 'v2/components/UI/Inputs'

class ManageGroup extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    updateGroup: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      group: propType(manageGroupFragment),
    }).isRequired,
    initialSection: PropTypes.oneOf(['name', 'members', 'delete']),
  }

  static defaultProps = {
    channel_id: null,
    onSuccess: () => {},
    onError: () => {},
    initialSection: 'name',
  }

  state = {
    mode: 'resting',
    name: null,
    description: null,
    attributeErrors: {},
    errorMessage: '',
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    const {
      data: { group: originalGroup },
    } = this.props

    const isEdited = some(
      originalGroup,
      (originalValue, key) => fieldName === key && originalValue !== fieldValue
    )

    this.setState({
      mode: isEdited ? 'submit' : 'resting',
      [fieldName]: fieldValue,
    })
  }

  handleName = this.handleInput('name')
  handleDescription = this.handleInput('description')

  handleSubmit = e => {
    e.preventDefault()

    const { id, updateGroup, onClose, onSuccess, onError } = this.props
    const { mode, name, description } = this.state

    const variables = compactObject({ id, name, description })

    if (mode === 'resting') {
      return onClose()
    }

    this.setState({ mode: 'submitting' })

    return updateGroup({ variables })
      .then(res => {
        onSuccess(res)
        return onClose()
      })
      .catch(err => {
        onError(err)
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        })
      })
  }

  handleCancel = () => this.props.onClose()

  render() {
    const {
      data: { loading },
      initialSection,
    } = this.props

    if (loading) return <LoadingIndicator />

    const { mode, attributeErrors, errorMessage } = this.state
    const {
      channel_id,
      data: { group },
    } = this.props

    return (
      <TitledDialog
        title={`Edit ${group && group.name}`}
        label={
          {
            resting: 'Done',
            submit: 'Save',
            submitting: 'Saving...',
            error: 'Error',
          }[mode]
        }
        onDone={this.handleSubmit}
      >
        <Accordion
          key="name"
          label={
            {
              true: 'Edit name and description',
              false: 'Name and description',
            }[group.can.manage]
          }
          mode={initialSection === 'name' ? 'open' : 'closed'}
        >
          <LabelledInput>
            <Label>Name</Label>

            <Input
              name="name"
              placeholder="enter group name"
              onChange={this.handleName}
              defaultValue={group.name}
              disabled={!group.can.manage}
              errorMessage={attributeErrors.title}
              required
            />
          </LabelledInput>

          <LabelledInput>
            <Label>Description</Label>

            <Textarea
              name="description"
              defaultValue={group.description}
              onChange={this.handleDescription}
              placeholder="describe your group here"
              rows="3"
              disabled={!group.can.manage}
              errorMessage={attributeErrors.description}
            />
          </LabelledInput>
        </Accordion>

        {group.can.manage_users && (
          <Accordion
            label="Add/edit members"
            key="members"
            mode={initialSection === 'members' ? 'open' : 'closed'}
          >
            <Box m={7}>
              <ManageUsers channel_id={channel_id} group={group} />
            </Box>
          </Accordion>
        )}

        {group.can.manage && (
          <Accordion
            label="Invite members"
            key="invite"
            mode={initialSection === 'invite' ? 'open' : 'closed'}
          >
            <Box m={7}>
              <GroupInvite group={group} />
            </Box>
          </Accordion>
        )}

        {group.can.manage && (
          <Accordion
            label="Delete group"
            key="delete"
            mode={initialSection === 'delete' ? 'open' : 'closed'}
          >
            <Box m={7}>
              <DeleteGroup group={group} />
            </Box>
          </Accordion>
        )}

        {mode === 'error' && (
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        )}
      </TitledDialog>
    )
  }
}

export default compose(
  graphql(manageGroupQuery),
  graphql(updateGroupMutation, { name: 'updateGroup' })
)(ManageGroup)
