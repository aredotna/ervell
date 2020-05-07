import { useApolloClient } from 'react-apollo'

import LOGIN_STATUS_QUERY from 'v2/hooks/useLoginStatus/queries/loginStatus'

import { IsLoggedInQueryHook } from '__generated__/IsLoggedInQueryHook'

export default function() {
  const client = useApolloClient()

  console.log('process.env', process.env)

  const cache = client.readQuery<IsLoggedInQueryHook>({
    query: LOGIN_STATUS_QUERY,
  })

  if (!cache) {
    return { isLoggedIn: false }
  }

  const { loginStatus } = cache
  return loginStatus
}
