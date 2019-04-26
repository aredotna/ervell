export const key = ({
  id,
  type,
  __typename,
}: {
  id: string | number
  type: string
  __typename: string
}) =>
  __typename
    ? `${id}:${__typename === 'Channel' ? 'Channel' : 'Block'}`
    : `${id}:${type}`
