import { compact, flatten, isEmpty } from 'lodash'
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

export const allFacetsFromVariables = (
  variables: AdvancedSearchVariables
): AnyFilter[] => {
  const whereFacets = variables?.where?.facets
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
