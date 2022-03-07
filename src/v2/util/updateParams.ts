import { stringify, parse } from 'qs'
import { Location } from 'history'

export const updateParams = (
  location: Location<any>,
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
