import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react/components/UI/Truncate';

// import styled from 'styled-components';

class Block extends PureComponent {
  static propTypes = {
    block: PropTypes.node.isRequired,
  }

  render() {
    const { block } = this.props;

    return (
      <div>
        {block.type === 'Text' &&
          <Truncate suffix="..." length={120}>
            {block.value}
          </Truncate>
        }
      </div>
    );
  }
}

export default Block;
