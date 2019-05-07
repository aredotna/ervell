import { mountWithApolloProvider } from 'extension/src/apollo'

import withBrowserRouter from 'src/v2/hocs/WithBrowserRouter'
import Routes from 'extension/src/Routes'

const initialize = () => {
  const mountPoint = document.getElementById('ArenaExtension')
  mountWithApolloProvider(withBrowserRouter(Routes), {}, mountPoint)
}

document.addEventListener('DOMContentLoaded', initialize)
