import React from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { EssaysCommunity as EssaysCommunityType } from '__generated__/contentful/EssaysCommunity'
import { EssaysCommunityQuery } from './contentfulQueries/essaysCommunityQuery'
import { BlogThumb } from './components/BlogThumb'
import Text from 'v2/components/UI/Text'

const BlogPostContainer = styled(Box).attrs({
  display: 'flex',
  my: 6,
})`
  flex-wrap: wrap;
`

const Container = styled(Box).attrs({
  mb: 5,
  p: 4,
  display: 'flex',
})`
  border: 1px solid ${x => x.theme.colors.gray.light};
  min-width: 0;
`

const AnnualContainer = styled(Box).attrs({
  mr: 5,
  mb: 5,
  p: 4,
  display: 'flex',
})`
  flex-basis: calc(50% - 20px);
  border: 1px solid ${x => x.theme.colors.gray.light};
  min-width: 0;
  flex-direction: column;
`

const Label = styled(Text).attrs({
  f: 1,
  color: 'gray.block',
})`
  text-transform: uppercase;
`

const Link = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Title = styled(Text).attrs({
  f: 2,
  color: 'gray.block',
  mb: 5,
})`
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const AnnualTitle = styled(Title).attrs({
  f: 4,
})``

export const EssaysCommunity: React.FC = () => {
  const { data } = useQuery<EssaysCommunityType>(EssaysCommunityQuery, {
    context: { clientName: 'contentful' },
    ssr: false,
  })

  if (!data) return null

  const walkthrough = data.walkthroughCollection.items[0]

  return (
    <Box>
      <Text f={5} mb={3} color="gray.block">
        Essays
      </Text>
      <Text color="gray.block">A selection from our archives</Text>

      <BlogPostContainer>
        {data.blogPostCollection.items.map((post, index) => {
          return <BlogThumb post={post} key={index} />
        })}
        <Text boldLinks mt={4} color="gray.block">
          <a href="/blog">See all essays</a>
        </Text>
      </BlogPostContainer>

      <Box mt={9}>
        <Text f={5} mb={3} color="gray.block">
          Walkthroughs
        </Text>
        <Text color="gray.block">
          Every other month, we have four community members walk through their
          channels over video.
        </Text>

        <Box my={6}>
          <Container>
            <Label>{walkthrough.nextEvent}</Label>
            <Title>TBD</Title>
          </Container>
        </Box>
      </Box>

      <Box mt={9}>
        <Text f={5} mb={3} color="gray.block">
          Annual
        </Text>
        <Text color="gray.block">
          For the last two years, we&#39;ve published collections of writings
          and essays from the people in our community.
        </Text>

        <Box my={6} display="flex">
          <AnnualContainer>
            <Link href="https://store.are.na/collections/frontpage/products/annual-book">
              <AnnualTitle>2020 Are.na Annual</AnnualTitle>
              <img
                width={85}
                height={85}
                src="https://cdn.shopify.com/s/files/1/0078/7719/7924/products/Photo_Dec_22_1_37_38_PM_300x300.jpg?v=1577042979"
              />
            </Link>
          </AnnualContainer>

          <AnnualContainer>
            <Link href="https://store.are.na/collections/frontpage/products/are-na-annual-2021">
              <AnnualTitle>2021 Are.na Annual</AnnualTitle>
              <img
                width={85}
                height={85}
                src="https://cdn.shopify.com/s/files/1/0078/7719/7924/products/cover-square_300x300.jpg?v=1609876594"
              />
            </Link>
          </AnnualContainer>
        </Box>
      </Box>
    </Box>
  )
}
