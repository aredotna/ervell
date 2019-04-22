import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import Badge from 'react/components/UI/Badge';
import Link from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsListItem/components/Link';

import collaboratorLinkFragment from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorLink';

export default class CollaboratorsListItemGroup extends Component {
  static propTypes = {
    group: propType(collaboratorLinkFragment).isRequired,
  }

  render() {
    const { group } = this.props;

    return (
      <strong>
        <Link
          href={group.href}
          length={group.name.length}
          title={group.description}
        >
          {group.name}
          &nbsp;
          <Badge f={0}color="gray.medium" icon={{ private: 'Lock' }[group.visibility]}>
            Group
          </Badge>
        </Link>
      </strong>
    );
  }
}
