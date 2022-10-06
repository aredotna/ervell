import { isEmpty, merge } from 'lodash'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import {
  FieldsEnum,
  SortOrderEnum,
  WhatEnum,
  WhereEnum,
} from '__generated__/globalTypes'
import { AnyFilter } from '../AdvancedSearchContext'

export const scopedDisabledFilters = {
  where: {
    [WhereEnum.MY]: {
      what: [WhatEnum.USER],
    },
    [WhereEnum.USER]: {
      what: [WhatEnum.USER],
    },
    [WhereEnum.FOLLOWING]: {
      what: [WhatEnum.USER],
    },
  },
  what: {
    [WhatEnum.CHANNEL]: {
      fields: [FieldsEnum.DOMAIN, FieldsEnum.URL, FieldsEnum.CONTENT],
    },
    [WhatEnum.USER]: {
      fields: [FieldsEnum.DOMAIN, FieldsEnum.URL, FieldsEnum.CONTENT],
      where: [WhereEnum.MY, WhereEnum.FOLLOWING],
    },
    [WhatEnum.GROUP]: {
      fields: [FieldsEnum.DOMAIN, FieldsEnum.URL, FieldsEnum.CONTENT],
      order: [SortOrderEnum.CONNECTIONS_COUNT],
    },
  },
  fields: {
    [FieldsEnum.DOMAIN]: {
      what: [WhatEnum.CHANNEL, WhatEnum.GROUP, WhatEnum.USER],
    },
    [FieldsEnum.URL]: {
      what: [WhatEnum.CHANNEL, WhatEnum.GROUP, WhatEnum.USER],
    },
    [FieldsEnum.CONTENT]: {
      what: [WhatEnum.CHANNEL, WhatEnum.GROUP, WhatEnum.USER],
    },
  },
  order: {
    [SortOrderEnum.CONNECTIONS_COUNT]: {
      what: [WhatEnum.GROUP],
    },
  },
}

export interface DisabledFilters {
  what?: AnyFilter[]
  where?: AnyFilter[]
  fields?: AnyFilter[]
  order?: AnyFilter[]
  period?: AnyFilter[]
}

const nonPremiumDisabledFilters = {
  what: [],
  where: [WhereEnum.FOLLOWING],
  fields: [
    FieldsEnum.CONTENT,
    FieldsEnum.DOMAIN,
    FieldsEnum.URL,
    FieldsEnum.DESCRIPTION,
    FieldsEnum.NAME,
  ],
  order: [
    SortOrderEnum.CONNECTIONS_COUNT,
    SortOrderEnum.RANDOM,
    SortOrderEnum.CREATED_AT,
    SortOrderEnum.NAME,
  ],
} as DisabledFilters

export const getDisabledFilters = (
  variables: AdvancedSearchVariables,
  query: string,
  notPremium?: boolean
): DisabledFilters => {
  const { where, what, fields, order } = variables
  let disabledFilters = {}

  if (notPremium) {
    disabledFilters = merge(disabledFilters, nonPremiumDisabledFilters)
  }

  if (!isEmpty(where)) {
    disabledFilters = merge(
      disabledFilters,
      scopedDisabledFilters.where[where[0].facet]
    )
  }

  if (!isEmpty(what)) {
    const whatFacets = (what?.facets as unknown) as WhatEnum
    disabledFilters = merge(
      disabledFilters,
      scopedDisabledFilters.what[whatFacets]
    )
  }

  if (!isEmpty(fields)) {
    const fieldsFacets = (fields?.facets as unknown) as FieldsEnum
    disabledFilters = merge(
      disabledFilters,
      scopedDisabledFilters.fields[fieldsFacets]
    )
  }

  if (!isEmpty(order)) {
    disabledFilters = merge(
      disabledFilters,
      scopedDisabledFilters.order[order.facet]
    )
  }

  if (isEmpty(query)) {
    disabledFilters = merge(disabledFilters, { what: [WhatEnum.USER] })
  }

  return disabledFilters
}

export const currentFilterIsDisabled = (
  type: 'what' | 'where' | 'fields' | 'order',
  filter: AnyFilter,
  disabledFilters: DisabledFilters
): boolean => {
  const disabled = disabledFilters[type]
  return disabled && disabled.includes(filter)
}

export const allFacetsFromVariables = (
  variables: AdvancedSearchVariables
): AnyFilter[] => {
  const whereFacets = variables?.where ? variables?.where[0]?.facet : []
  const fieldsFacets = variables?.fields?.facets
  const whatFacets = variables?.what?.facets
  const orderFacet = variables?.order?.facet

  return [...whereFacets, ...fieldsFacets, ...whatFacets, orderFacet]
}

export const getFilteredVariables = (
  variables: AdvancedSearchVariables,
  disabledFilters: DisabledFilters
): AdvancedSearchVariables => {
  const { where, what, fields, order } = variables
  const {
    what: disabledWhat,
    where: disabledWhere,
    fields: disabledFields,
    order: disabledOrder,
  } = disabledFilters
  const whatFacets = (what?.facets as unknown) as WhatEnum
  const fieldsFacets = (fields?.facets as unknown) as FieldsEnum

  const filteredWhere = where?.filter(
    facet => !disabledWhere?.includes(facet.facet)
  )
  const filteredWhat = disabledWhat.includes(whatFacets) ? undefined : what
  const filteredFields = disabledFields.includes(fieldsFacets)
    ? undefined
    : fields
  const filteredOrder =
    order?.facet && !disabledOrder?.includes(order.facet) ? order : undefined

  return {
    ...variables,
    where: filteredWhere,
    what: filteredWhat,
    fields: filteredFields,
    order: filteredOrder,
  }
}

export const getCurrentFilter = (
  field: 'what' | 'where' | 'fields',
  variables: AdvancedSearchVariables
) => {
  const currentFilter =
    field == 'where'
      ? variables.where && variables.where[0]?.facet
      : variables[field]?.facets || null

  return currentFilter
}
