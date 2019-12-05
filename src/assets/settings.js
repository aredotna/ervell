import { mountWithApolloProvider } from 'v2/apollo'

import withBrowserRouter from 'v2/hocs/WithBrowserRouter'

import Routes from 'apps/settings/Routes'

document.addEventListener('DOMContentLoaded', () => {
  mountWithApolloProvider(
    withBrowserRouter(Routes),
    {},
    document.getElementById('root')
  )
})
