import { useApolloClient } from 'react-apollo'

import LOGIN_STATUS_QUERY from 'v2/hooks/useLoginStatus/queries/loginStatus'

import { IsLoggedInQuery } from '__generated__/IsLoggedInQuery'

export default function() {
  const client = useApolloClient()

  const cache = client.readQuery<IsLoggedInQuery>({
    query: LOGIN_STATUS_QUERY,
  })

  if (!cache) {
    return { isLoggedIn: false }
  }

  const { loginStatus } = cache
  return loginStatus
}
