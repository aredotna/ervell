import styled from 'styled-components';

import { optionLinkPadding } from 'react/components/UI/OptionLink';

import styles from 'react/styles';

export default styled.div`
  max-width: 90%;
  padding: ${optionLinkPadding};
  font-size: ${styles.Type.size.xs};
  line-height: ${styles.Type.lineHeight.tall};
  color: ${styles.Colors.state.alert};
`;
