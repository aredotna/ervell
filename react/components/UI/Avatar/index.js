import styled from 'styled-components';

import Styles from 'react/styles';

const Avatar = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${x => x.size}px;
  height: ${x => x.size}px;
  background-color: ${Styles.Colors.gray.semiLight};
`;

Avatar.defaultProps = {
  size: 40,
};

export default Avatar;
