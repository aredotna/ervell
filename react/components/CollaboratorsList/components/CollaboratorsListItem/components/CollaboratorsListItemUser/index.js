import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import Link from 'react/components/CollaboratorsList/components/CollaboratorsListItem/components/Link';

import collaboratorLinkFragment from 'react/components/CollaboratorsList/fragments/collaboratorLink';

export default class CollaboratorsListItemUser extends Component {
  static propTypes = {
    user: propType(collaboratorLinkFragment).isRequired,
  }

  render() {
    const { user: { href, name } } = this.props;

    return (
      <strong>
        <Link href={href}>
          {name}
        </Link>
      </strong>
    );
  }
}
