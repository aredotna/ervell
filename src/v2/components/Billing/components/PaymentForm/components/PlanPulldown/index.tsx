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
        MONTHLY: <PlanOption>Monthly – $7 billed monthly</PlanOption>,
        YEARLY: <PlanOption>Yearly – $70 billed annually</PlanOption>,
        PLUS_YEARLY: (
          <PlanOption>Premium Supporter – $120 billed annually</PlanOption>
        ),
      }}
    />
  )
}
