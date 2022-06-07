import Modal from 'v2/components/UI/Modal'
import ModalFullscreenDialog from 'v2/components/UI/ModalFullscreenDialog'
import { ModalFullBlock } from 'v2/components/ModalFullBlock'

export default ({ id, context }) => {
  // Filter out Channels, Groups, Users and duplicates; return just IDs
  const set = new Set(
    context
      .filter(
        k =>
          k?.__typename !== 'Channel' &&
          k?.__typename !== 'Group' &&
          k?.__typename !== 'User' &&
          !!k?.id
      )
      .map(k => k.id.toString())
  )

  const ids = Array.from(set)

  const currentTitle = document.title
  const onClose = () => {
    document.title = currentTitle
  }

  new Modal(
    ModalFullBlock,
    { id, ids, onClose },
    { Dialog: ModalFullscreenDialog }
  ).open()
}
