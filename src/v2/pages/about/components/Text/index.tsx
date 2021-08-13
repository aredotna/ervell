import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import { FONT_SIZES } from 'v2/styles/text'
import constants from 'v2/styles/constants'

const Headline = styled(Text).attrs({
  fontSize: 8,
  lineHeight: 1,
  my: 6,
})``

const Subheadline = styled(Text).attrs({
  fontSize: FONT_SIZES.home.lg,
  lineHeight: 1,
  my: 5,
  mx: 'auto',
  px: 4,
})`
  max-width: 670px;
`

const Description = styled(Text).attrs({
  fontSize: FONT_SIZES.home.lg,
  lineHeight: 2,
  align: 'center',
  my: 6,
})`
  padding: 50px;

  ${constants.media.large`
    padding: 3vw;
  `}

  > a {
    font-weight: bold;
  }

  > a:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
`

export const P = styled(Text).attrs({
  color: 'gray.bold',
  lineHeight: 1.5,
  mb: 7,
  f: FONT_SIZES.home.lg,
  boldLinks: true,
})`
  text-align: left;

  ul {
    margin-left: 0;
    padding-left: ${x => x.theme.space[7]};
  }
`

export { Headline, Subheadline, Description }
