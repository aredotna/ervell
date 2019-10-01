import React from 'react'
import usePasteListener from 'v2/hooks/usePasteListener'

interface AddBlockPasteUploader {
  onAddBlock: (props: any) => any
  channelId: string | number
  createBlock: (props: any) => Promise<any>
}

const AddBlockPasteUploader: React.FC<AddBlockPasteUploader> = ({
  onAddBlock,
  createBlock,
  channelId,
}) => {
  const onPaste = value => {
    return createBlock({
      variables: { channel_id: channelId, value },
    })
      .then(({ data: { create_block: { block } } }) => onAddBlock(block))
      .catch(err => {
        console.error(err)
      })
  }

  usePasteListener({ onPaste })
  return null
}

export { AddBlockPasteUploader }
