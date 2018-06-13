import styled from 'styled-components';

import styles from 'react/styles';

import UserAvatar from 'react/components/UserAvatar';

export const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 3.5rem;
  padding: 0.5em;
  border: 1px solid ${styles.Colors.gray.regular};
  border-top: 0;
  background-color: ${styles.Colors.gray.hint};
  font-size: ${styles.Type.size.xs};
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
  color: ${styles.Colors.gray.medium};
`;

export const Amount = styled.div`
  color: ${styles.Colors.gray.medium};
`;

export const Avatar = styled(UserAvatar)`
  align-self: center;
`;
