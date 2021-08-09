import styled from 'styled-components'
import Text from 'v2/components/UI/Text'
import { FONT_SIZES } from 'v2/styles/text'

export const P = styled(Text).attrs({
  color: 'gray.bold',
  lineHeight: 1.5,
  mb: 7,
  f: FONT_SIZES.home.lg,
})`
  text-align: left;
  ul {
    margin-left: 0;
    padding-left: ${x => x.theme.space[6]};
  }
`
