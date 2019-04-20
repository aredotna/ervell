import styled from 'styled-components';

import { hyphenate } from 'v2/styles/mixins';

const Link = styled.a.attrs({
  role: 'button',
})`
  ${x => (x.length > 25 && hyphenate)}
`;

export default Link;
