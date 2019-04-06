import { mountWithApolloProvider } from 'extension/src/apollo';
import Pane from 'extension/src/components/Pane';

const initialize = () => {
  const mountPoint = document.getElementById('ArenaExtension');
  mountWithApolloProvider(Pane, {}, mountPoint);
};

document.addEventListener('DOMContentLoaded', initialize);

