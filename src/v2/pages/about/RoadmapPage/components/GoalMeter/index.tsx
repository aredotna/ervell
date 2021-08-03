import React from 'react'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Meter from 'v2/components/UI/Meter'

interface GoalMeterProps {
  currentMrr: string
  goalMrr: string
  goalDate: string
  monthlyActiveMembers: string
  totalPayingMembers: string
  monthlyConnections: string
}

export const GoalMeter: React.FC<GoalMeterProps> = ({
  currentMrr,
  goalMrr,
  goalDate,
  monthlyActiveMembers,
  monthlyConnections,
  totalPayingMembers,
}) => {
  const formattedDate = new Date(goalDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <>
      <Meter
        bg="gray.light"
        borderColor="transparent"
        borderRadius="1.5em"
        startColor="state.premium"
        endColor="state.supporter"
        amount={parseInt(currentMrr)}
        limit={parseInt(goalMrr)}
        p={4}
        mb={4}
      />
      <Box
        justifyContent="space-between"
        flexDirection="row"
        display="flex"
        px={2}
        pb={5}
      >
        <Box>
          <Text f={1}>Today</Text>
          <Text f={1}>
            <strong>${currentMrr}</strong> Monthly recurring revenue
          </Text>
          <Text f={1} mt={5} color="gray.medium">
            <strong>{monthlyActiveMembers}</strong> Monthly active members
          </Text>
          <Text f={1} color="gray.medium">
            <strong>{monthlyConnections}</strong> Monthly connections
          </Text>
          <Text f={1} color="gray.medium">
            <strong>{totalPayingMembers}</strong> Total paying members
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
