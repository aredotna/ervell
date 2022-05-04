import React, { useCallback } from 'react'

import Modal from 'v2/components/UI/Modal'
import GenericButton from 'v2/components/UI/GenericButton'
import { RestrictPersonModal } from '../ProfileRestrictModal'

interface ProfileRestrictButtonProps {
  id: string
  name: string
}

export const ProfileRestrictButton: React.FC<ProfileRestrictButtonProps> = ({
  id,
  name,
  ...rest
}) => {
  const openRestrictPerson = useCallback(() => {
    const modal = new Modal(
      RestrictPersonModal,
      { id, name },
      { height: 'auto' }
    )
    modal.open()
  }, [])

  return (
    <GenericButton onClick={openRestrictPerson} {...rest}>
      Restrict Person
    </GenericButton>
  )
}
