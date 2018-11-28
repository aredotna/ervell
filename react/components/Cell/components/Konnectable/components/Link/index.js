import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import linkFragment from 'react/components/Cell/components/Konnectable/components/Link/fragments/link';

import Generic from 'react/components/Cell/components/Konnectable/components/Generic';

export default class Link extends PureComponent {
  static propTypes = {
    link: propType(linkFragment).isRequired,
  }

  render() {
    const { link, ...rest } = this.props;

    return (
      <Generic src={link.src} title={link.title} {...rest} />
    );
  }
}
