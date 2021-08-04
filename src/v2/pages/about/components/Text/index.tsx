import styled from 'styled-components'

import Text from 'v2/components/UI/Text'

const Headline = styled(Text).attrs({
  fontSize: 8,
  lineHeight: 1,
  my: 6,
})``

const Subheadline = styled(Text).attrs({
  fontSize: 5,
  lineHeight: 1,
  my: 5,
  mx: 'auto',
  px: 4,
})`
  max-width: 670px;
`

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

export const P = styled(Text).attrs({
  f: 4,
  color: 'gray.bold',
  lineHeight: 1.5,
  mb: 7,
})`
  text-align: left;

  ul {
    margin-left: 0;
    padding-left: ${x => x.theme.space[7]};
  }
`

export { Headline, Subheadline, Description }
