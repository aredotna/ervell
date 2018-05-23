import { defer } from 'underscore';

import Notifications from 'collections/notifications.coffee';
import FeedView from 'apps/feed/client/feed_view.coffee';

export default ($el) => {
  const notificationsFeed = new Notifications();

  notificationsFeed.on('sync', () =>
    defer(() => notificationsFeed.markRead()));

  return new FeedView({
    el: $el,
    collection: notificationsFeed,
  });
};
