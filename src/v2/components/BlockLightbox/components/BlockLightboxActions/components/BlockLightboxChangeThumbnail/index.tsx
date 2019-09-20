import React, { useRef, useState, useEffect } from 'react'

import { BlockLightbox_PendingBlock as Block } from '__generated__/BlockLightbox'
import useFileUpload from 'v2/hooks/useFileUpload'
import useUploadPolicy from 'v2/hooks/useUploadPolicy'

interface BlockChangeThumbnailProps {
  block: Block
}

type Mode = 'checking' | 'resting' | 'uploading' | 'error'

const BlockChangeThumbnail: React.FC<BlockChangeThumbnailProps> = ({
  block,
}) => {
  const [mode, setMode] = useState<Mode>('resting')
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<any>(null)
  const { policy } = useUploadPolicy()

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    inputRef.current.click()
  }

  const onAddFile = (e: React.ChangeEvent) => {
    e.persist()

    setMode('uploading')

    const target = event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]
    setFile(file)
  }

  useEffect(() => {
    useFileUpload({
      file,
      onUpload: () => setMode('resting'),
      policy,
    })
  }, [file, policy])

  return (
    <div>
      {/* Just redirect to pricing page if user is not premium */}
      {!block.can.edit_thumbnail && (
        <a href="/pricing" rel="nofollow noopener noreferrer" target="_blank">
          Change Thumbnail
        </a>
      )}

      {/* Otherwise, let's do this */}
      {block.can.edit_thumbnail && (
        <>
          <input
            type="file"
            accept=".jpg,.jpeg,.gif,.png"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={onAddFile}
          />
          <a
            href="#"
            onClick={handleClick}
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            {
              {
                resting: 'Change Thumbnail',
                error: 'Error',
                uploading: `Uploading`,
                checking: 'Processing',
              }[mode]
            }
          </a>
        </>
      )}
    </div>
  )
}

export default BlockChangeThumbnail
