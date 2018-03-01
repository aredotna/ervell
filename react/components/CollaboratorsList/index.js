import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import collaboratorsListQuery from 'react/components/CollaboratorsList/queries/collaboratorsList';

import Modal from 'react/components/UI/Modal';
import CreateGroup from 'react/components/CreateGroup';
import ManageCollaborators from 'react/components/ManageCollaborators';
import CollaboratorsList from 'react/components/CollaboratorsList/CollaboratorsList';

const StyledCollaboratorsList = styled(CollaboratorsList)`
  margin-bottom: 1em;
`;

const Link = styled.a`
  display: block;
`;

class CollaboratorsListContainer extends Component {
  static propTypes = {
    channel_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
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
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { data: { channel: { can, collaborators } } } = this.props;

    return (
      <div>
        {collaborators.length > 0 &&
          <StyledCollaboratorsList collaborators={collaborators} />
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

export default graphql(collaboratorsListQuery)(CollaboratorsListContainer);
