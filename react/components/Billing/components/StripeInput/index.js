import styled from 'styled-components';

import theme from 'react/styles/theme';

import * as inputMixins from 'react/components/UI/Inputs/mixin';

export default Component => styled(Component).attrs({
  style: {
    base: {
      fontSize: theme.fontSizesIndexed.root.desktop,
      fontFamily: theme.fonts.sans,
      color: 'black',
      '::placeholder': {
        color: theme.colors.utility.middleGray,
      },
    },
  },
})`
  ${inputMixins.defaultMixin}
  &.StripeElement--focus {
    ${inputMixins.focusMixin}
  }
`;
