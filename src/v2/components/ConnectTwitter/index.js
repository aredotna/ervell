import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components'
import { map } from 'underscore'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'

import connectTwitterQuery from 'v2/components/ConnectTwitter/queries/connectTwitter'

import Text from 'v2/components/UI/Text'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import TitledDialog from 'v2/components/UI/TitledDialog'
import Contact from 'v2/components/ConnectTwitter/components/Contact'

const Message = styled(Text).attrs({ py: 8 })`
  text-align: center;
  font-weight: bold;
  a {
    text-decoration: underline;
  }
`

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult
  }

  return {
    ...previousResult,
    me: {
      ...previousResult.me,
      authenticated_service: {
        ...previousResult.me.authenticated_service,
        contacts: [
          ...previousResult.me.authenticated_service.contacts,
          ...fetchMoreResult.me.authenticated_service.contacts,
        ],
      },
    },
  }
}

class ConnectTwitter extends Component {
  static propTypes = {
    onDone: PropTypes.func,
  }

  static defaultProps = {
    onDone: () => false,
  }

  state = {
    mode: 'resting',
    page: 1,
    hasMore: true,
  }

  afterFetchMore = fetchMoreResult => {
    const { data, errors } = fetchMoreResult
    const hasMore = !errors && data.me.authenticated_service.contacts.length > 0
    this.setState({
      page: this.state.page + 1,
      hasMore,
    })
  }

  render() {
    const { mode, page, hasMore } = this.state
    const { onDone } = this.props

    return (
      <TitledDialog
        title="Find friends"
        label={
          {
            resting: 'Done',
          }[mode]
        }
        onDone={onDone}
      >
        <Query query={connectTwitterQuery} variables={{ per: 30 }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading) {
              return <LoadingIndicator />
            }

            if (error) {
              return <ErrorAlert>{error.message}</ErrorAlert>
            }

            const {
              me: {
                authenticated_service: { contacts },
              },
            } = data

            if (contacts.length === 0) {
              return (
                <Message>
                  No contacts found. <br />
                  Check out our <a href="/examples">examples page</a> to find
                  channels to follow.
                </Message>
              )
            }

            return (
              <InfiniteScroll
                pageStart={1}
                loadMore={() => {
                  fetchMore({
                    variables: {
                      page: page + 1,
                    },
                    updateQuery,
                  }).then(this.afterFetchMore)
                }}
                hasMore={hasMore}
                useWindow={false}
              >
                {map(contacts, user => (
                  <Contact user={user} key={user.id} />
                ))}
              </InfiniteScroll>
            )
          }}
        </Query>
      </TitledDialog>
    )
  }
}

export default ConnectTwitter
