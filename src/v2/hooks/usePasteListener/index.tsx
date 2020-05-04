import { useState, useEffect, useCallback } from 'react'

type BlobLikeFile = File | null

interface UsePasteListenerProps {
  acceptedFiles?: string[]
  onPaste?: (url: string) => void
}

const transformImages = (
  data: DataTransfer,
  acceptedFiles: string[],
  callback: Function
) => {
  for (let i = 0; i < data.items.length; i++) {
    if (acceptedFiles.includes(data.items[i].type) !== false) {
      const file: BlobLikeFile = data.items[i].getAsFile()

      if (file) {
        callback(file)
      }
    }
  }
}

const usePasteListener = ({
  acceptedFiles = ['image/gif', 'image/png', 'image/jpeg'],
  onPaste,
}: UsePasteListenerProps) => {
  const [fileUrl, setFileUrl] = useState(null)

  const onFilePaste = useCallback(() => {
    onPaste(fileUrl)
  }, [fileUrl, onPaste])

  useEffect(() => {
    const el: Window = window
    const pasteHandler = (e: ClipboardEvent) => {
      transformImages(e.clipboardData, acceptedFiles, (url: string) => {
        setFileUrl(url)
        onPaste(url)
      })
    }

    el.addEventListener('paste', pasteHandler)

    return () => {
      el.removeEventListener('paste', pasteHandler)
    }
  }, [onFilePaste, setFileUrl, acceptedFiles, fileUrl, onPaste])

  return {
    url: fileUrl,
  }
}

export default usePasteListener
