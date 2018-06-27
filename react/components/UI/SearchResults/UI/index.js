import styled from 'styled-components';

import UserAvatar from 'react/components/UserAvatar';

export const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 3.5rem;
  padding: 0.5em;
  border: 1px solid ${x => x.theme.colors.gray.regular};
  border-top: 0;
  background-color: ${x => x.theme.colors.gray.hint};
  font-size: ${x => x.theme.fontSizesIndexed.xs};
`;

export const Information = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-self: stretch;
  padding-left: 1em;
`;

export const Name = styled.a`
  display: block;
  font-weight: bold;
`;

export const Email = styled.div`
  color: ${x => x.theme.colors.gray.medium};
`;

export const Amount = styled.div`
  color: ${x => x.theme.colors.gray.medium};
`;

export const Avatar = styled(UserAvatar)`
  align-self: center;
`;
