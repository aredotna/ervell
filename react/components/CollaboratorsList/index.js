import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import collaboratorsListQuery from 'react/components/CollaboratorsList/queries/collaboratorsList';

import Modal from 'react/components/UI/Modal';
import ManageCollaborators from 'react/components/ManageCollaborators';
import CollaboratorsList from 'react/components/CollaboratorsList/CollaboratorsList';

const StyledCollaboratorsList = styled(CollaboratorsList)`
  margin-bottom: 1em;
`;

class CollaboratorsListContainer extends Component {
  static propTypes = {
    channel_id: PropTypes.number.isRequired,
    // HACK: Until we wire up SSR; this requires an HTML fragment
    // to render while loading.
    htmlFragment: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }

  openManageCollaborators = () => {
    const { channel_id } = this.props;
    const modal = new Modal(ManageCollaborators, { channel_id });
    modal.open();
  }

  render() {
    const { htmlFragment, data: { loading } } = this.props;

    if (loading) return <div dangerouslySetInnerHTML={{ __html: htmlFragment }} />;

    const { data: { channel: { can, collaborators } } } = this.props;

    return (
      <div>
        <StyledCollaboratorsList collaborators={collaborators} />

        {can.manage_collaborators &&
          <a onClick={this.openManageCollaborators} role="button" tabIndex={0}>
            {collaborators.length ? 'Edit' : 'Add'} collaborators
          </a>
        }
      </div>
    );
  }
}

export default graphql(collaboratorsListQuery)(CollaboratorsListContainer);
