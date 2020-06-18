import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'
import GenericButton from 'v2/components/UI/GenericButton'
import { SansSerifText } from 'v2/components/UI/SansSerifText'

import Truncate from 'v2/components/UI/Truncate'

import { BlockLightboxLinkProps } from 'v2/components/BlockLightbox/components/BlockLightboxLink'
import {
  BlockLightboxLayoutProps,
  TextBoxContainerProps,
} from 'v2/components/BlockLightboxLayout'

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

export const ReaderContainer: React.FC<BlockLightboxLayoutProps &
  TextBoxContainerProps> = ({ children, layout, onClick, border = true }) => {
  return (
    <Box height="100%" width="100%">
      <Box
        height={['auto', '100%']}
        width="100%"
        pt={6}
        pr={[4, 9]}
        pb={[6, 7]}
        pl={[3, 8]}
        overflowScrolling
      >
        <Box
          minHeight="100%"
          width={{ DEFAULT: '100%', FULLSCREEN: '75%' }[layout]}
          maxWidth="55em"
          bg="background"
          border={border && '1px solid'}
          borderColor={
            border &&
            { DEFAULT: 'gray.light', FULLSCREEN: 'gray.semiBold' }[layout]
          }
          px={7}
          py={6}
          mx="auto"
          overflow="hidden"
          position="relative"
          onClick={onClick}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
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

  img,
  iframe,
  figure {
    max-width: 100%;
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

  const state = (canonical_link && canonical_link.state) || 'pending'

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
      {(!canonical_link || !canonical_link.content || state === 'failed') && (
        <ErrorContainer>
          <Text f={4} p={5} pt={7} textAlign="center">
            {
              {
                pending:
                  'This link has not been fully processed yet. Do you want to run a text extraction?',
                failed:
                  'It looks like the last time we tried extracting content the process failed. Do you want to try extracting the content again?',
                remote_processing: 'Performing content extraction...',
              }[state]
            }
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
}) => {
  const { data, loading, error, startPolling, stopPolling } = useQuery<
    ReaderData,
    ReaderVariables
  >(BLOCK_CANONICAL_LINK_READER_QUERY, {
    variables: { id: block.id.toString() },
  })

  return (
    <ReaderContainer layout="DEFAULT" border={false}>
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
          startPolling={startPolling}
          stopPolling={stopPolling}
        />
      )}
    </ReaderContainer>
  )
}
