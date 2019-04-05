import { mountWithApolloProvider } from 'react/apollo';
import Menu from 'extension/src/components/Menu';

const initialize = () => {
  const mountPoint = document.getElementById('ArenaExtension');
  mountWithApolloProvider(Menu, {}, mountPoint);
};

document.addEventListener('DOMContentLoaded', initialize);

