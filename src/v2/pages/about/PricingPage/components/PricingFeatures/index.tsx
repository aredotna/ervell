import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import { PricingFeatures as PricingFeaturesType } from '__generated__/contentful/PricingFeatures'
import { PricingFeaturesQuery } from './contentfulQueries/pricingFeaturesQuery'

const Feature = styled(Text).attrs({
  f: 5,
  color: 'gray.bold',
  textAlign: 'left',
  py: 3,
  px: 5,
})`
  &:before {
    content: '• ';
  }
`

export const PricingFeatures: React.FC = () => {
  const { data } = useQuery<PricingFeaturesType>(PricingFeaturesQuery, {
    context: { clientName: 'contentful' },
    ssr: false,
  })

  if (!data) return null

  return (
    <>
      {data.planFeaturesCollection?.items.map(({ feature }, index) => {
        return <Feature key={index}>{feature}</Feature>
      })}
    </>
  )
}
