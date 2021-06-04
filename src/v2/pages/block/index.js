import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'

import blockPageQuery from 'v2/pages/block/queries/blockPage'

import constants from 'v2/styles/constants'

import Box from 'v2/components/UI/Box'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import BlockLightbox from 'v2/components/BlockLightbox'
import BlockPageMetaTags from 'v2/pages/block/components/BlockPageMetaTags'

import { MobileOrChildren } from 'v2/components/MobileBanner'

const Container = styled(Box)`
  height: 100vh;
  padding-top: ${constants.topBarHeight};
`

export default class BlockPage extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  render() {
    const { id } = this.props

    return (
      <TopBarLayout>
        <Container>
          <Query query={blockPageQuery} variables={{ id }}>
            {({ data, loading, error }) => {
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

                  <BlockLightbox block={block} layout="DEFAULT" />

                  <MobileOrChildren route="block" id={block.id}>
                    <div />
                  </MobileOrChildren>
                </React.Fragment>
              )
            }}
          </Query>
        </Container>
      </TopBarLayout>
    )
  }
}
