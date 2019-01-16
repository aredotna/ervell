import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';

import constants from 'react/styles/constants';

const withBlocksGridCount = (WrappedComponent) => {
  class WithBlocksGridCount extends Component {
    render() {
      const { ...rest } = this.props;

      return (
        <SizeMe>
          {({ size }) => {
            const divider = parseInt(constants.blockAndGutter, 10);
            const blocksGridCount = Math.floor(size.width / divider);
            return (
              <WrappedComponent blocksGridCount={blocksGridCount} {...rest} />
            );
          }}
        </SizeMe>
      );
    }
  }

  return WithBlocksGridCount;
};

export default withBlocksGridCount;
