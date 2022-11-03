import React, { useCallback, useState } from 'react'
import { debounce } from 'underscore'

import CollaboratorSearchField from './components/CollaboratorSearchField'
import CollaboratorSearchResults from './components/CollaboratorSearchResults'

type collaboratorType = 'USER' | 'GROUP'

interface CollaboratorSearchProps {
  onAdd: ({
    member_id,
    member_type,
  }: {
    member_id: string
    member_type: string
  }) => any
  onInvite: ({ email }: { email: string }) => any
  types?: collaboratorType[]
}

export const CollaboratorSearch: React.FC<CollaboratorSearchProps> = ({
  onAdd,
  onInvite,
}) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const debouncedSetQuery = debounce((value: string) => {
    setDebouncedQuery(value)
  }, 250)

  const updateQuery = (query: string) => {
    setQuery(query)
    debouncedSetQuery(query)
  }

  const resetQuery = () => {
    setQuery('')
    setDebouncedQuery('')
  }

  const handleAdd = useCallback(
    ({
      member_id,
      member_type,
    }: {
      member_id: string
      member_type: string
    }) => {
      onAdd({ member_id, member_type })
      resetQuery()
    },
    [onAdd, resetQuery]
  )

  const handleInvite = useCallback(
    ({ email }: { email: string }) => {
      onInvite({ email })
      resetQuery()
    },
    [onInvite, resetQuery]
  )

  return (
    <div>
      <CollaboratorSearchField onChange={updateQuery} query={query} />

      {query !== '' && (
        <CollaboratorSearchResults
          query={debouncedQuery}
          onAdd={handleAdd}
          onInvite={handleInvite}
        />
      )}
    </div>
  )
}

export default CollaboratorSearch
