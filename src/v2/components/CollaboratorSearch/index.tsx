import React, { useState } from 'react'
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
  }) => void
  onInvite: ({ email }: { email: string }) => void
  types?: collaboratorType[]
}

export const CollaboratorSearch: React.FC<CollaboratorSearchProps> = ({
  onAdd,
  onInvite,
  types = ['USER', 'GROUP'],
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

  const handleAdd = ({
    member_id,
    member_type,
  }: {
    member_id: string
    member_type: string
  }) => {
    console.log('handleAdd', member_id, member_type, onAdd)
    onAdd({ member_id, member_type })
    resetQuery()
  }

  const handleInvite = (email: string) => {
    onInvite({ email })
    resetQuery()
  }

  return (
    <div>
      <CollaboratorSearchField onChange={updateQuery} query={query} />

      {query !== '' && (
        <CollaboratorSearchResults
          query={debouncedQuery}
          types={types}
          onAdd={handleAdd}
          onInvite={handleInvite}
        />
      )}
    </div>
  )
}

export default CollaboratorSearch
