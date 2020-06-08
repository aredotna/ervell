import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'
import GenericButton from 'v2/components/UI/GenericButton'
import { SansSerifText } from 'v2/components/UI/SansSerifText'
import { TextBoxContainer } from 'v2/components/BlockLightboxLayout'

import Truncate from 'v2/components/UI/Truncate'

import { BlockLightboxLinkProps } from 'v2/components/BlockLightbox/components/BlockLightboxLink'

import {
  CanonicalLinkForReader as ReaderData,
  CanonicalLinkForReaderVariables as ReaderVariables,
  CanonicalLinkForReader_blokk_Link,
} from '__generated__/CanonicalLinkForReader'
import {
  regenerateCanonicalLink as RegenerateCanonicalLinkType,
  regenerateCanonicalLinkVariables as RegenerateCanonicalLinkVariables,
} from '__generated__/regenerateCanonicalLink'

import BLOCK_CANONICAL_LINK_READER_QUERY from 'v2/components/BlockLightbox/components/BlockLightboxLink/components/BlockLightboxLinkReader/queries/canonicalLinkReader'
import REGENERATE_CANONICAL_LINK_MUTATION from 'v2/components/BlockLightbox/components/BlockLightboxLink/components/BlockLightboxLinkReader/mutations/regenerateCanonicalLinkMutation'

const TextContainer = styled(Box).attrs({
  p: 3,
})`
  font-family: ${props => props.theme.fonts.serif} !important;
  font-size: 18px;

  p,
  li,
  ol {
    font-size: 1.35rem !important;
  }

  img {
    max-width: 100%;
  }
`

const ReaderText = styled(SansSerifText)`
  font-family: Times New Roman;
`

const ErrorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
`

const Title = styled(Text).attrs({
  f: 8,
  font: 'serif',
  color: 'hover',
})``

const Metadata = styled(Box).attrs({
  py: 5,
})`
  display: flex;
  flex-direction: row;
`

const MetadataLine = styled(Text).attrs({ font: 'serif', px: 2 })`
  &:first-child {
    padding-left: none;
  }
`

interface BlockLightboxLinkReaderInnerProps {
  block: CanonicalLinkForReader_blokk_Link
  startPolling: (pollInterval: number) => void
  stopPolling: () => void
}

const BlockLightboxLinkReaderInner: React.FC<BlockLightboxLinkReaderInnerProps> = ({
  block,
  startPolling,
  stopPolling,
}) => {
  const { canonical_link } = block

  const [mode, setMode] = useState<'resting' | 'polling'>('resting')

  const [regenerateCanonicalLink] = useMutation<
    RegenerateCanonicalLinkType,
    RegenerateCanonicalLinkVariables
  >(REGENERATE_CANONICAL_LINK_MUTATION)

  const onRegenerate = useCallback(() => {
    setMode('polling')
    regenerateCanonicalLink({
      variables: { block_id: block.id.toString() },
    }).then(() => {
      startPolling(1000)
    })
  }, [block.id, regenerateCanonicalLink, startPolling])

  useEffect(() => {
    if (block.canonical_link && block.canonical_link.title) {
      stopPolling()
      setMode('resting')
    }
  }, [block.canonical_link, stopPolling])

  return (
    <TextContainer>
      {canonical_link && canonical_link.title && (
        <Box pt={6} pb={8}>
          <Title>{canonical_link.title}</Title>
          <Metadata>
            <MetadataLine>
              <a
                href={canonical_link.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {canonical_link.provider_name}
              </a>{' '}
            </MetadataLine>
            {canonical_link.authors && canonical_link.authors !== '[]' && (
              <>
                <MetadataLine>•</MetadataLine>
                <MetadataLine>{canonical_link.authors}</MetadataLine>
              </>
            )}
            {canonical_link.published_at && (
              <>
                <MetadataLine>•</MetadataLine>
                <MetadataLine>{canonical_link.published_at}</MetadataLine>
              </>
            )}
          </Metadata>
        </Box>
      )}

      {canonical_link.content && (
        <ReaderText
          dangerouslySetInnerHTML={{
            __html: canonical_link.content,
          }}
        />
      )}
      {!canonical_link.content && (
        <ErrorContainer>
          <Text f={4} pt={7}>
            No link content found. Do you want to try extracting the content
            again?
          </Text>
          <GenericButton
            mt={7}
            title="Regenerate content"
            display="flex"
            f={2}
            onClick={onRegenerate}
            disabled={mode === 'polling'}
          >
            {
              {
                resting: 'Extract content from link',
                polling: 'Extracting content...',
              }[mode]
            }
          </GenericButton>
        </ErrorContainer>
      )}
    </TextContainer>
  )
}

export const BlockLightboxLinkReader: React.FC<BlockLightboxLinkProps> = ({
  block,
  layout,
}) => {
  const { data, loading, error, startPolling, stopPolling } = useQuery<
    ReaderData,
    ReaderVariables
  >(BLOCK_CANONICAL_LINK_READER_QUERY, {
    variables: { id: block.id.toString() },
  })

  return (
    <TextBoxContainer layout="DEFAULT" border={false}>
      <a
        href={block.source_url}
        rel="noopener nofollow noreferrer"
        target="_blank"
      >
        <Box
          px={6}
          py={4}
          display="flex"
          border="2px solid"
          borderRadius="2px"
          borderColor={
            { DEFAULT: 'gray.light', light: 'gray.semiBold' }[layout]
          }
          bg={{ DEFAULT: 'background', FULLSCREEN: 'gray.bold' }[layout]}
          justifyContent="space-between"
        >
          <Box display="flex">
            <Icons
              name="Link"
              size="1rem"
              color="gray.base"
              mr={5}
              flexShrink={0}
            />

            <Text f={2} font="mono" color="gray.semiBold" breakWord>
              <u>
                <Truncate length={40}>{block.source_url}</Truncate>
              </u>
            </Text>
          </Box>
          <Box>
            <Text f={2} font="mono">
              {loading && 'Loading...'}
            </Text>
          </Box>
        </Box>
      </a>

      {!loading && !error && data.blokk.__typename === 'Link' && (
        <BlockLightboxLinkReaderInner
          block={data.blokk}
          startPolling={startPolling}
          stopPolling={stopPolling}
        />
      )}
    </TextBoxContainer>
  )
}
