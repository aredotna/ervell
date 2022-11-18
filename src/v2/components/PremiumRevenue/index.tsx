import { useQuery } from '@apollo/client'
import React from 'react'
import { PremiumRevenue as PremiumRevenueType } from '__generated__/contentful/PremiumRevenue'
import { PremiumRevenueQuery } from './contentfulQueries/premiumRevenue'

export const PremiumRevenue: React.FC = () => {
  const { data } = useQuery<PremiumRevenueType>(PremiumRevenueQuery, {
    context: { clientName: 'contentful' },
    ssr: false,
  })

  if (!data) return null

  return <>${data.roadmap.rawMrr}</>
}
