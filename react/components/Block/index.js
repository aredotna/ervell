import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Types from 'react/components/Block/util/Types';
import { Channel } from 'react/components/Block/components/Types';

const BlockWrapper = styled.div`
  background: #fff;
  display: inline-block;
  flex: 1 1 285px;
  max-width: 315px;
  position: relative;
  text-align: center;
  user-select: none;
  width: 100%;
`;

const BlockPadding = styled.div`
  padding-top: 100%;
`;

const Block = (props) => {
  const {
    blockData,
    type,
  } = props;

  const blockContent = () => {
    let BlockTypeKlass;

    switch (type) {
      case Types.CHANNEL:
        BlockTypeKlass = Channel;
        break;
      // TODO: Fill in the rest...
    }

    return (
      <BlockTypeKlass
        {...blockData}
      />
    );
  };

  return (
    <BlockWrapper>
      <BlockPadding />
      {blockContent()}
    </BlockWrapper>
  );
};

Block.propTypes = {
  blockData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Block;
