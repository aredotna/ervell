import styled from 'styled-components';
import { space } from 'styled-system';

const Avatar = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${x => x.size}px;
  height: ${x => x.size}px;
  background-color: ${x => x.theme.colors.gray.semiLight};
  ${space}
`;

Avatar.defaultProps = {
  size: 40,
};

export default Avatar;
