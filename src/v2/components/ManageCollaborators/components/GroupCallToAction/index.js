import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto 2em auto;
  padding: 2em 1em;
  font-size: ${x => x.theme.fontSizesIndexed.sm};
  line-height: ${x => x.theme.lineHeightsIndexed.tall};
  color: ${x => x.theme.colors.gray.medium};
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
