import React from 'react'
import styled from 'styled-components'

import { KonnectableMetadata as KonnectableMetadataData } from '__generated__/KonnectableMetadata'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Truncate from 'v2/components/UI/Truncate'
import MetadataFileExtension from 'v2/components/Cell/components/Konnectable/components/KonnectableMetadata/components/MetadataFileExtension'
import MetadataPlay from 'v2/components/Cell/components/Konnectable/components/KonnectableMetadata/components/MetadataPlay'
import Icons from 'v2/components/UI/Icons'

interface Props {
  konnectable: KonnectableMetadataData
  mode: Mode
}

const LinkIcon = styled(Icons).attrs({
  name: 'Link',
  size: 6,
  color: 'gray.medium',
  ml: 2,
  mb: 1,
})`
  position: relative;
  vertical-align: middle;
`

const TwitterIcon = styled(LinkIcon).attrs({
  name: 'Twitter',
})``

export const KonnectableMetadata: React.FC<Props> = ({
  mode = Mode.RESTING,
  konnectable,
  ...rest
}) => {
  const twitterLink =
    konnectable.__typename === 'Link' &&
    konnectable.source_url.includes('twitter.com')
  const normalLink = konnectable.__typename === 'Link' && !twitterLink

  return (
    <Box pt={2} mt={6} mb={4} px={5} {...rest}>
      <Text f={1} fontWeight="bold" textAlign="center" color="gray.medium">
        {mode === Mode.RESTING && (
          <div>
            <Truncate length={40}>{konnectable.title}</Truncate>

            {normalLink && <LinkIcon />}

            {twitterLink && <TwitterIcon />}

            {konnectable.__typename === 'Attachment' && (
              <MetadataFileExtension ext={konnectable.file_extension} />
            )}

            {konnectable.__typename === 'Embed' && <MetadataPlay />}
          </div>
        )}

        {mode === Mode.HOVER && (
          <div>
            {konnectable.connection && (
              <div>
                {konnectable.user.id === konnectable.connection.user.id ? (
                  <div>Added by {konnectable.user.name}</div>
                ) : (
                  <div>Connected by {konnectable.connection.user.name}</div>
                )}
                {konnectable.connection.created_at}
              </div>
            )}

            {!konnectable.connection && (
              <div>
                Added by {konnectable.user.name}
                <br />
                {konnectable.updated_at}
              </div>
            )}
          </div>
        )}
      </Text>
    </Box>
  )
}

export default KonnectableMetadata
