import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import GenericButton from 'v2/components/UI/GenericButton'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'

import { CanonicalLinkForReader_blokk_Link_canonical_link } from '__generated__/CanonicalLinkForReader'

const ErrorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  height: 100%;
`

const ErrorText = styled(Text).attrs({
  f: 4,
  p: 7,
  pt: 7,
  textAlign: 'center',
  color: 'gray.medium',
})``

interface ReaderErrorProps {
  state: string
  canonical_link: CanonicalLinkForReader_blokk_Link_canonical_link | null
  mode: 'resting' | 'polling'
  onRegenerate: () => void
}

export const ReaderError: React.FC<ReaderErrorProps> = ({
  state,
  canonical_link,
  mode,
  onRegenerate,
}) => {
  const contentFailed =
    state === 'failed' || (state === 'available' && !canonical_link.content)

  return (
    <ErrorContainer>
      {!contentFailed && (
        <ErrorText>
          {
            {
              pending: 'Hang on, requesting link contents...',
              remote_processing: 'Performing content extraction...',
            }[state]
          }
          <LoadingIndicator
            frames={['▖', '▘', '▝', '▗']}
            interval={200}
            f={4}
            color="gray.medium"
          />
        </ErrorText>
      )}

      {contentFailed && (
        <ErrorText>
          It looks like the last time we tried extracting content the process
          failed. Do you want to try extracting the content again?{' '}
        </ErrorText>
      )}
      {mode !== 'polling' && state !== 'pending' && (
        <GenericButton
          mt={7}
          title="Regenerate content"
          display="flex"
          f={2}
          onClick={onRegenerate}
        >
          {
            {
              resting: 'Extract content from link',
              polling: 'Extracting content...',
            }[mode]
          }
        </GenericButton>
      )}
    </ErrorContainer>
  )
}
