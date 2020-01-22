import { mountWithApolloProvider } from 'v2/apollo'

import withBrowserRouter from 'v2/hocs/WithBrowserRouter'
import Routes from 'apps/marklet/Routes'

import { StorageAccessCheck } from 'v2/components/Bookmarklet/components/StorageAccessCheck'

const initialize = () => {
  const mountPoint = document.getElementById('root')
  const mountBookmarklet = hasStorageAccess =>
    mountWithApolloProvider(
      withBrowserRouter(Routes),
      { hasStorageAccess },
      mountPoint
    )

  if (typeof document.hasStorageAccess === 'function') {
    // If this is Safari, we can attempt to establish storage access
    document.hasStorageAccess().then(hasAccess => {
      if (hasAccess) {
        // We've got access, go ahead and load the bookmarklet.
        console.log('hasAccess', hasAccess)
        return mountBookmarklet(hasAccess)
      }
    })

    // We don't have access, load the storage access check
    mountWithApolloProvider(StorageAccessCheck, {}, mountPoint)
  } else {
    // Otherwise, just try to open the bookmarklet
    console.log('just opening the pane')
    return mountBookmarklet()
  }
}

document.addEventListener('DOMContentLoaded', initialize)
