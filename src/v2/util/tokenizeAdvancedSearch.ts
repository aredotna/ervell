import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { stringify } from 'qs'
import {
  FieldsEnum,
  SortDirection,
  SortOrderEnum,
  WhatEnum,
  WhereEnum,
} from '__generated__/globalTypes'

import { isArray, isEmpty, omit, pickBy } from 'lodash'

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
    .filter(Boolean)[0] as WhereEnum | undefined
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
    where: whereTokens ? { facet: whereTokens } : undefined,
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
  id?: string
) => {
  if (field === 'where' && id && filter !== 'MY') {
    return `${filter.toLowerCase()}:${id}`
  }
  return `${field}:${filter?.toLowerCase()}`
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

export const stringifyVariable = (
  variables: AdvancedSearchVariables,
  field
) => {
  const value = variables[field]?.facets
  // if this is an array and not empty, map over it
  if (isArray(value) && !isEmpty(value)) {
    return value.map(mapFacets('fields', null)).join(' ')
  }

  // if this is a string and not empty, return it's strinified value
  if (typeof value === 'string' && value !== '') {
    return stringifyFacet(field, value as any)
  }

  return null
}

export const stringifyVariables = (variables: AdvancedSearchVariables) => {
  const strings = [
    variables?.term?.facet ? `${variables?.term.facet}` : undefined,
    variables?.where?.facet
      ? stringifyFacet('where', variables.where.facet, variables.where.id)
      : undefined,
    stringifyVariable(variables, 'what'),
    stringifyVariable(variables, 'fields'),
    variables?.order
      ? stringifyOrder(variables.order.facet, variables.order.dir)
      : undefined,
  ]

  return strings.filter(Boolean).join(' ')
}

const getUrlPath = (variables: AdvancedSearchVariables) => {
  let urlBase = '/search2'

  if (
    variables.where?.id &&
    (variables.where.facet === WhereEnum.USER ||
      variables.where.facet === WhereEnum.GROUP ||
      variables.where.facet === WhereEnum.MY)
  ) {
    urlBase = `/${variables.where.id}/search`
  }

  if (variables.where?.id && variables.where.facet === WhereEnum.CHANNEL) {
    urlBase = `/scoped/${variables.where.id}/search`
  }

  return urlBase
}

export const generateUrlFromVariables = (
  variables: AdvancedSearchVariables,
  paramsOnly?: boolean,
  basePath?: string
) => {
  const path =
    basePath !== '/' && basePath ? `${basePath}/search` : getUrlPath(variables)
  const params = stringify(omit(variables, ['page', 'per']), {
    arrayFormat: 'brackets',
    encode: false,
  })

  if (paramsOnly) {
    return params
  }

  return `${path}?${params}`
}

export default tokenizeSearch
