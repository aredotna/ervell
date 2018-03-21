import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Styles from 'react/styles';

import Button from 'react/components/ManageGroup/components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto 2em auto;
  padding: 2em 1em;
  font-size: ${Styles.Type.size.sm};
  line-height: ${Styles.Type.lineHeight.tall};
  color: ${Styles.Colors.state.alert};
`;

const Bold = styled.span`
  font-weight: bold;
`;

const DeleteConfirmation = ({ name, onCancel, ...rest }) => (
  <Container {...rest}>
    <div>
      <Button onClick={onCancel}>
        Cancel
      </Button>

      Deleting <Bold>{name}</Bold> will mean your group will lose access
      to any channels it is a collaborator on.
      Are you sure you want to delete <Bold>{name}</Bold>?
    </div>
  </Container>
);

DeleteConfirmation.propTypes = {
  name: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
