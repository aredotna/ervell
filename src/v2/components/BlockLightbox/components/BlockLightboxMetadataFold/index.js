import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'

import blockLightboxFoldQuery from 'v2/components/BlockLightbox/components/BlockLightboxMetadataFold/queries/blockLightboxFold'

import Count from 'v2/components/UI/Count'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import Header from 'v2/components/BlockLightbox/components/BlockLightboxMetadataPane/components/Header'
import BlockLightboxConnections from 'v2/components/BlockLightbox/components/BlockLightboxConnections'
import BlockLightboxComments from 'v2/components/BlockLightbox/components/BlockLightboxComments'

export default class BlockLightboxMetadataFold extends PureComponent {
  static propTypes = {
    block: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }

  state = {
    page: 1,
    per: 10,
    loadingMore: false,
  }

  loadMore = fetchMore => e => {
    e.preventDefault()

    const { page, per } = this.state

    this.setState({ loadingMore: true }, () => {
      fetchMore({
        variables: { page: page + 1, per },
        updateQuery: (prevResult, { fetchMoreResult }) => ({
          block: {
            ...prevResult.block,
            ...fetchMoreResult.block,
            private_channels: [
              ...prevResult.block.private_channels,
              ...fetchMoreResult.block.private_channels,
            ],
            public_channels: [
              ...prevResult.block.public_channels,
              ...fetchMoreResult.block.public_channels,
            ],
          },
        }),
      }).then(({ errors }) => {
        if (errors) return

        this.setState({
          page: page + 1,
          loadingMore: false,
        })
      })
    })
  }

  render() {
    const { per, loadingMore } = this.state
    const { block } = this.props

    return (
      <Query
        query={blockLightboxFoldQuery}
        variables={{ id: block.id, page: 1, per }}
        ssr={false}
      >
        {({ loading, error, data, fetchMore }) => {
          if (error) {
            return <ErrorAlert>{error.message}</ErrorAlert>
          }

          const blockData = loading ? {} : data.block
          const fullBlock = { ...block, ...blockData }

          return (
            <React.Fragment>
              <Header mt={8}>
                {fullBlock.counts ? (
                  <Count
                    amount={
                      fullBlock.counts.private_channels +
                      fullBlock.counts.public_channels
                    }
                    label="Connection"
                  />
                ) : (
                  'Connections'
                )}
              </Header>

              <BlockLightboxConnections
                block={fullBlock}
                loading={loading}
                onLoadMore={this.loadMore(fetchMore)}
                loadingMore={loadingMore}
                mt={4}
              />

              {fullBlock.can.comment && (
                <React.Fragment>
                  <Header mt={8}>
                    {fullBlock.counts ? (
                      <Count
                        amount={fullBlock.counts.comments}
                        label="Comment"
                      />
                    ) : (
                      'Comment'
                    )}
                  </Header>

                  <BlockLightboxComments
                    block={fullBlock}
                    loading={loading}
                    mt={4}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}
