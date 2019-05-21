import React from 'react'

interface Props {
  amount: number
  label: string
}

export const Count: React.FC<Props> = ({ amount, label, ...rest }) => (
  <span {...rest}>
    {amount} {amount === 1 ? label : `${label}s`}
  </span>
)

export default Count
