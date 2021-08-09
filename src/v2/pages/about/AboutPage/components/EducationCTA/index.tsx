import React from 'react'
import Box from 'v2/components/UI/Box'
import { P } from 'v2/pages/about/components/Text'
import Button from 'v2/components/UI/GenericButton'

export const EducationCTA: React.FC = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <P>
        Learn more about how students and teachers use Are.na in their classes
        and workshops.
      </P>

      <P>
        If you&#139;re a student, you can get 50% off the price of any Premium
        plan for two years. If you&#139;re a teacher and use Are.na with your
        class <a href="mailto:help@are.na">contact us</a> for assistance and
        custom discounts for your students.
      </P>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Button f={3} color="gray.block" href="/education">
          Read more
        </Button>
      </Box>
    </Box>
  )
}
