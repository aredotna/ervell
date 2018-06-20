import styled from 'styled-components';

import styles from 'react/styles';

export default styled.hr`
  margin: 1em auto;
  height: 1px;
  border: none;
  background-color: ${x => `
    ${!x.invisible && (x.color || styles.Colors.gray.regular)}
  `};
`;
