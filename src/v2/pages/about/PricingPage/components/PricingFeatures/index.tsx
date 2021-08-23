import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import { FONT_SIZES } from 'v2/styles/text'
import { PricingFeatures as PricingFeaturesType } from '__generated__/contentful/PricingFeatures'
import { PricingFeaturesQuery } from './contentfulQueries/pricingFeaturesQuery'

const Feature = styled(Text).attrs({
  f: FONT_SIZES.home.md,
  color: 'gray.bold',
  textAlign: 'left',
  py: 2,
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
