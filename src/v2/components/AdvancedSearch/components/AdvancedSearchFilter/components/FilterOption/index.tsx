import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'

const FilterContainer = styled(Box).attrs({
  p: 1,
})`
  ${props =>
    props.active &&
    `
    background-color: ${props.theme.colors.gray.light};
  `}
`

const FilterLabel = styled(Text).attrs({
  f: 1,
  lineHeight: 1.5,
  fontWeight: 'bold',
})`
  ${props =>
    props.active &&
    `
    color: ${props.theme.colors.gray.bold};
  `}
`

const EnumLabelMap = {
  [WhereEnum.ALL]: 'All Are.na',
  [WhereEnum.MY]: 'My Are.na',
  [WhereEnum.CHANNEL]: 'This channel',
  [WhereEnum.FOLLOWING]: 'My network',
  [WhatEnum.ALL]: 'All',
  [WhatEnum.ATTACHMENT]: 'Attachments',
  [WhatEnum.BLOCK]: 'Blocks',
  [WhatEnum.CHANNEL]: 'Channels',
  [WhatEnum.GROUP]: 'Groups',
  [WhatEnum.IMAGE]: 'Images',
  [WhatEnum.LINK]: 'Links',
  [WhatEnum.MEDIA]: 'Embeds',
  [WhatEnum.TEXT]: 'Texts',
  [WhatEnum.USER]: 'People',
  [FieldsEnum.ALL]: 'All',
  [FieldsEnum.NAME]: 'Title',
  [FieldsEnum.DESCRIPTION]: 'Description',
  [FieldsEnum.CONTENT]: 'Content',
  [FieldsEnum.DOMAIN]: 'Domain',
  [FieldsEnum.URL]: 'URL',
}

interface FilterOptionProps {
  filter: WhereEnum | WhatEnum | FieldsEnum
  currentFilters?: WhereEnum[] | WhatEnum[] | FieldsEnum[]
}

export const FilterOption: React.FC<FilterOptionProps> = ({
  filter,
  currentFilters = [],
}) => {
  const typedCurrentFilter: any[] = currentFilters ? currentFilters : []
  const isSelected = filter && typedCurrentFilter?.includes(filter)
  return (
    <FilterContainer active={isSelected}>
      <FilterLabel active={isSelected}>{EnumLabelMap[filter]}</FilterLabel>
    </FilterContainer>
  )
}
