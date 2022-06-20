import { useApolloClient } from '@apollo/client'
import { IsAdminQueryHook } from '__generated__/IsAdminQueryHook'
import useSerializedMe from '../useSerializedMe'
import ADMIN_SLUGS_QUERY from './queries/adminSlugs'

export default function() {
  const serializedMe = useSerializedMe()
  const client = useApolloClient()

  try {
    const cache = client.readQuery<IsAdminQueryHook>({
      query: ADMIN_SLUGS_QUERY,
    })

    const {
      sharify: { adminSlugs },
    } = cache

    return adminSlugs.includes(serializedMe.slug)
  } catch {
    return false
  }
}
