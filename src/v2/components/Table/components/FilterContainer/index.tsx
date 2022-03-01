import React from 'react'
import styled from 'styled-components'

import BorderedBox from 'v2/components/UI/BorderedBox'
import Box from 'v2/components/UI/Box'
import { Input } from 'v2/components/UI/Inputs'
import Icon from 'v2/components/UI/Icons'
import Text from 'v2/components/UI/Text'

import TypeFilter from 'v2/components/ChannelTableContents/components/ChannelTableHeader/components/TypeFilter'
import UserFilter from 'v2/components/ChannelTableContents/components/ChannelTableHeader/components/UserFilter'

import { ConnectableTypeEnum } from '__generated__/globalTypes'
import { ChannelTableConnectors_channel_connectors } from '__generated__/ChannelTableConnectors'

const Outer = styled(BorderedBox).attrs({
  bg: 'gray.hint',
  width: '20em',
  height: '20em',
})``

const Inner = styled(Box).attrs({
  p: 6,
})``

export const SearchInput = styled(Input).attrs({
  f: 1,
})`
  margin-bottom: -3px;
  &,
  &:focus {
    border: 1px solid ${x => x.theme.colors.gray.regular} !important;
  }
`

interface FilterContainerProps {
  id: string | number
  type?: ConnectableTypeEnum
  user?: ChannelTableConnectors_channel_connectors
  setType: (value: ConnectableTypeEnum) => void
  setUser: (value: ChannelTableConnectors_channel_connectors) => void
}

export const FilterContainer: React.FC<FilterContainerProps> = ({
  id,
  type,
  user,
  setType,
  setUser,
}) => {
  return (
    <Outer>
      <Inner>
        <Box display="flex" flexDirection="row" mb={5}>
          <Icon name="Filters" size="0.9rem" mr={3} />
          <Text f="1">Filter by</Text>
        </Box>
        <TypeFilter id={id} type={type} setType={setType} />
        <UserFilter id={id} user={user} setUser={setUser} />
      </Inner>
    </Outer>
  )
}

export default FilterContainer
