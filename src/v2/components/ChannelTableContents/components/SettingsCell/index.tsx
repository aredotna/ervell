import React, { useCallback } from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import styled from 'styled-components'

import Icon from 'v2/components/UI/Icons'
import GenericButton from 'v2/components/UI/GenericButton'
import { TableData } from '../../lib/types'
import { ConnectableContextMenu } from 'v2/components/ConnectableContextMenu'
import { ChannelTablePage_channel } from '__generated__/ChannelTablePage'
import Box from 'v2/components/UI/Box'
import { ConnectButton } from './components/ConnectButton'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray.hint};
  line-height: 100%;
  align-items: center;
`

const Container = styled(Box)`
  position: relative;
  width: 36px;
  background-color: ${({ theme }) => theme.colors.gray.hint};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Separator = styled(Box)`
  height: 19px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.gray.light};
`

export const Button = styled(GenericButton).attrs({
  bg: 'gray.hint',
})`
  border-radius: 0px;
  height: 100% !important;
  width: 37px;
  border: 0px solid transparent;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.gray.hint};
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

export type Ev = React.MouseEvent<HTMLElement>

export const SettingsCell: React.FC<SettingsCellProps> = ({
  value,
  removeBlock,
  moveBlock,
  channel,
  index,
}) => {
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
                bg="gray.hint"
                position="static"
                height="100% !important"
                width="100% !important"
                zIndex={0}
                borderRadius="0 !important"
              />
            )}
          </Container>
          <Separator />
          {!valueIsNull && (
            <ConnectButton
              id={value.id.toString()}
              type={BaseConnectableTypeEnum.BLOCK}
            />
          )}
          <Separator />
          <Drag>
            <Icon name="EnterFullscreen" size="0.75rem" color="gray.medium" />
          </Drag>
        </>
      )}
    </Cell>
  )
}
