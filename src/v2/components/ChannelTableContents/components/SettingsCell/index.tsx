import React, { useCallback, useState } from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import styled from 'styled-components'

import Icon from 'v2/components/UI/Icons'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import GenericButton from 'v2/components/UI/GenericButton'
import { TableData } from '../../lib/types'
import { getConnectableType } from 'v2/util/getConnectableType'
import { useMutation } from '@apollo/client'
import {
  RemoveTableConnectionMutation,
  RemoveTableConnectionMutationVariables,
} from '__generated__/RemoveTableConnectionMutation'
import { removeConnectionMutation } from './mutations/removeConnection'
import { ConnectableContextMenu } from 'v2/components/ConnectableContextMenu'
import { ChannelTablePage_channel } from '__generated__/ChannelTablePage'
import Box from 'v2/components/UI/Box'

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray.light};
`

const Container = styled(Box)`
  position: relative;
  width: 38px;
  background-color: ${({ theme }) => theme.colors.gray.light};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled(GenericButton).attrs({
  bg: 'gray.hint',
})`
  border-radius: 0px;
  height: 100%;
  width: 38px;
  border: 0px solid transparent;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.gray.light};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover {
    border: 0px solid transparent !important;
  }

  &:hover svg {
    fill: ${props => props.theme.colors.gray.bold};
  }
`

const Drag = SortableHandle(styled(Button)`
  cursor: grab;

  ${Icon} svg {
    transform: rotate(45deg);
  }
`)

interface SettingsCellProps {
  index: number
  value?: TableData
  channel: ChannelTablePage_channel
  removeBlock: (args: { id: number; type: string }) => void
  moveBlock: (args: { oldIndex: number; newIndex: number }) => void
}

type SettingsMode = 'resting' | 'deleting' | 'menu'
type Ev = React.MouseEvent<HTMLElement>

export const SettingsCell: React.FC<SettingsCellProps> = ({
  value,
  removeBlock,
  moveBlock,
  channel,
  index,
}) => {
  const [mode, setMode] = useState<SettingsMode>('resting')

  const [removeConnection] = useMutation<
    RemoveTableConnectionMutation,
    RemoveTableConnectionMutationVariables
  >(removeConnectionMutation)

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

  const handleChangePosition = useCallback(
    (newIndex: number) => {
      moveBlock({
        oldIndex: index,
        newIndex,
      })
    },
    [index, moveBlock]
  )

  const valueIsNull = !value || 'isNull' in value

  return (
    <Cell>
      {value && channel.can.update && (
        <>
          <Container>
            {!valueIsNull && (
              <ConnectableContextMenu
                channel={channel}
                connectable={value}
                onRemove={removeBlock}
                onChangePosition={handleChangePosition}
                bg="gray.light"
                position="static"
                height="1rem !important"
                width="1rem !important"
              />
            )}
          </Container>

          <Button onClick={onRemoveBlock} disabled={mode === 'deleting'}>
            {mode == 'deleting' ? (
              <LoadingIndicator f={1} />
            ) : (
              <Icon name="Garbage" size="1rem" color="gray.medium" />
            )}
          </Button>
          <Drag>
            <Icon name="EnterFullscreen" size="0.75rem" color="gray.medium" />
          </Drag>
        </>
      )}
    </Cell>
  )
}
