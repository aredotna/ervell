import { useApolloClient } from 'react-apollo'

import SERIALIZED_ME_QUERY from 'v2/hooks/useSerializedMe/queries/serializedMe'

import { SerializeMeQuery } from '__generated__/SerializeMeQuery'

export default function() {
  const client = useApolloClient()

  const { serializedMe } = client.readQuery<SerializeMeQuery>({
    query: SERIALIZED_ME_QUERY,
  })

  return serializedMe
}
