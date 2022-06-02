import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import {
  FieldsEnum,
  SortDirection,
  SortOrder,
  WhatEnum,
  WhereEnum,
} from '__generated__/globalTypes'

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
    (colonTokenPairs.find(token => token.key === 'sort')?.value as SortOrder) ||
    undefined
  const directionToken =
    (colonTokenPairs.find(token => token.key === 'dir')
      ?.value as SortDirection) || undefined
  const per =
    parseInt(colonTokenPairs.find(token => token.key === 'per')?.value) ||
    undefined
  const page =
    parseInt(colonTokenPairs.find(token => token.key === 'page')?.value) ||
    undefined

  return {
    term: { facet: searchTokens.join(' ') },
    where: whereTokens.length ? { facets: whereTokens } : undefined,
    what: whatTokens.length ? { facets: whatTokens } : undefined,
    fields: fieldsTokens.length ? { facets: fieldsTokens } : undefined,
    order: sortToken ? { facet: sortToken, dir: directionToken } : undefined,
    per,
    page,
  }
}

const mapFacets = function(type) {
  return function(facet) {
    return `${type}:${facet.toLowerCase()}`
  }
}

export const stringifyVariables = (variables: AdvancedSearchVariables) => {
  const strings = [
    variables?.term?.facet ? `${variables?.term.facet}` : undefined,
    variables?.where?.facets?.length
      ? variables?.where.facets.map(mapFacets('where')).join(' ')
      : undefined,
    variables?.what?.facets?.length
      ? variables?.what.facets.map(mapFacets('what')).join(' ')
      : undefined,
    variables?.fields?.facets?.length
      ? variables?.fields.facets.map(mapFacets('fields')).join(' ')
      : undefined,
    variables?.order?.facet ? `sort:${variables?.order.facet}` : undefined,
    variables?.order?.dir ? `dir:${variables?.order.dir}` : undefined,
    variables?.per ? `per:${variables?.per}` : undefined,
    variables?.page ? `page:${variables?.page}` : undefined,
  ]

  console.log({ strings })

  return strings.filter(Boolean).join(' ')
}

export default tokenizeSearch
