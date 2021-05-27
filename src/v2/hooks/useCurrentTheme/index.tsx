import { useApolloClient } from '@apollo/client'

import CURRENT_THEME_QUERY from 'v2/hooks/useCurrentTheme/queries/theme'

import { CurrentThemeHookQuery } from '__generated__/CurrentThemeHookQuery'

export default function() {
  const client = useApolloClient()

  const cache = client.readQuery<CurrentThemeHookQuery>({
    query: CURRENT_THEME_QUERY,
  })

  const {
    sharify: { theme },
  } = cache

  return theme
}
