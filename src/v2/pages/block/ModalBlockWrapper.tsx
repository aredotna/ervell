import React from 'react'
import { useLocation } from 'react-router'

import Modal from 'v2/components/UI/Modal/Portal'
import ModalFullscreenDialog from 'v2/components/UI/ModalFullscreenDialog'
import { ModalFullBlock } from 'v2/components/ModalFullBlock'
import { useParams } from 'react-router'

export const ModalBlockWrapper: React.FC = () => {
  const location = useLocation()
  const params = useParams()

  const state = location.state as any
  const context = state.context

  const set = new Set<string>(
    context
      ?.filter(
        k =>
          k?.__typename !== 'Channel' &&
          k?.__typename !== 'Group' &&
          k?.__typename !== 'User' &&
          !!k?.id
      )
      .map(k => k.id.toString())
  )

  const ids = Array.from(set)

  return (
    <Modal Dialog={ModalFullscreenDialog} bg="utility.opaque">
      <ModalFullBlock id={parseInt(params.id)} ids={ids} />
    </Modal>
  )
}
