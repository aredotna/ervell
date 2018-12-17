import { mountWithApolloProvider } from 'react/apollo';
import Feed from 'react/components/Feed';
import clearNotificationsMutation from 'apps/feed/mutations/clearNotifications';

export default ($el) => {
  mountWithApolloProvider(Feed, { type: 'Notification' }, $el);

  const apollo = window.__APOLLO_CLIENT__;

  apollo.mutate({
    mutation: clearNotificationsMutation,
  });
};
