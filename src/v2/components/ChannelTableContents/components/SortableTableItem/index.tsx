import React from 'react'
import { SortableElement } from 'react-sortable-hoc'

const TableItem: React.FC = ({ children }) => {
  return <>{children}</>
}

export const SortableTableItem = SortableElement(TableItem)
