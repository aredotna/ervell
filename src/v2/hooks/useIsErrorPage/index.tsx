import { useApolloClient } from 'react-apollo'

import ERROR_PAGE_QUERY from 'v2/hooks/useIsErrorPage/queries/isErrorPage'

import { IsErrorPageQueryHook } from '__generated__/IsErrorPageQueryHook'

export default function() {
  const client = useApolloClient()

  try {
    const cache = client.readQuery<IsErrorPageQueryHook>({
      query: ERROR_PAGE_QUERY,
    })

    const {
      sharify: { isErrorPage },
    } = cache

    return isErrorPage
  } catch {
    return false
  }
}
