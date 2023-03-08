import React from 'react'

import { toBaseConnectableType } from 'v2/util/transformConnectableTypes'

import MuteButton from 'v2/components/MuteButton'
import { ContextMenu } from 'v2/components/ContextMenu'

interface Props {
  connectableId: any
  connectableType: any
}

export const ConnectableContextMenuMuteBlock: React.FC<Props> = ({
  connectableId,
  connectableType,
}) => {
  const type = toBaseConnectableType(connectableType)?.toLowerCase()

  return (
    <MuteButton
      id={connectableId}
      type={toBaseConnectableType(connectableType)}
    >
      {({ isMuted }) =>
        ({
          true: (
            <ContextMenu.Option iconName="Mute">
              Unmute {type}
            </ContextMenu.Option>
          ),
          false: (
            <ContextMenu.Option iconName="Mute">Mute {type}</ContextMenu.Option>
          ),
        }[isMuted])
      }
    </MuteButton>
  )
}
