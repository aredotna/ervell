import React from 'react';

import Generic from 'react/components/Blokk/components/Generic';
import Connectable from 'react/components/Blokk/components/Connectable';

export default class Embed extends Connectable {
  render() {
    const { embed, ...rest } = this.props;

    return (
      <Generic src={embed.src} alt={embed.title} {...rest} />
    );
  }
}
