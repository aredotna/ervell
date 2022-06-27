import { mountWithApolloProvider } from 'v2/apollo'
import withBrowserRouter from 'v2/hocs/WithBrowserRouter'
import { AppRoutes as Routes } from 'apps/app/Routes'

document.addEventListener('DOMContentLoaded', () =>
  mountWithApolloProvider(
    withBrowserRouter(Routes),
    {},
    document.getElementById('root')
  )
)
