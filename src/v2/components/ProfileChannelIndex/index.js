import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'

import constants from 'v2/styles/constants'
import { divide } from 'v2/styles/functions'

import profileChannelIndexQuery from 'v2/components/ProfileChannelIndex/queries/profileChannelIndex'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { CompactChannel } from 'v2/components/CompactChannel'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import ProfileEmptyMessage from 'v2/components/ProfileEmptyMessage'

import WithIsSpiderRequesting from 'v2/hocs/WithIsSpiderRequesting'

const Columns = styled.div`
  column-count: 2;
  column-gap: ${x => x.theme.space[9]};
  margin-bottom: ${x => x.theme.space[9]};

  // Adds padding to the right so columns line up with grid
  padding-right: ${constants.doubleBlockGutter};

  ${constants.media.small`
    column-count: 1;
    padding: 0 ${divide(constants.doubleBlockGutter, 2)};
  `}
`

const Group = styled(Box).attrs({
  mb: 8,
})`
  break-inside: avoid;
`

class ProfileChannelIndex extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
    isSpiderRequesting: PropTypes.bool,
  }

  static defaultProps = {
    isSpiderRequesting: false,
  }

  render() {
    const { id, type, isSpiderRequesting } = this.props

    const refetchQueries = [
      { query: profileChannelIndexQuery, variables: { id, type } },
    ]

    return (
      <Query
        query={profileChannelIndexQuery}
        variables={{ id, type }}
        ssr={isSpiderRequesting}
      >
        {({ data, loading, error }) => {
          if (loading) return <BlocksLoadingIndicator />
          if (error) return error.message

          const {
            identity: {
              identifiable,
              identifiable: { channels_index },
            },
          } = data
          const isMine =
            identifiable.is_me || identifiable.is_current_user_a_member

          if (channels_index.length === 0) {
            return (
              <ProfileEmptyMessage
                identifiable={identifiable}
                isMine={isMine}
              />
            )
          }

          return (
            <Columns>
              {channels_index.map(({ key, channels }) => (
                <Group key={key}>
                  <Text textAlign="center" f={4} mb={6} color="gray.medium">
                    {{ symbol: '~', digit: '0–9' }[key] || key}
                  </Text>

                  {channels.map(channel => (
                    <CompactChannel
                      mb={4}
                      key={channel.id}
                      channel={channel}
                      showEditButton={isMine}
                      refetchQueries={refetchQueries}
                    />
                  ))}
                </Group>
              ))}
            </Columns>
          )
        }}
      </Query>
    )
  }
}

export default WithIsSpiderRequesting(ProfileChannelIndex)
