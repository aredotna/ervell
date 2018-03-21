import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import CollaboratorsListItemUser from 'react/components/CollaboratorsList/components/CollaboratorsListItem/components/CollaboratorsListItemUser';
import CollaboratorsListItemGroup from 'react/components/CollaboratorsList/components/CollaboratorsListItem/components/CollaboratorsListItemGroup';

import collaboratorLinkFragment from 'react/components/CollaboratorsList/fragments/collaboratorLink';

export default class CollaboratorsListItem extends Component {
  static propTypes = {
    collaborator: propType(collaboratorLinkFragment).isRequired,
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  render() {
    const { channel_id, collaborator, collaborator: { __typename } } = this.props;

    switch (__typename) {
      case 'Group':
        return <CollaboratorsListItemGroup group={collaborator} channel_id={channel_id} />;
      case 'User':
        return <CollaboratorsListItemUser user={collaborator} />;
      default:
        return <div />;
    }
  }
}
