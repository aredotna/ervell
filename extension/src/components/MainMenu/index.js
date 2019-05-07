import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { Link } from 'react-router-dom'

import selectedChannelQuery from 'extension/src/components/Blocks/components/SelectedChannel/queries/selectedChannel'

import Layout from 'extension/src/components/Layout'
import CenterStretchBox from 'extension/src/components/UI/CenterStretchBox'
import Text from 'src/v2/components/UI/Text'
import {
  mixin,
  GenericButton as Button,
} from 'src/v2/components/UI/GenericButton'

import Messenger from 'extension/src/lib/Messenger'

const LinkButton = styled(Link).attrs({
  f: 5,
  mt: 4,
})`
  ${mixin}
`

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
`

class MainMenu extends Component {
  static propTypes = {
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.messenger = new Messenger(window.top)
  }

  componentDidMount() {
    this.props.client.query({
      query: selectedChannelQuery,
    })
  }

  onAddLink = () => {
    this.messenger.send({
      action: 'getCurrentPage',
    })
  }

  onLogOut = () => {
    window.localStorage.removeItem('authentication_token')
    window.location.reload()
  }

  render() {
    return (
      <Layout>
        <CenterStretchBox>
          <Button f={5} mt={4} onClick={this.onAddLink}>
            Add as link
          </Button>
          <LinkButton to="/blocks">Drag image(s)</LinkButton>
          <LinkButton to="/blocks">Save text(s)</LinkButton>
          <LogOutLink onClick={this.onLogOut} />
        </CenterStretchBox>
      </Layout>
    )
  }
}

export default withApollo(MainMenu)
