import { set } from 'lodash'
import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import tokenizeSearch, {
  stringifyFacet,
  stringifyVariables,
} from 'v2/util/tokenizeAdvancedSearch'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'

interface State {
  query: string
  variables: AdvancedSearchVariables
}

type Action =
  | { type: 'QUERY_CHANGE'; payload: string }
  | {
      type: 'ADD_FILTER'
      payload: {
        field: 'where' | 'what' | 'fields'
        filter: WhereEnum | WhatEnum | FieldsEnum
      }
    }
  | {
      type: 'REMOVE_FILTER'
      payload: {
        field: 'where' | 'what' | 'fields'
        filter: WhereEnum | WhatEnum | FieldsEnum
      }
    }
  | {
      type: 'SET_ALL'
      payload: {
        field: 'where' | 'what' | 'fields'
      }
    }

const extractVariableFromStateAndPayload = (
  state: State,
  payload: {
    field: 'where' | 'what' | 'fields'
    filter?: WhereEnum | WhatEnum | FieldsEnum
  }
) => {
  const { field, filter } = payload
  const typedFilter: any = filter ? filter : null
  const variables = { ...state.variables }
  const existingFacets: any = variables[field]?.facets || []
  return {
    field,
    filter: typedFilter,
    variables,
    existingFacets,
  }
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      const {
        field,
        filter,
        variables,
        existingFacets,
      } = extractVariableFromStateAndPayload(state, action.payload)

      const newValue = [...existingFacets, filter as WhereEnum]

      // remove ALL filter if it exists
      if (newValue.includes(FieldsEnum.ALL)) {
        newValue.splice(newValue.indexOf(FieldsEnum.ALL), 1)
      }

      set(variables, `${field}.facets`, newValue)
      const query = `${state.query} ${stringifyFacet(field, filter)}`

      return { query, variables }
    case 'REMOVE_FILTER':
      const {
        field: field2,
        filter: filter2,
        variables: variables2,
        existingFacets: existingFacets2,
      } = extractVariableFromStateAndPayload(state, action.payload)

      const newValue2 = existingFacets2.filter(f => f !== filter2)
      set(variables2, `${field2}.facets`, newValue2)
      const query2 = state.query.replace(
        ` ${stringifyFacet(field2, filter2)}`,
        ''
      )

      return { query: query2, variables: variables2 }

    case 'SET_ALL':
      const {
        field: field3,
        variables: variables3,
      } = extractVariableFromStateAndPayload(state, action.payload)

      const newValue3 = [FieldsEnum.ALL]
      set(variables3, `${field3}.facets`, newValue3)
      const regex = new RegExp(`(\\s)${field3}:(\\S*)`, 'gm')
      const query3 = state.query.replace(regex, '')

      return { query: query3, variables: variables3 }

    case 'QUERY_CHANGE':
      return {
        ...state,
        query: action.payload,
        variables: tokenizeSearch(action.payload),
      }
    default:
      return state
  }
}

interface AdvancedSearchContextType {
  addFilter: (
    field: 'where' | 'what' | 'fields',
    filter: WhereEnum | WhatEnum | FieldsEnum
  ) => void
  removeFilter: (
    field: 'where' | 'what' | 'fields',
    filter: WhereEnum | WhatEnum | FieldsEnum
  ) => void
  setAllFilter: (field: 'where' | 'what' | 'fields') => void
  updateQuery: (query: string) => void
  state: State
}

export const AdvancedSearchContext = createContext<AdvancedSearchContextType>({
  addFilter: () => {},
  removeFilter: () => {},
  updateQuery: () => {},
  setAllFilter: () => {},
  state: {
    query: '',
    variables: {},
  },
})

interface AdvancedSearchContextProps {
  variables?: AdvancedSearchVariables
  onVariablesChange?: (state: AdvancedSearchVariables) => void
  onQueryChange?: (query: string) => void
}

export const AdvancedSearchContextProvider: React.FC<AdvancedSearchContextProps> = ({
  variables,
  onVariablesChange,
  onQueryChange,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    query: stringifyVariables(variables),
    variables: variables || {},
  })

  const addFilter = useCallback(
    (
      field: 'where' | 'what' | 'fields',
      filter: WhereEnum | WhatEnum | FieldsEnum
    ) => {
      dispatch({ type: 'ADD_FILTER', payload: { field, filter } })
    },
    []
  )

  const removeFilter = useCallback(
    (
      field: 'where' | 'what' | 'fields',
      filter: WhereEnum | WhatEnum | FieldsEnum
    ) => {
      dispatch({ type: 'REMOVE_FILTER', payload: { field, filter } })
    },
    []
  )

  const setAllFilter = useCallback((field: 'where' | 'what' | 'fields') => {
    dispatch({ type: 'SET_ALL', payload: { field } })
  }, [])

  const updateQuery = useCallback((query: string) => {
    dispatch({ type: 'QUERY_CHANGE', payload: query })
  }, [])

  useEffect(() => {
    if (onVariablesChange) {
      onVariablesChange(state.variables)
    }
  }, [state.variables])

  useEffect(() => {
    if (onQueryChange) {
      onQueryChange(state.query)
    }
  }, [state.query])

  return (
    <AdvancedSearchContext.Provider
      value={{ state, addFilter, removeFilter, updateQuery, setAllFilter }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  )
}
