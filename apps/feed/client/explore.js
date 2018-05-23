import sharify from 'sharify';

import ExploreBlocks from 'collections/explore_blocks.coffee';
import setupBlockCollection from 'components/blocks/container/client/index.coffee';

export default ($el) => {
  const {
    data: {
      BLOCKS,
      SUBJECT,
      SORT,
      SEED,
    },
  } = sharify;

  const collection = new ExploreBlocks(BLOCKS, {
    subject: SUBJECT,
    sort: SORT,
    seed: SEED,
  });

  return setupBlockCollection({ $el, collection });
};
