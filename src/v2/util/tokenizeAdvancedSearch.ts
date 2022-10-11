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
    .map(
      token =>
        WhereEnum[token.value.toUpperCase()] && {
          facet: WhereEnum[token.value.toUpperCase()],
        }
    )
    .filter(value => value?.facet)
  const whatTokens = colonTokenPairs
    .filter(token => token.key === 'what')
    .map(token => WhatEnum[token.value.toUpperCase()])
    .filter(Boolean)
  const fieldsTokens = colonTokenPairs
    .filter(token => token.key === 'fields')
    .map(token => FieldsEnum[token.value.toUpperCase()])
    .filter(Boolean)

  const scopedWhereTokens = colonTokenPairs
    .filter(
      token =>
        token.key === 'channel' || token.key === 'group' || token.key === 'user'
    )
    .filter(Boolean)
    .map(token => ({
      facet: WhereEnum[token.key.toUpperCase()],
      id: token.value,
    }))
    .filter(Boolean)

  const before = colonTokenPairs
    .filter(token => token.key === 'before')
    .map(token => token.value)
    .filter(Boolean)[0]

  const after = colonTokenPairs
    .filter(token => token.key === 'after')
    .map(token => token.value)
    .filter(Boolean)[0]

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

  const whereObject =
    (!isEmpty(scopedWhereTokens) && scopedWhereTokens) ||
    (!isEmpty(whereTokens) && whereTokens) ||
    undefined

  const variables = {
    where: whereObject ? whereObject : undefined,
    what: whatTokens.length ? { facets: whatTokens } : undefined,
    fields: fieldsTokens.length ? { facets: fieldsTokens } : undefined,
    order: sortToken ? { facet: sortToken, dir: directionToken } : undefined,
    per,
    page,
    before,
    after,
    term: term === '' ? null : { facet: term },
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

export const stringifyRange = (before: string, after: string) => {
  if (before && after) {
    return `before:${before} after:${after}`
  }
  if (before) {
    return `before:${before}`
  }
  if (after) {
    return `after:${after}`
  }
  return ''
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
    return value.map(mapFacets(field, null)).join(' ')
  }

  // if this is a string and not empty, return it's strinified value
  if (typeof value === 'string' && value !== '') {
    return stringifyFacet(field, value as any)
  }

  return null
}

const stringifyWhere = (variables: AdvancedSearchVariables) => {
  const where = variables.where

  if (isArray(where) && !isEmpty(where)) {
    return where
      .map(({ facet, id }) => stringifyFacet('where', facet, id))
      .join(' ')
  }
  if (typeof where === 'string' && where !== '') {
    return stringifyFacet('where', where as any)
  }
  return null
}

export const stringifyVariables = (variables: AdvancedSearchVariables) => {
  const strings = [
    stringifyWhere(variables),
    stringifyVariable(variables, 'what'),
    stringifyVariable(variables, 'fields'),
    variables?.order
      ? stringifyOrder(variables.order.facet, variables.order.dir)
      : undefined,
    variables?.before || variables?.after
      ? stringifyRange(variables.before, variables.after)
      : undefined,
    variables?.term?.facet ? `${variables?.term.facet}` : undefined,
  ]

  return strings.filter(Boolean).join(' ')
}

const getUrlPath = (variables: AdvancedSearchVariables) => {
  let urlBase = '/search'

  if (
    variables.where &&
    variables?.where[0]?.id &&
    (variables?.where[0]?.facet === WhereEnum.USER ||
      variables?.where[0]?.facet === WhereEnum.GROUP ||
      variables?.where[0]?.facet === WhereEnum.MY)
  ) {
    urlBase = `/${variables?.where[0]?.id}/search`
  }

  if (
    variables.where &&
    variables?.where[0]?.id &&
    variables?.where[0]?.facet === WhereEnum.CHANNEL
  ) {
    urlBase = `/scoped/${variables?.where[0]?.id}/search`
  }

  return urlBase
}

export const generateUrlFromVariables = (
  variables: AdvancedSearchVariables,
  paramsOnly?: boolean,
  basePath?: string
) => {
  const useBasePath =
    basePath !== '/' && basePath !== undefined && !basePath.includes('/search')
  const path = useBasePath ? `${basePath}/search` : getUrlPath(variables)

  const params = stringify(omit(variables, ['page', 'per']), {
    arrayFormat: 'indices',
    encode: false,
  })

  if (paramsOnly) {
    return params
  }

  return `${path}?${params}`
}

export default tokenizeSearch
