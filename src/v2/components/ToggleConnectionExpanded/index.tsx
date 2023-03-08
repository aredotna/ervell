import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import { TableRow_blokk_Attachment_connection as ConnectionType } from '__generated__/TableRow'
import {
  GetConnectionSelection,
  GetConnectionSelectionVariables,
} from '__generated__/GetConnectionSelection'
import {
  ToggleConnectionExpandedMutation,
  ToggleConnectionExpandedMutationVariables,
} from '__generated__/ToggleConnectionExpandedMutation'
import expandedBlockRowContents from '../Table/components/ExpandedBlockRow/components/ExpandedBlockRowContents/queries/expandedBlockRowContents'
import toggleConnectionExpanded from './mutations/toggleConnectionExpanded'
import getConnectionSelection from './queries/getConnectionSelection'

const Wrapper = styled.span`
  cursor: pointer;
`

interface ToggleConnectionExpandedProps {
  connection: ConnectionType
}

export const ToggleConnectionExpanded: React.FC<ToggleConnectionExpandedProps> = ({
  connection,
  children,
  ...rest
}) => {
  const { data, loading } = useQuery<
    GetConnectionSelection,
    GetConnectionSelectionVariables
  >(getConnectionSelection, {
    variables: { id: connection?.id.toString() },
  })

  const [toggleExpanded] = useMutation<
    ToggleConnectionExpandedMutation,
    ToggleConnectionExpandedMutationVariables
  >(toggleConnectionExpanded, {
    variables: { id: connection?.id.toString() },
    refetchQueries: [expandedBlockRowContents, getConnectionSelection],
    optimisticResponse: () => ({
      toggle_connection_selection: {
        __typename: 'ToggleConnectionSelectionMutationPayload',
        connection: { ...connection, selected: !!data?.connection.selected },
      },
    }),
  })

  if (!data?.connection?.can?.manage) {
    return null
  }

  const expanded = loading ? connection?.selected : data?.connection.selected

  return (
    <Wrapper
      role="button"
      tabIndex={0}
      onClick={() => toggleExpanded()}
      {...rest}
    >
      {expanded ? 'Keep collapsed by default' : 'Keep expanded by default'}
    </Wrapper>
  )
}
