import styled from 'styled-components'
import Text from 'v2/components/UI/Text'

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
