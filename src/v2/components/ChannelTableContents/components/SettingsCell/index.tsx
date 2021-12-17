import React from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import styled from 'styled-components'

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const Drag = SortableHandle(styled.div`
  width: 30px;
  background-color: ${({ theme }) => theme.colors.gray.light};
  cursor: grab;
`)

interface SettingsCellProps {
  value?: number | null
}

export const SettingsCell: React.FC<SettingsCellProps> = ({ value }) => {
  return <Cell>{value && <Drag />}</Cell>
}
