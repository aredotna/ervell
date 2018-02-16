import styled from 'styled-components';

import Styles from 'react/styles';

export default styled.div`
  display: flex;
  padding: 0.5em;
  border: 1px solid ${Styles.Colors.gray.regular};
  border-top: 0;
  background-color: ${Styles.Colors.gray.hint};
  font-size: ${Styles.Type.size.xs};
`;
