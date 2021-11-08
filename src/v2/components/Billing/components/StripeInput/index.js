import styled from 'styled-components'

import theme from 'v2/styles/theme'

import * as inputMixins from 'v2/components/UI/Inputs/mixin'

export default Component => styled(Component).attrs({
  style: {
    base: {
      fontSize: theme.fontSizesIndexed.root.desktop,
      fontFamily: theme.fonts.sans,
      color: theme.colors.gray.bold,
      '::placeholder': {
        color: theme.colors.utility.middleGray,
      },
    },
  },
})`
  ${inputMixins.defaultMixin}
  color: ${props => props.theme.colors.gray.bold};

  &.StripeElement--focus {
    ${inputMixins.focusMixin}
  }
`
