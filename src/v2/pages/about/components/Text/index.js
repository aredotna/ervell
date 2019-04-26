import styled from 'styled-components'

import Text from 'v2/components/UI/Text'

const Headline = styled(Text).attrs({
  fontSize: 8,
  lineHeight: 1,
  align: 'center',
  my: 6,
})``

const Subheadline = styled(Text).attrs({
  fontSize: 6,
  lineHeight: 1,
  align: 'center',
  m: 5,
})``

const Description = styled(Text).attrs({
  fontSize: 4,
  lineHeight: 2,
  align: 'center',
  my: 6,
  px: 5,
})`
  > a {
    font-weight: bold;
  }

  > a:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
`

export { Headline, Subheadline, Description }
