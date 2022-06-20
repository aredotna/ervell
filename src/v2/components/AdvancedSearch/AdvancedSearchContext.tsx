import { set } from 'lodash'
import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import tokenizeSearch, {
  stringifyFacet,
  stringifyOrder,
  stringifyVariables,
} from 'v2/util/tokenizeAdvancedSearch'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import {
  FieldsEnum,
  SortDirection,
  SortOrderEnum,
  WhatEnum,
  WhereEnum,
} from '__generated__/globalTypes'
// import { currentBlockFilters, hasBlockFilters } from './utils/where'

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
  | {
      type: 'TOGGLE_ALL_BLOCKS'
    }
  | {
      type: 'SET_ORDER'
      payload: {
        facet: SortOrderEnum
        dir: SortDirection
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
  const existingFacet: any = variables[field]?.facets || null
  return {
    field,
    filter: typedFilter,
    variables,
    existingFacet,
  }
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      const {
        field,
        filter,
        variables,
        existingFacet,
      } = extractVariableFromStateAndPayload(state, action.payload)

      const newValue = filter as WhereEnum

      set(variables, `${field}.facets`, newValue)
      const regex1 = new RegExp(`(\\s)${field}:(\\S*)`, 'gm')
      const query = existingFacet
        ? state.query.replace(regex1, ` ${stringifyFacet(field, filter)}`)
        : `${state.query} ${stringifyFacet(field, filter)}`

      return { query, variables }
    case 'REMOVE_FILTER':
      const {
        field: field2,
        filter: filter2,
        variables: variables2,
      } = extractVariableFromStateAndPayload(state, action.payload)

      set(variables2, `${field2}.facets`, null)
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

      return {
        query: `${query3} ${stringifyFacet(field3, FieldsEnum.ALL)}`,
        variables: variables3,
      }

    // case 'TOGGLE_ALL_BLOCKS':
    //   const {
    //     variables: variables4,
    //     existingFacets: existingFacets4,
    //   } = extractVariableFromStateAndPayload(state, { field: 'what', filter: WhatEnum.BLOCK })

    //   const blockFilters = currentBlockFilters(existingFacets4 as WhatEnum[])
    //   let newValue4: WhatEnum[] = []

    //   // if there are block filters, remove them and set value to BLOCK
    //   if (blockFilters.length > 0) {
    //     const newValue4 = existingFacets4.filter(f => blockFilters.indexOf(f) === -1)
    //     set(variables4, 'what.facets', newValue4)
    //     const query4 = state.query.replace(
    //       ` ${stringifyFacet('what', blockFilters)}`,

    case 'QUERY_CHANGE':
      return {
        ...state,
        query: action.payload,
        variables: tokenizeSearch(action.payload),
      }

    case 'SET_ORDER':
      const { facet, dir } = action.payload

      const variables4 = { ...state.variables }
      let query4 = state.query

      if (state.variables?.order) {
        query4 = state.query.replace(
          ` ${stringifyOrder(
            state.variables.order.facet,
            state.variables.order.dir
          )}`,
          ` ${stringifyOrder(facet, dir)}`
        )
      } else {
        query4 = `${state.query} ${stringifyOrder(facet, dir)}`
      }

      return {
        ...state,
        query: query4,
        variables: {
          ...variables4,
          order: {
            ...variables4?.order,
            facet: facet,
            dir: dir,
          },
        },
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
  setOrder: (facet: SortOrderEnum, dir: SortDirection) => void
  updateQuery: (query: string) => void
  state: State
}

export const AdvancedSearchContext = createContext<AdvancedSearchContextType>({
  addFilter: () => {},
  removeFilter: () => {},
  updateQuery: () => {},
  setAllFilter: () => {},
  setOrder: () => {},
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

  const setOrder = useCallback((facet: SortOrderEnum, dir: SortDirection) => {
    dispatch({ type: 'SET_ORDER', payload: { facet, dir } })
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
      value={{
        state,
        addFilter,
        removeFilter,
        updateQuery,
        setAllFilter,
        setOrder,
      }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  )
}
