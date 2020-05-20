import styled from 'styled-components'

import theme from 'v2/styles/theme'

import * as inputMixins from 'v2/components/UI/Inputs/mixin'

export default Component => styled(Component).attrs({
  style: {
    base: {
      fontSize: theme.fontSizesIndexed.root.desktop,
      fontFamily: theme.fonts.sans,
      '::placeholder': {
        color: theme.colors.utility.middleGray,
      },
    },
  },
})`
  color: ${props => props.theme.colors.gray.bold};
  ${inputMixins.defaultMixin}
  &.StripeElement--focus {
    ${inputMixins.focusMixin}
  }
`
