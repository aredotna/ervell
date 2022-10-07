import { isEmpty, set } from 'lodash'
import { merge } from 'merge-anything'
import { parse } from 'qs'
import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'
import tokenizeSearch, {
  generateUrlFromVariables,
  stringifyFacet,
  stringifyOrder,
  stringifyRange,
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
import { DisabledFilters, getDisabledFilters } from './utils/filters'
// import { currentBlockFilters, hasBlockFilters } from './utils/where'

export type AnyFilter = WhatEnum | WhereEnum | SortOrderEnum | FieldsEnum

export interface State {
  query: string
  variables: AdvancedSearchVariables
  disabledFilters: DisabledFilters
  mode: 'full' | 'quick'
  total: number
}

type Action =
  | { type: 'QUERY_CHANGE'; payload: string }
  | {
      type: 'ADD_FILTER'
      payload: {
        field: 'where' | 'what' | 'fields'
        filter: WhereEnum | WhatEnum | FieldsEnum
        id?: string
      }
    }
  | { type: 'ADD_WHERE_FILTER'; payload: { filter: WhereEnum; id: string } }
  | { type: 'REMOVE_WHERE_FILTER'; payload: { filter: WhereEnum; id: string } }
  | {
      type: 'REMOVE_FILTER'
      payload: {
        field: 'where' | 'what' | 'fields'
        filter: WhereEnum | WhatEnum | FieldsEnum
      }
    }
  | {
      type: 'RESET_ALL'
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
  | {
      type: 'SET_RANGE'
      payload: {
        before?: string
        after?: string
      }
    }
  | {
      type: 'SET_VARIABLES'
      payload: AdvancedSearchVariables
    }
  | {
      type: 'SET_TOTAL'
      payload: number
    }

const extractVariableFromStateAndPayload = (
  state: State,
  payload: {
    field: 'where' | 'what' | 'fields'
    filter?: WhereEnum | WhatEnum | FieldsEnum
    id?: string
  }
) => {
  const { field, filter, id } = payload
  const typedFilter: any = filter ? filter : null
  const variables = { ...state.variables }
  const existingFacet: any =
    field === 'where'
      ? variables.where && variables.where[0]?.facet
      : variables[field]?.facets || null

  return {
    field,
    filter: typedFilter,
    variables,
    existingFacet,
    id,
  }
}

export const ReducerMethodMap = {
  ADD_FILTER: (state: State, action: any) => {
    const {
      field,
      filter,
      variables,
      existingFacet,
      id,
    } = extractVariableFromStateAndPayload(state, action.payload)
    const newValue = filter as WhereEnum

    if (field === 'where') {
      set(variables, 'where', [{ facet: newValue }])
    } else {
      set(variables, `${field}.facets`, newValue)
    }

    if (id) set(variables, 'where[0].id', id)

    const regex = new RegExp(`(\\s)${field}:(\\S*)`, 'gm')
    const query = existingFacet
      ? state.query.replace(regex, ` ${stringifyFacet(field, filter)}`)
      : `${state.query} ${stringifyFacet(field, filter, id)} `

    const disabledFilters = getDisabledFilters(variables, query)

    return {
      query,
      variables,
      disabledFilters,
      mode: state.mode,
      total: state.total,
    }
  },

  ADD_WHERE_FILTER: (state: State, action: any) => {
    const { field, filter, variables, id } = extractVariableFromStateAndPayload(
      state,
      action.payload
    )
    const newValue = filter as WhereEnum

    set(variables, 'where', [{ facet: newValue }, ...variables.where])
    if (id) set(variables, 'where[0].id', id)

    const query = `${state.query} ${stringifyFacet(field, filter, id)} `
    const disabledFilters = getDisabledFilters(variables, query)

    return {
      query,
      variables,
      disabledFilters,
      mode: state.mode,
      total: state.total,
    }
  },

  REMOVE_FILTER: (state: State, action: any) => {
    const { field, filter, variables } = extractVariableFromStateAndPayload(
      state,
      action.payload
    )

    set(variables, `${field}`, null)
    delete variables[field]
    const query = state.query.replace(` ${stringifyFacet(field, filter)}`, '')
    const disabledFilters = getDisabledFilters(variables, query)

    return { ...state, query, variables, disabledFilters }
  },

  REMOVE_WHERE_FILTER: (state: State, action: any) => {
    const { field, filter, variables } = extractVariableFromStateAndPayload(
      state,
      action.payload
    )

    set(
      variables,
      'where',
      variables.where.filter(({ facet }) => facet !== filter)
    )

    const query = state.query.replace(` ${stringifyFacet(field, filter)}`, '')
    const disabledFilters = getDisabledFilters(variables, query)

    return { ...state, query, variables, disabledFilters }
  },

  RESET_ALL: (state: State) => {
    const variables = {}
    const query = ''
    const disabledFilters = getDisabledFilters(variables, query)

    return { ...state, query, variables, disabledFilters }
  },

  SET_ALL: (state: State, action: any) => {
    const { field, variables } = extractVariableFromStateAndPayload(
      state,
      action.payload
    )

    const newValue = field === 'where' ? FieldsEnum.ALL : [FieldsEnum.ALL]
    const facetKey = field === 'where' ? 'facet' : 'facets'

    set(variables, `${field}.${facetKey}`, newValue)
    const regex = new RegExp(`(\\s)${field}:(\\S*)`, 'gm')
    const query = state.query.replace(regex, '')

    const disabledFilters = getDisabledFilters(variables, query)

    return {
      ...state,
      query: `${query} ${stringifyFacet(field, FieldsEnum.ALL)}`,
      variables,
      disabledFilters,
    }
  },

  QUERY_CHANGE: (state: State, action: any) => {
    const newVariables = tokenizeSearch(action.payload)

    const variables = merge(state.variables, newVariables, {
      page: null,
      per: null,
    }) as any

    if (isEmpty(newVariables.term?.facet)) {
      delete variables.term?.facet
    }

    if (isEmpty(newVariables.where)) {
      delete variables.where
    }

    if (isEmpty(newVariables.what)) {
      delete variables.what
    }

    if (isEmpty(newVariables.fields)) {
      delete variables.fields
    }

    if (isEmpty(newVariables.order)) {
      delete variables.order
    }

    if (isEmpty(newVariables.before)) {
      delete variables.before
    }

    if (isEmpty(newVariables.after)) {
      delete variables.after
    }

    return {
      ...state,
      query: action.payload,
      variables,
      disabledFilters: getDisabledFilters(variables, action.payload),
    }
  },

  SET_VARIABLES: (state: State, action: any) => {
    const newVariables = action.payload

    return {
      ...state,
      variables: newVariables,
      query: stringifyVariables(newVariables),
      disabledFilters: getDisabledFilters(state.variables, newVariables),
    }
  },

  SET_RANGE: (state: State, action: any) => {
    const { before, after } = action.payload
    let query = state.query

    if (state.variables.before || state.variables.after) {
      query = query.replace(
        ` ${stringifyRange(state.variables.before, state.variables.after)}`,
        ` ${stringifyRange(before, after)}`
      )
    } else {
      query = `${query} ${stringifyRange(before, after)}`
    }

    const variables = {
      ...state.variables,
      before,
      after,
    }

    return {
      ...state,
      query,
      disabledFilters: getDisabledFilters(variables, query),
      variables,
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
      disabledFilters: getDisabledFilters(variables, query),
      variables,
    }
  },

  SET_TOTAL: (state: State, action: any) => {
    return { ...state, total: action.payload }
  },
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_FILTER':
    case 'REMOVE_FILTER':
    case 'SET_ALL':
    case 'QUERY_CHANGE':
    case 'SET_ORDER':
    case 'SET_RANGE':
    case 'SET_VARIABLES':
    case 'RESET_ALL':
    case 'SET_TOTAL':
    case 'ADD_WHERE_FILTER':
    case 'REMOVE_WHERE_FILTER':
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
    id?: string
  ) => void
  removeFilter: (
    field: 'where' | 'what' | 'fields',
    filter: WhereEnum | WhatEnum | FieldsEnum
  ) => void
  addWhereFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    id?: string
  ) => void
  removeWhereFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    id?: string
  ) => void
  setAllFilter: (field: 'where' | 'what' | 'fields') => void
  setOrder: (facet: SortOrderEnum, dir: SortDirection) => void
  setRange: (before?: string, after?: string) => void
  setTotal: (total: number) => void
  resetAll: () => void
  updateQuery: (query: string) => void
  generateUrl: (paramsOnly?: boolean, basePath?: string) => string
  state: State
}

