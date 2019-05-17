import React from 'react'

import { KonnectableMetadata as KonnectableMetadataData } from '__generated__/KonnectableMetadata'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Truncate from 'v2/components/UI/Truncate'
import MetadataFileExtension from 'v2/components/Cell/components/Konnectable/components/KonnectableMetadata/components/MetadataFileExtension'
import MetadataPlay from 'v2/components/Cell/components/Konnectable/components/KonnectableMetadata/components/MetadataPlay'

interface Props {
  konnectable: KonnectableMetadataData
  mode: Mode
}

export const KonnectableMetadata: React.FC<Props> = ({
  mode = Mode.RESTING,
  konnectable,
  ...rest
}) => {
  return (
    <Box pt={2} mt={6} mb={4} px={5} {...rest}>
      <Text f={1} fontWeight="bold" textAlign="center" color="gray.medium">
        {mode === Mode.RESTING && (
          <div>
            <Truncate length={40}>{konnectable.title}</Truncate>

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
