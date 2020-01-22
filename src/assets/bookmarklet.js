import { mountWithApolloProvider } from 'v2/apollo'

import withBrowserRouter from 'v2/hocs/WithBrowserRouter'
import Routes from 'apps/marklet/Routes'

const initialize = () => {
  const mountPoint = document.getElementById('root')
  const mountBookmarklet = () =>
    mountWithApolloProvider(withBrowserRouter(Routes), {}, mountPoint)

  if (typeof document.hasStorageAccess === 'function') {
    // If this is Safari, we can attempt to establish storage access
    document.hasStorageAccess().then(hasAccess => {
      if (hasAccess) {
        console.log('hasAccess', hasAccess)
        mountBookmarklet()
      } else {
        document.requestStorageAccess().then(
          () => {
            console.log('access granted')
            mountBookmarklet()
          },
          () => {
            console.log('access denied')
          }
        )
      }
    })
  } else {
    // Otherwise, just try to open the pane
    console.log('just opening the pane')
    mountBookmarklet()
  }
}

document.addEventListener('DOMContentLoaded', initialize)
