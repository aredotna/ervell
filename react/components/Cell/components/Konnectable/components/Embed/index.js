import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import embedFragment from 'react/components/Cell/components/Konnectable/components/Embed/fragments/embed';

import Generic from 'react/components/Cell/components/Konnectable/components/Generic';

export default class Embed extends Component {
  static propTypes = {
    embed: propType(embedFragment).isRequired,
  }

  render() {
    const { embed, ...rest } = this.props;

    return (
      <Generic src={embed.src} alt={embed.title} {...rest} />
    );
  }
}
