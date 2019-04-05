import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';

import Button from 'react/components/UI/GenericButton';

const Container = styled.div`
  display: flex;
  width: 400px;
  height: 300px;
  justify-content: center;
  align-items: center;
`;

class Menu extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <Container>
        <Button>Hi</Button>
      </Container>
    );
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      id
    }
  }
`;

export default graphql(meQuery)(Menu);

