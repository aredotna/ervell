import { compact, flatten, isEmpty, merge } from 'lodash'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import {
  FieldsEnum,
  SortOrderEnum,
  WhatEnum,
  WhereEnum,
} from '__generated__/globalTypes'
import { AnyFilter } from '../AdvancedSearchContext'

const disabledFilterRules = {
  // "My Are.na" does not contain users
  [WhereEnum.MY]: [WhatEnum.USER],

  // When scoped by person, no users
  [WhereEnum.USER]: [WhatEnum.USER],

  // Channels, users, groups do not contain urls or domains
  [WhatEnum.CHANNEL]: [FieldsEnum.DOMAIN, FieldsEnum.URL],
  [WhatEnum.USER]: [FieldsEnum.DOMAIN, FieldsEnum.URL],
  [WhatEnum.GROUP]: [
    FieldsEnum.DOMAIN,
    FieldsEnum.URL,
    SortOrderEnum.CONNECTIONS_COUNT,
  ],

  // And the reverse
  [WhatEnum.USER]: [WhereEnum.MY],
  [FieldsEnum.DOMAIN]: [WhatEnum.CHANNEL, WhatEnum.GROUP],
  [FieldsEnum.URL]: [WhatEnum.CHANNEL, WhatEnum.GROUP],
  [SortOrderEnum.CONNECTIONS_COUNT]: [WhatEnum.GROUP],
}

export const scopedDisabledFilters = {
  where: {
    [WhereEnum.MY]: {
      what: [WhatEnum.USER],
    },
    [WhereEnum.USER]: {
      what: [WhatEnum.USER],
    },
  },
  what: {
    [WhatEnum.CHANNEL]: {
      fields: [FieldsEnum.DOMAIN, FieldsEnum.URL],
    },
    [WhatEnum.USER]: {
      fields: [FieldsEnum.DOMAIN, FieldsEnum.URL],
      where: [WhereEnum.MY],
    },
    [WhatEnum.GROUP]: {
      fields: [FieldsEnum.DOMAIN, FieldsEnum.URL],
      order: [SortOrderEnum.CONNECTIONS_COUNT],
    },
  },
  fields: {
    [FieldsEnum.DOMAIN]: {
      what: [WhatEnum.CHANNEL, WhatEnum.GROUP],
    },
    [FieldsEnum.URL]: {
      what: [WhatEnum.CHANNEL, WhatEnum.GROUP],
    },
  },
  order: {
    [SortOrderEnum.CONNECTIONS_COUNT]: {
      what: [WhatEnum.GROUP],
    },
  },
}

interface DisabledFilters {
  what?: AnyFilter[]
  where?: AnyFilter[]
  fields?: AnyFilter[]
  order?: AnyFilter[]
}

export const getDisabledFilters = (
  variables: AdvancedSearchVariables,
  query: string
): DisabledFilters => {
  const { where, what, fields, order } = variables
  let disabledFilters = {}

  if (!isEmpty(where)) {
    disabledFilters = merge(
      disabledFilters,
      scopedDisabledFilters.where[where[0].facet]
    )
  }
  if (!isEmpty(what)) {
    disabledFilters = merge(
      disabledFilters,
      scopedDisabledFilters.what[what.facets[0]]
    )
  }
  if (!isEmpty(fields)) {
    disabledFilters = merge(
      disabledFilters,
      scopedDisabledFilters.fields[fields.facets[0]]
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

export const allFacetsFromVariables = (
  variables: AdvancedSearchVariables
): AnyFilter[] => {
  const whereFacets = variables?.where ? variables?.where[0]?.facet : []
  const fieldsFacets = variables?.fields?.facets
  const whatFacets = variables?.what?.facets
  const orderFacet = variables?.order?.facet

  return [...whereFacets, ...fieldsFacets, ...whatFacets, orderFacet]
}

export const calculatedDisabledFilters = (
  variables: AdvancedSearchVariables,
  query: string
): AnyFilter[] => {
  const allFacets = allFacetsFromVariables(variables)
  const disabledFilters = compact(
    flatten(allFacets.map(f => disabledFilterRules[f]))
  )

  if (isEmpty(query)) disabledFilters.push(WhatEnum.USER)

  return disabledFilters
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
