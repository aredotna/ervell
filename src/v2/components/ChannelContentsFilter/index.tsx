import React, { useState } from 'react'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'
import { unescape } from 'underscore'

import constants from 'v2/styles/constants'

import { ChannelContentsFiltered } from '__generated__/ChannelContentsFiltered'

import { channelContentsFilteredQuery } from './queries/channelContentsFiltered'

import Box from 'v2/components/UI/Box'
import Grid from 'v2/components/UI/Grid'
import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'
import SearchInput from 'v2/components/UI/SearchInput'
import Cell from 'v2/components/Cell'

const Info = styled(Text).attrs({
  f: 0,
  mb: 8,
  color: 'gray.semiBold',
})`
  text-transform: uppercase;
  text-align: center;
`

export const Divider = styled(Box).attrs({
  mt: -8,
  mb: 8,
  mr: constants.doubleBlockGutter,
})`
  height: 3em; // 8
  box-shadow: 0 1em 1em -1.33em ${props => props.theme.colors.gray.bold};
`

export const ChannelContentsFilter = ({ channel }) => {
  const [query, setQuery] = useState('')

  if (channel.counts.contents === 0) return null

  const { counts } = channel

  const countLabels = [
    ...(counts.channels > 0
      ? [`${counts.channels} channel${counts.channels === 1 ? '' : 's'}`]
      : []),
    ...(counts.blocks > 0
      ? [`${counts.blocks} block${counts.blocks === 1 ? '' : 's'}`]
      : []),
  ].join(' and ')

  return (
    <>
      <SearchInput
        borderColor="transparent"
        placeholder={`Filter ${unescape(channel.title)} (${countLabels})`}
        mr={constants.doubleBlockGutter}
        mb={6}
        query={query}
        onDebouncedQueryChange={setQuery}
      />

      {query !== '' && (
        <Query<ChannelContentsFiltered>
          query={channelContentsFilteredQuery}
          variables={{ channelId: channel.id, query }}
          ssr={false}
        >
          {({ data, loading, error }) => {
            if (error) return null
            if (loading) {
              return (
                <>
                  <Info>Looking for “{query}”</Info>
                  <Divider />
                </>
              )
            }

            const {
              channel: { filtered_contents: contents },
            } = data

            if (contents.length === 0) {
              return (
                <>
                  <Info>Nothing matches “{query}”</Info>
                  <Divider />
                </>
              )
            }

            return (
              <>
                <Info>
                  <Count amount={contents.length} label="result" /> matching “
                  {query}”
                </Info>

                <Grid mb={9}>
                  {contents.map(connectable => (
                    <Cell.Konnectable
                      key={`FilteredConnectable:${connectable.id}:${connectable.__typename}`}
                      konnectable={connectable}
                      context={contents}
                    />
                  ))}
                </Grid>

                <Divider />
              </>
            )
          }}
        </Query>
      )}
    </>
  )
}
