import React from 'react'
import { useQuery } from '@apollo/client'
import { TestimonialsQuery } from './contentfulQueries/testimonialQuery'
import { Testimonials as TestimonialsType } from '__generated__/contentful/Testimonials'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { PricingLogos } from 'v2/pages/about/PricingPage/components/PricingLogos'
import sharify from 'sharify'

const {
  data: { APP_URL },
} = sharify

export const Testimonials: React.FC = () => {
  const { data } = useQuery<TestimonialsType>(TestimonialsQuery, {
    context: { clientName: 'contentful' },
    ssr: false,
  })

  if (!data) return null

  return (
    <Box>
      <Text mb={6}>Here&#39;s what people say about us:</Text>

      {data.testimonialsCollection.items.map((item, index) => {
        return (
          <Text my={3} key={index}>
            &ldquo;{item.testimonial}&rdquo;
          </Text>
        )
      })}

      <Text mt={6} boldLinks>
        Read more on{' '}
        <a
          href={`${APP_URL}/charles-broskoski/how-do-you-describe-are-na-at-a-party`}
        >
          How do you describe Are.na at a party?
        </a>
      </Text>
      <Text mt={3} boldLinks>
        Browse the{' '}
        <a href={`${APP_URL}/are-na-team/are-na-press`}>press archives</a>
      </Text>

      <PricingLogos />
    </Box>
  )
}
