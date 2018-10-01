import React from 'react';

import Generic from 'react/components/Blokk/components/Generic';
import Connectable from 'react/components/Blokk/components/Connectable';

export default class Link extends Connectable {
  render() {
    const { link, ...rest } = this.props;

    return (
      <Generic src={link.src} alt={link.title} {...rest} />
    );
  }
}
