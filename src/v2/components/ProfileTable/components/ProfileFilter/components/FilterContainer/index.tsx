import React from 'react'
import styled from 'styled-components'

import BorderedBox from 'v2/components/UI/BorderedBox'
import Box from 'v2/components/UI/Box'
import { Input } from 'v2/components/UI/Inputs'
import Icon from 'v2/components/UI/Icons'
import Text from 'v2/components/UI/Text'

import TypeFilter from 'v2/components/ProfileTable/components/ProfileFilter/components/TypeFilter'

import { ConnectableTypeEnum } from '__generated__/globalTypes'

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
  setType: (value: ConnectableTypeEnum) => void
}

export const FilterContainer: React.FC<FilterContainerProps> = ({
  type,
  setType,
}) => {
  return (
    <Outer>
      <Inner>
        <Box display="flex" flexDirection="row" mb={5}>
          <Icon name="Filters" size="0.9rem" mr={3} />
          <Text f="1">Filter by</Text>
        </Box>
        <TypeFilter type={type} setType={setType} />
      </Inner>
    </Outer>
  )
}

export default FilterContainer
