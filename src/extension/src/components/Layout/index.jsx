import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  border: 1px solid ${x => x.theme.colors.gray.regular};
`

const Top = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  top: ${x => x.theme.space[5]};
  left: ${x => x.theme.space[5]};
  right: ${x => x.theme.space[5]};
  z-index: 100;
`

const Back = styled(Text).attrs({
  f: 3,
  color: 'gray.regular',
})`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.gray.bold};
  }

  &:after {
    content: 'back';
  }
`
class Layout extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    showBack: PropTypes.bool,
  }

  static defaultProps = {
    showBack: false,
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { children, showBack } = this.props

    return (
      <Container p={5} pb={0}>
        <Top>{showBack && <Back onClick={this.goBack} />}</Top>
        {children}
      </Container>
    )
  }
}

export default withRouter(Layout)
