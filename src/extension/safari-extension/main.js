import { mountWithApolloProvider } from 'extension/src/apollo'

import withBrowserRouter from 'v2/hocs/WithBrowserRouter'
import Routes from 'extension/safari-extension/Routes'

const initialize = () => {
  const mountPoint = document.getElementById('ArenaExtension')
  mountWithApolloProvider(withBrowserRouter(Routes), {}, mountPoint)
}

document.addEventListener('DOMContentLoaded', initialize)
