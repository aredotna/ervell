import { useApolloClient } from '@apollo/client'

import SERIALIZED_ME_QUERY from 'v2/hooks/useSerializedMe/queries/serializedMe'

import { SerializeMeQueryHook } from '__generated__/SerializeMeQueryHook'

export default function() {
  const client = useApolloClient()

  const { serializedMe } = client.readQuery<SerializeMeQueryHook>({
    query: SERIALIZED_ME_QUERY,
  })

  return serializedMe
}
