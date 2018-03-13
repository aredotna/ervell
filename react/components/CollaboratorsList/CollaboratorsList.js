import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import CollaboratorsListItem from 'react/components/CollaboratorsList/components/CollaboratorsListItem';

import collaboratorLinkFragment from 'react/components/CollaboratorsList/fragments/collaboratorLink';

export default class CollaboratorsList extends Component {
  static defaultProps = {
    collaborators: [],
  }

  static propTypes = {
    collaborators: PropTypes.arrayOf(propType(collaboratorLinkFragment)),
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  render() {
    const { collaborators, channel_id, ...rest } = this.props;

    return (
      <div {...rest}>
        {collaborators.map((collaborator, i) => (
          <span key={collaborator.id}>
            <CollaboratorsListItem
              collaborator={collaborator}
              channel_id={channel_id}
            />

            {i !== collaborators.length - 1 && ', '}
            {i === collaborators.length - 2 && 'and '}
          </span>
        ))}
      </div>
    );
  }
}
