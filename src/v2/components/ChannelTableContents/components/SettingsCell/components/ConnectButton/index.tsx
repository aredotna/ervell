import React, { useCallback, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'

import { TableData } from 'v2/components/ChannelTableContents/lib/types'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Icon from 'v2/components/UI/Icons'
import Overlay from 'v2/components/UI/Overlay'

import { Button, Ev } from '../..'
import { getConnectableType } from 'v2/util/getConnectableType'

import {
  RemoveTableConnectionMutation,
  RemoveTableConnectionMutationVariables,
} from '__generated__/RemoveTableConnectionMutation'
import { removeConnectionMutation } from '../../mutations/removeConnection'
import { ChannelTablePage_channel } from '__generated__/ChannelTablePage'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

interface DeleteButtonProps {
  channel: ChannelTablePage_channel
  value?: TableData
  removeBlock: (args: { id: number; type: string }) => void
}

type DeleteButtonMode = 'resting' | 'deleting' | 'open'

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  value,
  channel,
  removeBlock,
}) => {
  const [mode, setMode] = useState<DeleteButtonMode>('resting')

  const [removeConnection] = useMutation<
    RemoveTableConnectionMutation,
    RemoveTableConnectionMutationVariables
  >(removeConnectionMutation)

  const targetEl = useRef(null)

  const openMenu = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setMode('open')
  }, [])

  const closeMenu = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setMode('resting')
  }, [])

  const onRemoveBlock = useCallback(
    (e: Ev) => {
      e.preventDefault()
      e.stopPropagation()

      if (!value || 'isNull' in value) return null

      setMode('deleting')

      removeConnection({
        variables: {
          channelId: channel.id.toString(),
          connectableType: getConnectableType(value.__typename),
          connectableId: value.id.toString(),
        },
      }).then(() => {
        removeBlock({ id: value.id, type: value.__typename })
      })
    },
    [removeBlock, removeConnection]
  )

  return (
    <Button
      onClick={{ open: closeMenu, resting: openMenu }[mode]}
      disabled={mode === 'deleting'}
      ref={targetEl}
    >
      {mode == 'deleting' ? (
        <LoadingIndicator f={1} />
      ) : (
        <>
          <Icon name="Garbage" size="1rem" color="gray.medium" />
          {mode == 'open' && (
            <Overlay
              onClose={closeMenu}
              targetEl={() => targetEl.current}
              alignToY="bottom"
              alignToX="right"
              anchorY="top"
              anchorX="right"
              offsetY={5}
              offsetX={0}
              disableTarget
            >
              <Box p={5} bg={'state.alert'}>
                <Text f={1} color={'gray.block'}>
                  Remove Connection?
                </Text>
              </Box>
            </Overlay>
          )}
        </>
      )}
    </Button>
  )
}
