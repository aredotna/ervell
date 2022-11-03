import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import SearchResult from 'v2/components/CollaboratorSearch/components/SearchResult'

const Button = styled(SearchResult)`
  justify-content: center;
  padding: 1.75em 1em;
  cursor: pointer;
  font-weight: bold;
`

interface CollaboratorInviteButtonProps {
  onInvite: ({ email }: { email: string }) => any
  email: string
}

export const CollaboratorInviteButton: React.FC<CollaboratorInviteButtonProps> = ({
  onInvite,
  email,
}) => {
  const [mode, setMode] = useState('resting')
  const invite = useCallback(() => {
    setMode('inviting')

    return onInvite({ email }).catch(() => setMode('error'))
  }, [onInvite, email])

  return (
    <Button onClick={invite} role="button">
      {
        {
          resting: `Invite ${email}`,
          inviting: 'Sending invite',
          error: 'Error',
        }[mode]
      }
    </Button>
  )
}

export default CollaboratorInviteButton
