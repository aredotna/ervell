import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ApolloConsumer } from '@apollo/client'
import { gql } from '@apollo/client'
import styled from 'styled-components'

const Icon = styled.span.attrs({
  'aria-label': 'Generate random channel title',
  role: 'img',
  title: 'Generate random channel title',
})`
  cursor: pointer;
  font-size: 8px;
  &:after {
    content: '⚪️';
  }
  &:hover:after {
    content: '⚫️';
  }
`

export default class RandomChannelIcon extends PureComponent {
  static propTypes = {
    onQuery: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Icon
            onClick={async () => {
              const { data } = await client.query({
                query: gql`
                  query RandomChannelIconQuery {
                    random_title
                  }
                `,
                fetchPolicy: 'network-only',
              })
              this.props.onQuery(data.random_title)
            }}
          />
        )}
      </ApolloConsumer>
    )
  }
}
