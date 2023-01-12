import React from 'react'
import styled from 'styled-components'

import Pulldown from 'v2/components/UI/Pulldown'
import Text from 'v2/components/UI/Text'
import { SupportedPlanEnum } from '__generated__/globalTypes'

const PlanLabel = styled(Text).attrs({
  f: 3,
})``

const PlanOption: React.FC = ({ children }) => {
  return (
    <span>
      <PlanLabel>{children}</PlanLabel>
    </span>
  )
}

interface PlanPulldownProps {
  value: SupportedPlanEnum
  onChange: (value: SupportedPlanEnum) => void
}

export const PlanPulldown: React.FC<PlanPulldownProps> = ({
  value,
  onChange,
}) => {
  return (
    <Pulldown
      label="Plan"
      value={value}
      onChange={onChange}
      options={{
        MONTHLY: <PlanOption>Monthly</PlanOption>,
        YEARLY: <PlanOption>Yearly</PlanOption>,
        PLUS_YEARLY: <PlanOption>Premium Supporter</PlanOption>,
      }}
    />
  )
}
