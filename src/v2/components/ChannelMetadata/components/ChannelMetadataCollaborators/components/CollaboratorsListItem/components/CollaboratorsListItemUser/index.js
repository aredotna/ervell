import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import Link from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsListItem/components/Link';

import collaboratorLinkFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorLink';

export default class CollaboratorsListItemUser extends Component {
  static propTypes = {
    user: propType(collaboratorLinkFragment).isRequired,
  }

  render() {
    const { user: { href, name } } = this.props;

    return (
      <strong>
        <Link href={href} length={name.length}>
          {name}
        </Link>
      </strong>
    );
  }
}
