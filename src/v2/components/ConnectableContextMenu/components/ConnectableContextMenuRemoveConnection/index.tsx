import React, { useCallback, useState } from 'react'
import { graphql } from '@apollo/client/react/hoc'

import { toBaseConnectableType } from 'v2/util/transformConnectableTypes'

import { removeConnectionMutation } from './mutations/removeConnection'

import { ContextMenu } from 'v2/components/ContextMenu'

interface Props {
  channelId: any
  connectableId: any
  connectableType: any
  onRemove: ({ id, type }: { id: number; type: string }) => any
}

interface ConnectableContextMenuRemoveConnectionProps extends Props {
  removeConnection: any
}

const _ConnectableContextMenuRemoveConnection: React.FC<ConnectableContextMenuRemoveConnectionProps> = ({
  channelId,
  connectableId,
  connectableType,
  onRemove,
  removeConnection,
}) => {
  const [mode, setMode] = useState('resting')

  const handleClick = useCallback(
    e => {
      e.preventDefault()

      setMode('removing')

      removeConnection({
        variables: {
          channelId,
          connectableId,
          connectableType: toBaseConnectableType(connectableType),
        },
      })
        .then(() => {
          onRemove({
            id: connectableId,
            type: connectableType,
          })
        })
        .catch(err => {
          console.error(err)
          setMode('error')
        })
    },
    [channelId, connectableId, connectableType, onRemove, removeConnection]
  )

  return (
    <ContextMenu.Option iconName="Garbage" onClick={handleClick}>
      {
        {
          resting: 'Remove connection',
          removing: 'Removing...',
          error: 'Error',
        }[mode]
      }
    </ContextMenu.Option>
  )
}

export const ConnectableContextMenuRemoveConnection = graphql<Props>(
  removeConnectionMutation,
  {
    name: 'removeConnection',
  }
)(_ConnectableContextMenuRemoveConnection)
