import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import imageFragment from 'react/components/Cell/components/Konnectable/components/Image/fragments/image';

import Generic from 'react/components/Cell/components/Konnectable/components/Generic';

export default class Image extends PureComponent {
  static propTypes = {
    image: propType(imageFragment).isRequired,
  }


  render() {
    const { image, ...rest } = this.props;

    return (
      <Generic src={image.src} title={image.title} {...rest} />
    );
  }
}
