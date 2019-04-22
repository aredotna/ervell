import { mountWithApolloProvider } from 'react/apollo';

import withBrowserRouter from 'react/hocs/WithBrowserRouter';

import Routes from 'apps/search/Routes';

document.addEventListener('DOMContentLoaded', () => {
  mountWithApolloProvider(withBrowserRouter(Routes), {}, document.getElementById('root'));
});
