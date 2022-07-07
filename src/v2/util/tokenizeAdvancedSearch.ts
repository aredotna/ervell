import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { stringify } from 'qs'
import {
  FieldsEnum,
  SortDirection,
  SortOrderEnum,
  WhatEnum,
  WhereEnum,
} from '__generated__/globalTypes'

import { isArray, pickBy } from 'lodash'

export const tokenizeSearch = (search: string): AdvancedSearchVariables => {
  const tokens = search.split(/\s+/)

  // find the strings with ':' in them
  const colonTokens = tokens.filter(token => token.includes(':'))
  const searchTokens = tokens.filter(token => !token.includes(':'))

  // split the colon tokens into key:value pairs
  const colonTokenPairs = colonTokens.map(token => {
    const [key, value] = token.split(':')
    return { key, value }
  })

  const whereTokens = colonTokenPairs
    .filter(token => token.key === 'where')
    .map(token => WhereEnum[token.value.toUpperCase()])
    .filter(Boolean) as WhereEnum[]
  const whatTokens = colonTokenPairs
    .filter(token => token.key === 'what')
    .map(token => WhatEnum[token.value.toUpperCase()])
    .filter(Boolean) as WhatEnum[]
  const fieldsTokens = colonTokenPairs
    .filter(token => token.key === 'fields')
    .map(token => FieldsEnum[token.value.toUpperCase()])
    .filter(Boolean) as FieldsEnum[]
  const sortToken =
    (colonTokenPairs
      .find(token => token.key === 'sort')
      ?.value?.toUpperCase() as SortOrderEnum) || undefined
  const directionToken =
    (colonTokenPairs
      .find(token => token.key === 'dir')
      ?.value?.toUpperCase() as SortDirection) || undefined
  const per =
    parseInt(colonTokenPairs.find(token => token.key === 'per')?.value) || 24
  const page =
    parseInt(colonTokenPairs.find(token => token.key === 'page')?.value) || 1

  const term = searchTokens.join(' ').trim()

  const variables = {
    term: term === '' ? null : { facet: term },
    where: whereTokens.length ? { facets: whereTokens } : undefined,
    what: whatTokens.length ? { facets: whatTokens } : undefined,
    fields: fieldsTokens.length ? { facets: fieldsTokens } : undefined,
    order: sortToken ? { facet: sortToken, dir: directionToken } : undefined,
    per,
    page,
  }

  return pickBy(variables)
}

export const stringifyFacet = (
  field: 'where' | 'what' | 'fields',
  filter: WhereEnum | WhatEnum | FieldsEnum,
  id?: number
) => {
  if (field === 'where' && id) {
    return `${filter.toLowerCase()}:${id}`
  }
  return `${field}:${filter.toLowerCase()}`
}

const mapFacets = function(type, id) {
  return function(facet) {
    return stringifyFacet(type, facet, id)
  }
}

export const stringifyOrder = (
  order: SortOrderEnum,
  direction: SortDirection
) => {
  return `sort:${order.toLowerCase()} dir:${direction.toLocaleLowerCase()}`
}

export const stringifyVariables = (variables: AdvancedSearchVariables) => {
  const strings = [
    variables?.term?.facet ? `${variables?.term.facet}` : undefined,
    variables?.where?.facets?.length && isArray(variables?.where?.facets)
      ? variables?.where.facets
          ?.map(mapFacets('where', variables.where.id))
          .join(' ')
      : undefined,
    variables?.what?.facets?.length
      ? variables?.what.facets.map(mapFacets('what', null)).join(' ')
      : undefined,
    variables?.fields?.facets?.length
      ? variables?.fields.facets.map(mapFacets('fields', null)).join(' ')
      : undefined,
    variables?.order?.facet ? `sort:${variables?.order.facet}` : undefined,
    variables?.order?.dir ? `dir:${variables?.order.dir}` : undefined,
    variables?.per ? `per:${variables?.per}` : undefined,
    variables?.page ? `page:${variables?.page}` : undefined,
  ]

  return strings.filter(Boolean).join(' ')
}

const getUrlPath = (variables: AdvancedSearchVariables) => {
  let urlBase = '/search2'

  if (
    variables.where?.id &&
    (variables.where.facets as any) === WhereEnum.USER
  ) {
    urlBase = `/${variables.where.id}/search`
  }

  return urlBase
}

export const generateUrlFromVariables = (
  variables: AdvancedSearchVariables
) => {
  const path = getUrlPath(variables)
  const params = stringify(variables, {
    arrayFormat: 'brackets',
    encode: false,
  })
  return `${path}?${params}`
}

export default tokenizeSearch
