import React from 'react'
import { useMutation } from '@apollo/client'
import { PureQueryOptions } from '@apollo/client'
import styled from 'styled-components'

import { ConnectionSelectionList } from 'v2/components/ConnectionSelectionList'
import { ConnectCTA } from './components/ConnectCTA'

import createConnectionMutation from 'v2/components/ConnectionSelection/mutations/createConnection'
import removeConnectionMutation from 'v2/components/ConnectionSelection/mutations/removeConnection'

import recentConnectionsQuery from 'v2/components/ConnectionSelectionList/components/RecentChannels/queries/recentChannels'

import {
  createConnectionMutation as CreateConnection,
  createConnectionMutationVariables as CreateConnectionVariables,
} from '__generated__/createConnectionMutation'
import {
  removeConnectionMutation as RemoveConnection,
  removeConnectionMutationVariables as RemoveConnectionVariables,
} from '__generated__/RemoveConnectionMutation'
import { SelectableChannel as Channel } from '__generated__/SelectableChannel'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

const Container = styled.div`
  position: relative;
`

interface ConnectionSelectionProps {
  id: string | number
  type: BaseConnectableTypeEnum
  isOutlined?: boolean
  refetchQueries?: string | PureQueryOptions[]
}

export const ConnectionSelection: React.FC<ConnectionSelectionProps> = ({
  id,
  type,
  isOutlined = true,
  refetchQueries = [],
  ...rest
}) => {
  const [createConnection] = useMutation<
    CreateConnection,
    CreateConnectionVariables
  >(createConnectionMutation)

  const [removeConnection] = useMutation<
    RemoveConnection,
    RemoveConnectionVariables
  >(removeConnectionMutation)

  const handleConnectionSelection = (isSelected: boolean, channel: Channel) => {
    const refetchRecentConnections = {
      query: recentConnectionsQuery,
    }

    const _refetchQueries = [...refetchQueries, refetchRecentConnections]

    if (isSelected) {
      return createConnection({
        refetchQueries: _refetchQueries,
        variables: {
          connectable_id: id.toString(),
          connectable_type: type,
          channel_ids: [channel.id.toString()],
        },
      })
    }

    return removeConnection({
      refetchQueries: [...refetchQueries],
      variables: {
        channel_id: channel.id.toString(),
        connectable_id: id.toString(),
        connectable_type: type,
      },
    })
  }

  return (
    <Container>
      <ConnectCTA id={id} type={type} />

      <ConnectionSelectionList
        onConnectionSelection={handleConnectionSelection}
        isOutlined={isOutlined}
        {...rest}
      />
    </Container>
  )
}
