import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from 'react/components/UI/Modal';
import CreateGroup from 'react/components/CreateGroup';
import ManageCollaborators from 'react/components/ManageCollaborators';
import CollaboratorsList from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsList';
import ChannelMetadataExpandable from 'react/components/ChannelMetadata/components/ChannelMetadataExpandable';

const StyledCollaboratorsList = styled(CollaboratorsList)`
  margin-bottom: 1em;
`;

const Link = styled.a`
  display: block;
`;

export default class CollaboratorsListContainer extends Component {
  static propTypes = {
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    channel: PropTypes.shape({}).isRequired, // TODO
  }

  openManageCollaborators = () => {
    const { channel_id } = this.props;
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
    const { channel_id } = this.props;
    const modal = new Modal(CreateGroup, { channel_id });
    modal.open();
  }

  render() {
    const { channel_id, channel: { can, collaborators } } = this.props;

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
          <div>
            <Link onClick={this.openManageCollaborators} role="button" tabIndex={0}>
              {collaborators.length ? 'Edit' : 'Add'} collaborators
            </Link>

            <Link onClick={this.openCreateGroup} role="button" tabIndex={0}>
              Create group
            </Link>
          </div>
        }
      </div>
    );
  }
}
