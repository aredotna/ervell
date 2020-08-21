import { useApolloClient } from 'react-apollo'

import ERROR_PAGE_QUERY from 'v2/hooks/useIsOutsideMainRouter/queries/isOutsideMainRouter'

import { IsOutsideMainRouterQueryHook } from '__generated__/IsOutsideMainRouterQueryHook'

// TODO: Delete isOutsideMainRouter
// This is a temporary measure to handle cases where components can exist both
// inside and outside the main router.

export default function() {
  const client = useApolloClient()

  try {
    const cache = client.readQuery<IsOutsideMainRouterQueryHook>({
      query: ERROR_PAGE_QUERY,
    })

    const {
      sharify: { isOutsideMainRouter },
    } = cache

    return isOutsideMainRouter
  } catch {
    return false
  }
}
