import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import embedFragment from 'v2/components/Cell/components/Konnectable/components/Embed/fragments/embed';

import Generic from 'v2/components/Cell/components/Konnectable/components/Generic';

export default class Embed extends PureComponent {
  static propTypes = {
    embed: propType(embedFragment).isRequired,
  }

  render() {
    const { embed, ...rest } = this.props;

    return (
      <Generic src={embed.src} title={embed.title} {...rest} />
    );
  }
}
