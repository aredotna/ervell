import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'

const TableContainer: React.FC = ({ children }) => {
  return <>{children}</>
}

export const SortableTableContainer = SortableContainer(TableContainer)
