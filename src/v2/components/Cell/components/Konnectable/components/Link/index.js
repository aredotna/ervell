import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import linkFragment from 'v2/components/Cell/components/Konnectable/components/Link/fragments/link';

import Generic from 'v2/components/Cell/components/Konnectable/components/Generic';

export default class Link extends PureComponent {
  static propTypes = {
    link: propType(linkFragment).isRequired,
  }

  render() {
    const { link, ...rest } = this.props;

    return (
      <Generic
        src={link.src}
        title={link.title}
        borderColor="gray.hint"
        {...rest}
      />
    );
  }
}
