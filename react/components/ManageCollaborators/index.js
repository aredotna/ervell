import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import Styles from 'react/styles';

import manageCollaboratorsQuery from 'react/components/ManageCollaborators/queries/manageCollaborators';
import manageCollaboratorsFragment from 'react/components/ManageCollaborators/fragments/manageCollaborators';

import ManagedCollaboratorsList from 'react/components/ManageCollaborators/components/ManagedCollaboratorsList';
import CollaboratorSearch from 'react/components/CollaboratorSearch';

const Title = styled.h3`
  margin: 0 auto 1em auto;
  font-size: ${Styles.Type.size.lg};
  font-weight: bold;
  text-align: center;
  color: ${Styles.Colors.gray.medium};
`;

const Label = styled.h4`
  margin: 0.75em 0;
  font-weight: normal;
  font-size: ${Styles.Type.size.sm};
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em 1em 0 1em;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Section = styled.div`
  margin: 2em auto;
`;

class ManageCollaborators extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    channel_id: PropTypes.number.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      channel: propType(manageCollaboratorsFragment),
    }).isRequired,
  }

  render() {
    const { channel_id, onClose, data: { loading } } = this.props;

    if (loading) return <div />;

    const {
      data: {
        channel: {
          counts,
          collaborators,
        },
      },
    } = this.props;

    return (
      <Container>
        <Title>
          Edit collaborators
        </Title>

        <Body>
          <Section>
            <Label>Invite</Label>
            <CollaboratorSearch channel_id={channel_id} />
          </Section>

          {counts.collaborators > 0 &&
            <Section>
              <Label>
                {counts.collaborators} Collaborator{counts.collaborators === 1 ? '' : 's'}
              </Label>

              <ManagedCollaboratorsList
                collaborators={collaborators}
                channel_id={channel_id}
              />
            </Section>
          }
        </Body>

        <button
          className="Button Button--divider"
          onClick={onClose}
        >
          Done
        </button>
      </Container>
    );
  }
}

export default graphql(manageCollaboratorsQuery)(ManageCollaborators);
