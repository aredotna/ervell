import React from 'react'
import styled from 'styled-components'

import blockPageQuery from 'v2/pages/block/queries/blockPage'

import constants from 'v2/styles/constants'

import Box from 'v2/components/UI/Box'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import FullBlock from 'v2/components/FullBlock'
import BlockPageMetaTags from 'v2/pages/block/components/BlockPageMetaTags'

import { MobileOrChildren } from 'v2/components/MobileBanner'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import {
  BlockPage as BlockPageType,
  BlockPageVariables,
} from '__generated__/BlockPage'

const Container = styled(Box)`
  height: 100vh;
  padding-top: ${constants.topBarHeight};
`

const BlockPageInner: React.FC<{ id: string }> = ({ id }) => {
  const { data, error, loading } = useQuery<BlockPageType, BlockPageVariables>(
    blockPageQuery,
    { variables: { id } }
  )

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  const { block } = data

  return (
    <React.Fragment>
      <BlockPageMetaTags block={block} />

      <FullBlock block={block} layout="DEFAULT" context={'PAGE'} />

      <MobileOrChildren>
        <div />
      </MobileOrChildren>
    </React.Fragment>
  )
}

const BlockPageOuter: React.FC = () => {
  const params = useParams()
  const id = parseInt(params.id, 10)

  return (
    <TopBarLayout>
      <Container>
        <BlockPageInner id={id.toString()} />
      </Container>
    </TopBarLayout>
  )
}

export default BlockPageOuter
