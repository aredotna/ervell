import { useApolloClient } from '@apollo/client'

import SEED_QUERY from 'v2/hooks/useSeed/queries/seedQuery'
import { UseSeedQuery } from '__generated__/UseSeedQuery'

export default function() {
  const client = useApolloClient()

  try {
    const cache = client.readQuery<UseSeedQuery>({
      query: SEED_QUERY,
    })

    const {
      sharify: { seed },
    } = cache

    return seed
  } catch {
    return false
  }
}
