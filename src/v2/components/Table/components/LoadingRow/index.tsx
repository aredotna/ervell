import React, { forwardRef } from 'react'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import { TD, TR } from '../TableComponents'

interface LoadingRowProps {
  columnLength: number
}

export const LoadingRow = forwardRef<HTMLElement, LoadingRowProps>(
  ({ columnLength }, ref) => {
    return (
      <TR ref={ref}>
        <TD colSpan={columnLength}>
          <LoadingIndicator f={1} />
        </TD>
      </TR>
    )
  }
)

export default LoadingRow
