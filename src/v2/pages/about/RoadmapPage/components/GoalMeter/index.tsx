import React from 'react'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Meter from 'v2/components/UI/Meter'

interface GoalMeterProps {
  currentMrr: number
  goalMrr: number
  goalDate: string
}

export const GoalMeter: React.FC<GoalMeterProps> = ({
  currentMrr,
  goalMrr,
  goalDate,
}) => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formattedDate = new Date(goalDate).toLocaleDateString(
    'en-US',
    dateOptions
  )
  return (
    <>
      <Meter
        bg="gray.light"
        borderColor="transparent"
        borderRadius="1.5em"
        startColor="state.premium"
        endColor="state.supporter"
        amount={currentMrr}
        limit={goalMrr}
        p={4}
        mb={4}
      />
      <Box
        justifyContent="space-between"
        flexDirection="row"
        display="flex"
        px={2}
      >
        <Box>
          <Text f={1}>Today</Text>
          <Text f={1}>
            <strong>${currentMrr}</strong> Monthly recurring revenue
          </Text>
        </Box>
        <Box>
          <Text f={1} textAlign="right" fontWeight="bold">
            Goal by {formattedDate}
          </Text>
          <Text f={1} textAlign="right">
            <strong>${goalMrr}</strong> Monthly recurring revenue
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default GoalMeter
