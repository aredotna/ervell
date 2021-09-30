import React, { useState } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import CopyToClipboard from 'v2/components/UI/CopyToClipboard'
import { FullBlockShare as FullBlockShareType } from '__generated__/FullBlockShare'

const Container = styled(Box)`
  > a {
    display: block;
  }
`

interface FullBlockShareProps {
  connectable: FullBlockShareType
}

export const FullBlockShare: React.FC<FullBlockShareProps> = ({
  connectable,
}) => {
  const [mode, setMode] = useState<'resting' | 'active'>('resting')
  const url = `https://www.are.na${connectable?.shareable_href}`
  const text = connectable?.shareable_title

  const handleClick = e => {
    e.preventDefault()
    setMode('active')
  }

  return (
    <React.Fragment>
      {mode === 'resting' ? (
        <a href="#" onClick={handleClick}>
          Share
        </a>
      ) : (
        <Container mb={6}>
          <CopyToClipboard label="Copy link" value={url} />

          <a
            href={`https://twitter.com/intent/tweet?original_referer=${url}&text=${text}&url=${url}&via=aredotna`}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            Twitter
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            Facebook
          </a>
        </Container>
      )}
    </React.Fragment>
  )
}

export default FullBlockShare
