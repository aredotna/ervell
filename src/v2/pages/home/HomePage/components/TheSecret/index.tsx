import React from 'react'
import Box from 'v2/components/UI/Box'
import { P } from 'v2/pages/home/components/Common'

export const TheSecret: React.FC = () => {
  return (
    <Box>
      <P>
        <P mb={6}>The Secret</P>
        <Box my={6} mt={9}>
          <strong>Allow yourself to go down rabbit holes</strong>
        </Box>
        <Box>
          A rabbit hole is not a distraction. A rabbit hole is your brain trying
          to tell you to pay attention to something you’re curious about. Ignore
          algorithmic rabbit holes.
        </Box>
        <Box my={6} mt={9}>
          <strong>If you see something, save something</strong>
        </Box>
        <Box>
          Pay attention to what feels resonant to you. Save breadcrumbs and
          build a path for yourself to walk down later on. The ability to
          classify information in a personal way is a muscle worth exercising.
        </Box>
        <Box my={6} mt={9}>
          <strong>“Creativity is just connecting things”</strong>
        </Box>
        <Box>
          Over time, build contexts for yourself and your ideas. Analyze what
          happens when you connect those contexts to someone else’s.
        </Box>
        <Box my={6} mt={9}>
          <strong>Remember</strong>
        </Box>
        <Box>
          The goal is not self-improvement. The goal is engaging more deeply
          with the World.
        </Box>
      </P>
    </Box>
  )
}
