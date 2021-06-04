import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'
import { SansSerifText } from 'v2/components/UI/SansSerifText'

import Truncate from 'v2/components/UI/Truncate'

import { ReaderContainer } from 'v2/components/BlockLightbox/components/BlockLightboxLink/components/BlockLightboxLinkReader/components/ReaderContainer'
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
import { ApolloError } from '@apollo/client'
import { ReaderError } from './components/ReaderError'

const TextContainer = styled(Box).attrs({
  p: 3,
})`
  font-family: ${props => props.theme.fonts.serif} !important;
  font-size: 18px;
  line-height: 1.5;

  p,
  li,
  ol,
  blockquote {
    font-size: 1.25rem !important;
  }

  figcaption {
    fontsize: 1em !important;
  }

  img,
  iframe,
  figure {
    max-width: 90%;
    height: auto;
    margin: ${props => props.theme.space[7]} auto;
    display: block;
  }

  svg {
    display: none;
  }

  figure {
    text-align: center;
  }

  li p:first-child {
    display: inline;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 22px !important;
    margin: ${props => props.theme.space[7]} 0;
  }
`

const ReaderText = styled(SansSerifText)`
  font-family: Times New Roman;
`

const Title = styled(Text).attrs({
  f: 8,
  font: 'serif',
  color: 'gray.block',
  lineHeight: 0,
})``

const Metadata = styled(Box).attrs({
  py: 4,
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
  loading: boolean
  error: ApolloError
}

const BlockLightboxLinkReaderInner: React.FC<BlockLightboxLinkReaderInnerProps> = ({
  block,
  startPolling,
  stopPolling,
  loading,
  error,
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
      startPolling(3000)
    })
  }, [block.id, regenerateCanonicalLink, startPolling])

  useEffect(() => {
    if (
      !loading &&
      !error &&
      block &&
      (!block.canonical_link || block.canonical_link.state === 'pending') &&
      mode !== 'polling'
    ) {
      setMode('polling')
      regenerateCanonicalLink({ variables: { block_id: block.id.toString() } })
        .then(() => {
          startPolling(3000)
        })
        .catch(() => {
          stopPolling()
        })
    }

    if (
      mode === 'polling' &&
      block &&
      block.canonical_link &&
      (block.canonical_link.state === 'failed' ||
        block.canonical_link.state === 'available')
    ) {
      stopPolling()
      setMode('resting')
    }
  }, [
    loading,
    block,
    mode,
    error,
    setMode,
    stopPolling,
    startPolling,
    regenerateCanonicalLink,
  ])

  const state = (canonical_link && canonical_link.state) || 'pending'

  if (!canonical_link || !canonical_link.content || state === 'failed') {
    return (
      <ReaderError
        onRegenerate={onRegenerate}
        canonical_link={canonical_link}
        state={state}
        mode={mode}
      />
    )
  }

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
            {canonical_link.published_at && (
              <>
                <MetadataLine>•</MetadataLine>
                <MetadataLine>{canonical_link.published_at}</MetadataLine>
              </>
            )}
          </Metadata>
        </Box>
      )}

      {canonical_link && canonical_link.content && (
        <ReaderText
          dangerouslySetInnerHTML={{
            __html: canonical_link.content,
          }}
        />
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
    <ReaderContainer layout={layout} border={false}>
      <a
        href={block.source_url}
        rel="noopener nofollow noreferrer"
        target="_blank"
      >
        <Box
          px={4}
          py={5}
          display="flex"
          border="1px solid"
          borderRadius="2px"
          borderColor="gray.light"
          bg="background"
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

            <Text f={1} font="mono" color="rgb(153, 153, 153)" breakWord>
              <u>
                <Truncate length={40}>{block.source_url}</Truncate>
              </u>
            </Text>
          </Box>
          <Box>
            <Text f={1} font="mono">
              {loading && 'Loading...'}
            </Text>
          </Box>
        </Box>
      </a>

      {!loading && !error && data.blokk.__typename === 'Link' && (
        <BlockLightboxLinkReaderInner
          block={data.blokk}
          loading={loading}
          error={error}
          startPolling={startPolling}
          stopPolling={stopPolling}
        />
      )}
    </ReaderContainer>
  )
}
