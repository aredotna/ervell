import { mountWithApolloProvider } from 'v2/apollo'

import withBrowserRouter from 'v2/hocs/WithBrowserRouter'
import Routes from 'apps/marklet/Routes'

const initialize = () => {
  const mountPoint = document.getElementById('apolloMount')
  mountWithApolloProvider(withBrowserRouter(Routes), {}, mountPoint)
}

document.addEventListener('DOMContentLoaded', initialize)
