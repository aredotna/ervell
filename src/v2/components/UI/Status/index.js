import styled from 'styled-components';

import { optionLinkPadding } from 'v2/components/UI/OptionLink';

export default styled.div`
  max-width: 90%;
  padding: ${optionLinkPadding};
  font-size: ${x => x.theme.fontSizesIndexed.xs};
  line-height: ${x => x.theme.lineHeightsIndexed.tall};
  color: ${x => x.theme.colors.state.alert};
`;
