import React, { useCallback, useEffect, useState } from 'react'

import SearchInput from 'v2/components/UI/SearchInput'
import useMergeState from 'v2/hooks/useMergeState'
import tokenizeSearch, {
  stringifyVariables,
} from 'v2/util/tokenizeAdvancedSearch'

import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'

type State = AdvancedSearchVariables

interface AdvancedSearchProps {
  onChange?: (state: State) => void
  searchState?: State
  query?: string
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onChange,
  searchState,
  query,
}) => {
  const [_query, setQuery] = useState<string>(query)
  const [state] = useMergeState<State>(searchState)

  const handleQuery = useCallback(
    (value: string) => {
      setQuery(value)
      const variables = tokenizeSearch(value)
      onChange && onChange(variables)
    },
    [state]
  )

  useEffect(() => {
    // const query = stringifyVariables(searchState)
    // setQuery(query)
  }, [searchState, setQuery, query])

  return (
    <>
      <SearchInput query={_query} onDebouncedQueryChange={handleQuery} />
    </>
  )
}

export default AdvancedSearch
