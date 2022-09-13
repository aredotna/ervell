import { isEqual } from 'lodash'
import { useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { AdvancedQuickSearchResult } from '__generated__/AdvancedQuickSearchResult'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'

export type RecentSearch = AdvancedSearchVariables | AdvancedQuickSearchResult

export const isFullSearch = (
  search: RecentSearch
): search is AdvancedSearchVariables => {
  const typedSearch = search as AdvancedSearchVariables
  return typedSearch.term !== undefined || typedSearch.where !== undefined
}

export default function() {
  const [recentSearches, setRecentSearches] = useLocalStorageState<
    RecentSearch[]
  >('recentSearches', { ssr: false })

  const addRecentSearch = useCallback(
    (search: RecentSearch) => {
      let newRecentSearches = recentSearches?.filter(x => x) || []

      // find if search is a search result or a search variables
      const isSearchResult = isFullSearch(search)

      // if search is a search result, find if it already exists
      const existingSearch = newRecentSearches?.find(x => {
        if (isFullSearch(x) && isSearchResult) {
          return x.term?.facet === search.term?.facet
        }

        if (!isFullSearch(x) && !isSearchResult) {
          return x.id === search.id
        }
        return false
      })

      // if search already exists, remove it
      if (existingSearch) {
        newRecentSearches = recentSearches.filter(
          x => !isEqual(x, existingSearch)
        )
      }

      setRecentSearches([search, ...newRecentSearches].slice(0, 4))
    },
    [recentSearches, setRecentSearches]
  )

  return {
    recentSearches,
    setRecentSearches,
    addRecentSearch,
  }
}
