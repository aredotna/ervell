import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Modal from 'v2/components/UI/Modal'
import CreateGroup from 'v2/components/CreateGroup'
import ManageCollaborators from 'v2/components/ManageCollaborators'
import CollaboratorsList from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsList'
import { Expandable } from 'v2/components/UI/ExpandableSet'

const Actions = styled.div`
  div + & {
    margin-top: 1em;
  }
`

const Link = styled.a`
  display: block;
`

const StyledCollaboratorsList = styled(CollaboratorsList)`
  padding-right: 1em;
`

export default class CollaboratorsListContainer extends Component {
  static propTypes = {
    channel: PropTypes.shape({}).isRequired, // TODO
  }

  openManageCollaborators = () => {
    const {
      channel: { id: channel_id },
    } = this.props
    const modal = new Modal(ManageCollaborators, {
      channel_id,
      openCreateGroup: () => {
        modal.close()
        this.openCreateGroup()
      },
    })

    modal.open()
  }

  openCreateGroup = () => {
    const {
      channel: { id: channel_id },
    } = this.props
    const modal = new Modal(CreateGroup, { channel_id })
    modal.open()
  }

  render() {
    const {
      channel: { id: channel_id, can, collaborators },
    } = this.props

    return (
      <div>
        {collaborators.length > 0 && (
          <Expandable>
            <StyledCollaboratorsList
              collaborators={collaborators}
              channel_id={channel_id}
            />
          </Expandable>
        )}

        {can.manage_collaborators && (
          <Actions>
            <Link
              onClick={this.openManageCollaborators}
              role="button"
              tabIndex={0}
            >
              {collaborators.length ? 'Edit' : 'Add'} collaborators
            </Link>

            <Link onClick={this.openCreateGroup} role="button" tabIndex={0}>
              Create group
            </Link>
          </Actions>
        )}
      </div>
    )
  }
}
