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
import { calculatedDisabledFilters } from './utils/filters'
// import { currentBlockFilters, hasBlockFilters } from './utils/where'

export type AnyFilter = WhatEnum | WhereEnum | SortOrderEnum | FieldsEnum

export interface State {
  query: string
  variables: AdvancedSearchVariables
  disabledFilters: AnyFilter[]
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

const ReducerMethodMap = {
  ADD_FILTER: (state: State, action: any) => {
    const {
      field,
      filter,
      variables,
      existingFacet,
    } = extractVariableFromStateAndPayload(state, action.payload)
    const newValue = filter as WhereEnum

    set(variables, `${field}.facets`, newValue)
    const regex = new RegExp(`(\\s)${field}:(\\S*)`, 'gm')
    const query = existingFacet
      ? state.query.replace(regex, ` ${stringifyFacet(field, filter)}`)
      : `${state.query} ${stringifyFacet(field, filter)}`

    const disabledFilters = calculatedDisabledFilters(variables, query)

    return { query, variables, disabledFilters }
  },

  REMOVE_FILTER: (state: State, action: any) => {
    const { field, filter, variables } = extractVariableFromStateAndPayload(
      state,
      action.payload
    )

    set(variables, `${field}`, null)
    delete variables[field]
    const query = state.query.replace(` ${stringifyFacet(field, filter)}`, '')
    const disabledFilters = calculatedDisabledFilters(variables, query)

    return { ...state, query, variables, disabledFilters }
  },

  SET_ALL: (state: State, action: any) => {
    const { field, variables } = extractVariableFromStateAndPayload(
      state,
      action.payload
    )

    const newValue = [FieldsEnum.ALL]
    set(variables, `${field}.facets`, newValue)
    const regex = new RegExp(`(\\s)${field}:(\\S*)`, 'gm')
    const query = state.query.replace(regex, '')

    const disabledFilters = calculatedDisabledFilters(variables, query)

    return {
      ...state,
      query: `${query} ${stringifyFacet(field, FieldsEnum.ALL)}`,
      variables,
      disabledFilters,
    }
  },

  QUERY_CHANGE: (state: State, action: any) => {
    const variables = tokenizeSearch(action.payload)
    return {
      ...state,
      query: action.payload,
      variables,
      disabledFilters: calculatedDisabledFilters(variables, action.payload),
    }
  },

  SET_ORDER: (state: State, action: any) => {
    const { facet, dir } = action.payload

    let query = state.query

    if (state.variables?.order) {
      query = state.query.replace(
        ` ${stringifyOrder(
          state.variables.order.facet,
          state.variables.order.dir
        )}`,
        ` ${stringifyOrder(facet, dir)}`
      )
    } else {
      query = `${state.query} ${stringifyOrder(facet, dir)}`
    }

    const variables = {
      ...state.variables,
      order: {
        ...state.variables?.order,
        facet: facet,
        dir: dir,
      },
    }

    return {
      ...state,
      query,
      disabledFilters: calculatedDisabledFilters(variables, query),
      variables,
    }
  },
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_FILTER':
    case 'REMOVE_FILTER':
    case 'SET_ALL':
    case 'QUERY_CHANGE':
    case 'SET_ORDER':
      return ReducerMethodMap[action.type](state, action)
    case 'TOGGLE_ALL_BLOCKS':
      return state
    default:
      return state
  }
}

interface AdvancedSearchContextType {
  addFilter: (
    field: 'where' | 'what' | 'fields',
    filter: WhereEnum | WhatEnum | FieldsEnum,
    id?: number
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
    disabledFilters: [],
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
    disabledFilters: [],
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
