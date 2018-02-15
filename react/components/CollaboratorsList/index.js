import React, { Component } from 'react';
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere'
import styled from 'styled-components';

import collaboratorLinkFragment from 'react/components/CollaboratorsList/fragments/collaboratorLink';

import LinksList from 'react/components/LinksList';

export default class CollaboratorsList extends Component {
  static defaultProps = {
    collaborators: [],
  }

  static fragments = {
    collaboratorLink: collaboratorLinkFragment,
  }

  static propTypes = {
    collaborators: PropTypes.arrayOf(propType(collaboratorLinkFragment)),
  }

  render() {
    const { collaborators, ...rest } = this.props;
    const links = collaborators.map(collaborator => ({
      id: collaborator.id,
      href: collaborator.href,
      label: collaborator.name,
    }));

    return (
      <LinksList links={links} {...rest} />
    );
  }
}

const query = gql`
  query ChannelCollaboratorsQuery($id: ID!) {
    channel(id: $id) {
      id
      collaborators {
        ...CollaboratorLink
      }
    }
  }
  ${collaboratorLinkFragment}
`

const StyledCollaboratorsList = styled(CollaboratorsList)`
  margin-bottom: 1em;
`;

class CollaboratorsListContainer extends Component {
  render() {
    const { data: { loading } } = this.props

    if (loading) return <div />;

    const { data: { channel: { collaborators } } } = this.props;

    return (
      <StyledCollaboratorsList collaborators={collaborators} />
    )
  }
}

export const CollaboratorsListContainerWithData = graphql(query)(CollaboratorsListContainer);
