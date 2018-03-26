import React from 'react';
import styled from 'styled-components';

import Styles from 'react/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 50%;
  margin: 0 auto 2em auto;
  padding: 2em 1em;
  font-size: ${Styles.Type.size.sm};
  line-height: ${Styles.Type.lineHeight.tall};
  color: ${Styles.Colors.gray.medium};
`;

export default () => (
  <Container>
    Once your group is created, you can
    add that group as a collaborator on any channel
    you have access to.
  </Container>
);
