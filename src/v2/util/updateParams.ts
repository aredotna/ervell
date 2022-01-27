import { stringify, parse } from 'qs'
import { Location } from 'history'

export const updateParams = (
  location: Location<any>,
  value: object
): string => {
  const existingParams = parse(location.search, { ignoreQueryPrefix: true })
  const queryParams = stringify(
    { ...existingParams, ...value },
    { skipNulls: true }
  )
  return queryParams
}
