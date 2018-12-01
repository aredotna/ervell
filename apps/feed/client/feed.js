import { mountWithApolloProvider } from 'react/apollo';
import Feed from 'react/components/Feed';

export default ($el) => {
  mountWithApolloProvider(Feed, {}, $el);
};
