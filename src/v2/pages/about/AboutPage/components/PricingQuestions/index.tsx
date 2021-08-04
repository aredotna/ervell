import React from 'react'
import { useQuery } from '@apollo/client'

import { PricingQuestionsQuery } from './contentfulQueries/pricingQuestions'
import { PricingQuestions as PricingQuestionsType } from '__generated__/contentful/PricingQuestions'
import { P } from 'v2/pages/home/components/Common'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

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
            <Text f={4} color="gray.block" pb={5}>
              {q.question}
            </Text>
            <P>{q.answer}</P>
          </Box>
        )
      })}
    </>
  )
}
