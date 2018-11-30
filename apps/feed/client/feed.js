import { mountWithApolloProvider } from 'react/apollo';
import Feed from 'react/components/Feed';

export default () => {
  const el = document.getElementsByClassName('js-feed');
  if (el) {
    mountWithApolloProvider(Feed, {}, el[0]);
  }
};
