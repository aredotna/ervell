import React from 'react';

import Generic from 'react/components/Blokk/components/Generic';
import Connectable from 'react/components/Blokk/components/Connectable';

export default class Image extends Connectable {
  render() {
    const { image, ...rest } = this.props;

    return (
      <Generic src={image.src} alt={image.title} {...rest} />
    );
  }
}
