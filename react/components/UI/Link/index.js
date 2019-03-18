import styled from 'styled-components';
import { display, space } from 'styled-system';

const Link = styled.a`
  box-sizing: border-box;
  ${display}
  ${space}
`;

Link.defaultProps = {
  role: 'button',
  tabIndex: 0,
};

export default Link;
