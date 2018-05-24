import sharify from 'sharify';

import Feed from 'collections/feed.coffee';
import FeedView from 'apps/feed/client/feed_view.coffee';

export default ($el) => {
  const { data: { CURRENT_USER } } = sharify;

  const collection = new Feed([], {
    type: 'primary',
    user: CURRENT_USER,
  });

  return new FeedView({ el: $el, collection });
};
