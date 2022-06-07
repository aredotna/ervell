import React, { createContext, useCallback } from 'react'
import useMergeState from 'v2/hooks/useMergeState'
import tokenizeSearch from 'v2/util/tokenizeAdvancedSearch'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'

interface AdvancedSearchContextType {
  handleQueryChange?: (query: string) => void
  handleStateChange?: (state: AdvancedSearchVariables) => void
  state: AdvancedSearchVariables
}

export const AdvancedSearchContext = createContext<AdvancedSearchContextType>({
  handleQueryChange: () => {},
  handleStateChange: () => {},
  state: {},
})

interface AdvancedSearchContextProps {
  state: AdvancedSearchVariables
  onChange?: (state: AdvancedSearchVariables) => void
}

export const AdvancedSearchContextProvider: React.FC<AdvancedSearchContextProps> = ({
  state,
  onChange,
  children,
}) => {
  const [searchState, setSearchState] = useMergeState<AdvancedSearchVariables>(
    state
  )

  const handleStateChange = useCallback((state: AdvancedSearchVariables) => {
    setSearchState(state)
    onChange && onChange(state)
  }, [])

  const handleQueryChange = useCallback((query: string) => {
    const variables = tokenizeSearch(query)
    handleStateChange(variables)
  }, [])

  return (
    <AdvancedSearchContext.Provider
      value={{ state: searchState, handleStateChange, handleQueryChange }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  )
}
