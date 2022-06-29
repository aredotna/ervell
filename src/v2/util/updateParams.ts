import { stringify, parse } from 'qs'

export const updateParams = (
  location: any,
  value: object,
  skipNulls?: boolean
): string => {
  const existingParams = parse(location.search, { ignoreQueryPrefix: true })
  const queryParams = stringify(
    { ...existingParams, ...value },
    { skipNulls: skipNulls === undefined ? true : skipNulls }
  )
  return queryParams
}
