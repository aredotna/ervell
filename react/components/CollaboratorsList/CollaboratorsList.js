import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

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