export const AdvancedSearchContext = createContext<AdvancedSearchContextType>({
  addFilter: () => {},
  removeFilter: () => {},
  addWhereFilter: () => {},
  removeWhereFilter: () => {},
  updateQuery: () => {},
  setAllFilter: () => {},
  setOrder: () => {},
  setRange: () => {},
  setTotal: () => {},
  generateUrl: () => '',
  resetAll: () => {},
  state: {
    query: '',
    variables: {},
    disabledFilters: {},
    mode: 'quick',
    total: 0,
  },
})

interface AdvancedSearchContextProps {
  variables?: AdvancedSearchVariables
  onVariablesChange?: (state: AdvancedSearchVariables) => void
  onQueryChange?: (query: string) => void
}

export const AdvancedSearchContextProvider: React.FC<AdvancedSearchContextProps> = ({
  onVariablesChange,
  onQueryChange,
  children,
}) => {
  const [searchParams] = useSearchParams()
  const parsedVariables = parse(searchParams.toString(), {
    ignoreQueryPrefix: true,
    parseArrays: true,
  }) as AdvancedSearchVariables

  const page = parsedVariables.page as any
  const per = parsedVariables.per as any

  if (parsedVariables.where && parsedVariables.where[0].facet == WhereEnum.MY) {
    parsedVariables.where[0].id = null
  }

  if (parseInt(page)) set(parsedVariables, 'page', parseInt(page))
  if (parseInt(per)) set(parsedVariables, 'per', parseInt(per))

  const [state, dispatch] = useReducer(reducer, {
    query: stringifyVariables(parsedVariables),
    variables: parsedVariables || {},
    disabledFilters: getDisabledFilters(
      parsedVariables,
      parsedVariables?.term?.facet
    ),
    mode: 'quick',
    total: 0,
  })

  const addFilter = useCallback(
    (
      field: 'where' | 'what' | 'fields',
      filter: WhereEnum | WhatEnum | FieldsEnum,
      id?: string
    ) => {
      dispatch({ type: 'ADD_FILTER', payload: { field, filter, id } })
    },
    []
  )

  const addWhereFilter = useCallback((filter: WhereEnum, id?: string) => {
    dispatch({ type: 'ADD_WHERE_FILTER', payload: { filter, id } })
  }, [])

  const removeFilter = useCallback(
    (
      field: 'where' | 'what' | 'fields',
      filter: WhereEnum | WhatEnum | FieldsEnum
    ) => {
      dispatch({ type: 'REMOVE_FILTER', payload: { field, filter } })
    },
    []
  )

  const removeWhereFilter = useCallback((filter: WhereEnum, id?: string) => {
    dispatch({ type: 'REMOVE_WHERE_FILTER', payload: { filter, id } })
  }, [])

  const setAllFilter = useCallback((field: 'where' | 'what' | 'fields') => {
    dispatch({ type: 'SET_ALL', payload: { field } })
  }, [])

  const setOrder = useCallback((facet: SortOrderEnum, dir: SortDirection) => {
    dispatch({ type: 'SET_ORDER', payload: { facet, dir } })
  }, [])

  const setRange = useCallback((before?: string, after?: string) => {
    dispatch({ type: 'SET_RANGE', payload: { before, after } })
  }, [])

  const updateQuery = useCallback((query: string) => {
    dispatch({ type: 'QUERY_CHANGE', payload: query })
  }, [])

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' })
  }, [])

  const generateUrl = useCallback(
    (paramsOnly?: boolean, basePath?: string) => {
      return generateUrlFromVariables(state.variables, paramsOnly, basePath)
    },
    [state.query]
  )

  const setTotal = useCallback((total: number) => {
    dispatch({ type: 'SET_TOTAL', payload: total })
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
        addWhereFilter,
        removeFilter,
        removeWhereFilter,
        updateQuery,
        setAllFilter,
        setOrder,
        setRange,
        setTotal,
        generateUrl,
        resetAll,
      }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  )
}
