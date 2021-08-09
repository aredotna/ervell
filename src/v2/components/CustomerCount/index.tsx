import { useQuery } from '@apollo/client'
import React from 'react'
import { CustomerCount as CustomerCountType } from '__generated__/contentful/CustomerCount'
import { CustomerCountQuery } from './contentfulQueries/customerCountQuery'

export const CustomerCount: React.FC = () => {
  const { data } = useQuery<CustomerCountType>(CustomerCountQuery, {
    context: { clientName: 'contentful' },
    ssr: false,
  })

  if (!data) return null

  return <>{data.roadmap.statsRawCustomers}</>
}
