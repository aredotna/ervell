import React from 'react';
import PropTypes from 'prop-types';

import Cell from 'react/components/Cell';
import GridItem from 'react/components/UI/Grid/components/GridItem';

const ChannelContentsPageSkeleton = ({ mode, skeleton }) =>
  skeleton.map(({ type, id }) => (
    <GridItem key={`${type}:${id}`}>
      <Cell.Skeletal mode={mode} />
    </GridItem>
  ));

ChannelContentsPageSkeleton.propTypes = {
  skeleton: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })).isRequired,
  mode: PropTypes.oneOf([
    'pending',
    'loading',
  ]).isRequired,
};

export default ChannelContentsPageSkeleton;
