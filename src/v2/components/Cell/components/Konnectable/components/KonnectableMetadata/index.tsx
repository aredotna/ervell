import React, { PureComponent } from 'react'
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

export default class KonnectableMetadata extends PureComponent<Props> {
  static defaultProps = {
    mode: Mode.RESTING,
  }

  render() {
    const {
      mode,
      konnectable: {
        __typename,
        title,
        user,
        connection,
        updated_at,
        // @ts-ignore
        file_extension,
      },
      ...rest
    } = this.props

    return (
      <Box pt={2} mt={6} mb={4} px={5} {...rest}>
        <Text f={1} fontWeight="bold" textAlign="center" color="gray.medium">
          {mode === Mode.RESTING && (
            <div>
              <Truncate length={40}>{title}</Truncate>

              {__typename === 'Attachment' && (
                <MetadataFileExtension ext={file_extension} />
              )}

              {__typename === 'Embed' && <MetadataPlay />}
            </div>
          )}

          {mode === Mode.HOVER && (
            <div>
              {connection && (
                <div>
                  {user.id === connection.user.id ? (
                    <div>Added by {user.name}</div>
                  ) : (
                    <div>Connected by {connection.user.name}</div>
                  )}
                  {connection.created_at}
                </div>
              )}

              {!connection && (
                <div>
                  Added by {user.name}
                  <br />
                  {updated_at}
                </div>
              )}
            </div>
          )}
        </Text>
      </Box>
    )
  }
}
