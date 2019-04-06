import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

import Box from 'react/components/UI/Box';
import Icons from 'react/components/UI/Icons';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 367px;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled(Icons).attrs({
  name: 'ArenaMark',
  size: 7,
})``;

class Pane extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const isLoggedIn = this.props;

    return (
      <Container>
        <Logo />
        {isLoggedIn &&
          <h1>Hi</h1>
        }
      </Container>
    );
  }
}

export default WithLoginStatus(Pane);

