import React, { useRef, useState, useEffect } from 'react'
import { MutationFunction as MutationFn } from '@apollo/client'
import { Query, Mutation } from '@apollo/client/react/components'
import styled from 'styled-components'

import Icons from 'v2/components/UI/Icons'

import {
  UploadPolicy_me_policy as Policy,
  UploadPolicy,
} from '__generated__/UploadPolicy'

import { BlockContent, BlockContentVariables } from '__generated__/BlockContent'

import {
  updateBlockThumbnailMutation,
  updateBlockThumbnailMutationVariables,
} from '__generated__/updateBlockThumbnailMutation'

import { BlockLightbox as Block } from '__generated__/BlockLightbox'

import { uploadPolicyQuery as UPLOAD_POLICY_QUERY } from 'v2/util/uploader'
import BLOCK_IMAGE_URL_QUERY from 'v2/components/BlockLightbox/components/BlockLightboxActions/components/BlockLightboxChangeThumbnail/queries/blockImageUrl'
import UPDATE_BLOCK_THUMBNAIL_MUTATION from 'v2/components/BlockLightbox/components/BlockLightboxActions/components/BlockLightboxChangeThumbnail/mutations/changeThumbnail'

import useFileUpload from 'v2/hooks/useFileUpload'

const Link = styled.a`
  display: flex;
  align-items: center;

  ${props =>
    props.disabled &&
    `
    pointer-events: none;
    color: ${props.theme.colors.gray.regular} !important;
  `}
`

interface BlockChangeThumbnailProps extends BlockChangeThumbnailContainerProps {
  policy: Policy
  updateBlockThumbnail: MutationFn<
    updateBlockThumbnailMutation,
    updateBlockThumbnailMutationVariables
  >
  startPolling: (pollInterval: number) => void
  stopPolling: () => void
  imageUrl?: string
}

type Mode = 'checking' | 'resting' | 'uploading' | 'error'

const BlockChangeThumbnail: React.FC<BlockChangeThumbnailProps> = ({
  block,
  policy,
  updateBlockThumbnail,
  startPolling,
  stopPolling,
  imageUrl,
}) => {
  const [mode, setMode] = useState<Mode>('resting')
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<any>(null)

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

  const saveThumbnail = image_url => {
    if (image_url) {
      setFile(null)
      updateBlockThumbnail({
        variables: { image_url, id: `${block.id}` },
      }).then(() => {
        setMode('checking')
        startPolling(1000)
      })
    }
  }

  useEffect(() => {
    setMode('resting')
    stopPolling()
  }, [imageUrl, stopPolling])

  useFileUpload({
    file,
    onUpload: saveThumbnail,
    policy,
  })

  if (block.__typename === 'Channel') {
    return null
  }

  return (
    <div>
      {/* Just redirect to pricing page if user is not premium */}
      {!block.can.edit_thumbnail && (
        <Link href="/pricing" target="_blank">
          Change cover image
          <Icons name="ArenaMark" ml={3} size={6} color="state.premium" />
        </Link>
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
          <Link
            href="#"
            onClick={handleClick}
            rel="nofollow noopener noreferrer"
            target="_blank"
            disabled={mode === 'checking' || mode === 'uploading'}
            fontSize={1}
          >
            {
              {
                resting: 'Change cover image',
                error: 'Error',
                uploading: `Uploading`,
                checking: 'Processing',
              }[mode]
            }
          </Link>
        </>
      )}
    </div>
  )
}

interface BlockChangeThumbnailContainerProps {
  block: Block
}

const BlockChangeThumbnailContainer: React.FC<BlockChangeThumbnailContainerProps> = ({
  block,
}) => {
  return (
    <Query<UploadPolicy> query={UPLOAD_POLICY_QUERY}>
      {({ loading, error, data }) => {
        if (error || loading) return <div />

        const {
          me: { policy },
        } = data

        return (
          <Query<BlockContent, BlockContentVariables>
            query={BLOCK_IMAGE_URL_QUERY}
            variables={{ block_id: `${block.id}` }}
          >
            {({ loading, error, startPolling, stopPolling, data }) => {
              if (error || loading) return <div />

              return (
                <Mutation<
                  updateBlockThumbnailMutation,
                  updateBlockThumbnailMutationVariables
                >
                  mutation={UPDATE_BLOCK_THUMBNAIL_MUTATION}
                >
                  {updateBlockThumbnailMutation => {
                    const imageUrl =
                      data &&
                      (data.blokk.__typename === 'Link' ||
                        data.blokk.__typename === 'Attachment') &&
                      data.blokk.image_url

                    return (
                      <BlockChangeThumbnail
                        updateBlockThumbnail={updateBlockThumbnailMutation}
                        block={block}
                        policy={policy}
                        startPolling={startPolling}
                        stopPolling={stopPolling}
                        imageUrl={imageUrl}
                      />
                    )
                  }}
                </Mutation>
              )
            }}
          </Query>
        )
      }}
    </Query>
  )
}

export default BlockChangeThumbnailContainer
