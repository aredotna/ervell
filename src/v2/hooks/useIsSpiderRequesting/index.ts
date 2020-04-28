import { useApolloClient } from 'react-apollo'

import SPIDER_REQUESTING_QUERY from 'v2/hooks/useIsSpiderRequesting/queries/isSpiderRequesting'

import { IsSpiderRequestingQuery } from '__generated__/IsSpiderRequestingQuery'

export default function() {
  const client = useApolloClient()

  const cache = client.readQuery<IsSpiderRequestingQuery>({
    query: SPIDER_REQUESTING_QUERY,
  })

  const {
    sharify: { isSpiderRequesting },
  } = cache

  return isSpiderRequesting
}
