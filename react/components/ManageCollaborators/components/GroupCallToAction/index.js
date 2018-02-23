import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Styles from 'react/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto 4em auto;
  font-size: ${Styles.Type.size.sm};
  line-height: ${Styles.Type.lineHeight.tall};
  color: ${Styles.Colors.gray.medium};
`;

const Link = styled.a.attrs({
  role: 'button',
})`
  font-weight: bold;
`;

const GroupCallToAction = ({ onClick, ...rest }) => (
  <Container {...rest}>
    Working with people on multiple channels?
    <Link onClick={onClick}>Create a group.</Link>
  </Container>
);

GroupCallToAction.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GroupCallToAction;
