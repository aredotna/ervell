import React from 'react'
import { useQuery } from '@apollo/client'

import { PricingQuestionsQuery } from './contentfulQueries/pricingQuestions'
import { PricingQuestions as PricingQuestionsType } from '__generated__/contentful/PricingQuestions'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { FONT_SIZES } from 'v2/styles/text'

export const PricingQuestions: React.FC = () => {
  const { data } = useQuery<PricingQuestionsType>(PricingQuestionsQuery, {
    context: { clientName: 'contentful' },
    ssr: false,
  })

  if (!data) return null

  return (
    <>
      {data.pricingQuestionsCollection.items.map((q, index) => {
        return (
          <Box key={index} mb={8}>
            <Text f={FONT_SIZES.home.lg} color="gray.block" pb={5}>
              {q.question}
            </Text>
            <Text f={FONT_SIZES.home.md} color="gray.block" pb={5}>
              {q.answer}
            </Text>
          </Box>
        )
      })}
    </>
  )
}
