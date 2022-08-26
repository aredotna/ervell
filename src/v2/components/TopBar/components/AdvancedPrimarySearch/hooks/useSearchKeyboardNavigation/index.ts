import { useCallback, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import useRecentSearches, {
  isFullSearch,
  RecentSearch,
} from 'v2/hooks/useRecentSearches'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { generateUrlFromVariables } from 'v2/util/tokenizeAdvancedSearch'
import { AdvancedQuickSearchResult } from '__generated__/AdvancedQuickSearchResult'

export default function({
  searchInputRef,
  results,
}: {
  searchInputRef: React.RefObject<HTMLInputElement>
  results: RecentSearch[]
}) {
  const {
    resetAll,
    generateUrl,
    state: { variables },
  } = useContext(AdvancedSearchContext)
  const { addRecentSearch } = useRecentSearches()
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location

  const onEnter = useCallback(
    ({
      element,
      state,
    }: {
      index: number
      element: AdvancedQuickSearchResult | RecentSearch | null
      state: any
    }) => {
      const elementOrVariables = element || variables
      addRecentSearch(elementOrVariables)

      if (isFullSearch(elementOrVariables)) {
        searchInputRef?.current?.blur()
        const url = generateUrlFromVariables(
          elementOrVariables,
          false,
          pathname
        )
        return navigate(url)
      }

      if (
        element &&
        !isFullSearch(element) &&
        state.interactive &&
        (element.__typename === 'User' ||
          element.__typename === 'Group' ||
          element.__typename === 'Channel')
      ) {
        resetAll()
        searchInputRef?.current?.blur()
        return navigate(element.href, { state: getBreadcrumbPath(element) })
      }

      if (
        element &&
        state.interactive &&
        !isFullSearch(element) &&
        (element.__typename === 'Attachment' ||
          element.__typename === 'Embed' ||
          element.__typename === 'Text' ||
          element.__typename == 'Image' ||
          element.__typename === 'Link')
      ) {
        const state = location && {
          background: JSON.stringify(location),
          context: [],
        }
        searchInputRef?.current?.blur()
        return navigate(element.href, { state })
      }

      searchInputRef?.current?.blur()
      return navigate(generateUrl(false, pathname))
    },
    [
      searchInputRef,
      generateUrl,
      pathname,
      resetAll,
      addRecentSearch,
      variables,
    ]
  )

  const { index, interactive } = useKeyboardListNavigation({
    ref: searchInputRef,
    list: results,
    waitForInteractive: true,
    defaultValue: null,
    onEnter,
  })

  return {
    index,
    interactive,
  }
}
