import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from 'react/components/UI/Modal';
import CreateGroup from 'react/components/CreateGroup';
import ManageCollaborators from 'react/components/ManageCollaborators';
import CollaboratorsList from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsList';
import ChannelMetadataExpandable from 'react/components/ChannelMetadata/components/ChannelMetadataExpandable';

const Actions = styled.div`
  div + & {
    margin-top: 1em;
  }
`;

const Link = styled.a`
  display: block;
`;

const StyledCollaboratorsList = styled(CollaboratorsList)`
  padding-right: 1em;
`;

export default class CollaboratorsListContainer extends Component {
  static propTypes = {
    channel: PropTypes.shape({}).isRequired, // TODO
  }

  openManageCollaborators = () => {
    const { channel: { id: channel_id } } = this.props;
    const modal = new Modal(ManageCollaborators, {
      channel_id,
      openCreateGroup: () => {
        modal.close();
        this.openCreateGroup();
      },
    });

    modal.open();
  }

  openCreateGroup = () => {
    const { channel: { id: channel_id } } = this.props;
    const modal = new Modal(CreateGroup, { channel_id });
    modal.open();
  }

  render() {
    const {
      channel: {
        id: channel_id, can, collaborators,
      },
    } = this.props;

    return (
      <div>
        {collaborators.length > 0 &&
          <ChannelMetadataExpandable>
            <StyledCollaboratorsList
              collaborators={collaborators}
              channel_id={channel_id}
            />
          </ChannelMetadataExpandable>
        }

        {can.manage_collaborators &&
          <Actions>
            <Link onClick={this.openManageCollaborators} role="button" tabIndex={0}>
              {collaborators.length ? 'Edit' : 'Add'} collaborators
            </Link>

            <Link onClick={this.openCreateGroup} role="button" tabIndex={0}>
              Create group
            </Link>
          </Actions>
        }
      </div>
    );
  }
}
