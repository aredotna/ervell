import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';

import selectedChannelQuery from 'extension/src/components/Blocks/components/SelectedChannel/queries/selectedChannel';

import Layout from 'extension/src/components/Layout';
import CenterStretchBox from 'extension/src/components/UI/CenterStretchBox';
import Text from 'react/components/UI/Text';
import { GenericButtonLink as ButtonLink } from 'react/components/UI/GenericButton';

const Button = styled(ButtonLink).attrs({
  f: 5,
  mt: 4,
})``;

const LogOutLink = styled(Text).attrs({
  f: 3,
  color: 'gray.regular',
})`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: inline-flex;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.gray.bold};
  }

  &:after {
    margin: auto;
    content: 'log out';
  }
`;

class MainMenu extends Component {
  static propTypes = {
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    this.props.client.query({
      query: selectedChannelQuery,
    });
  }

  onLogOut = () => {
    window.localStorage.removeItem('authentication_token');
    window.location.reload();
  }

  render() {
    return (
      <Layout>
        <CenterStretchBox>
          <Button>Add as link</Button>
          <Button>Drag image(s)</Button>
          <Button>Save text(s)</Button>
          <LogOutLink onClick={this.onLogOut} />
        </CenterStretchBox>
      </Layout>
    );
  }
}

export default withApollo(MainMenu);
