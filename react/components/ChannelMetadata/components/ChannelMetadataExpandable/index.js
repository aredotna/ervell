import styled from 'styled-components';

import Styles from 'react/styles';
import Expandable from 'react/components/UI/Expandable';

export default styled(Expandable).attrs({
  height: `${Styles.Type.functions.calculateLineHeight('xs', 'tall') * 5}rem`, // 5 lines
})`
`;
