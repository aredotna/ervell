import styled from 'styled-components';

import styles from 'react/styles';

const Link = styled.a.attrs({
  role: 'button',
})`
  ${x => (x.length > 25 && styles.Mixins.hyphenate)}
`;

export default Link;
