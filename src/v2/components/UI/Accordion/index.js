import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'

const Container = styled.div`
  ${x =>
    x.mode === 'closed' &&
    `
    border-bottom: 1px solid ${x.theme.colors.gray.regular};

    &:last-child {
      border-bottom: 0;
    }
  `}
`

const Header = styled.div`
  position: relative;
  background-color: ${x => x.theme.colors.gray.hint};
  padding: ${x => `${x.theme.space[4]} ${x.theme.space[7]}`};
  user-select: none;
  cursor: pointer;

  // Right-facing Caret
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 1em;
    width: 0;
    height: 0;
    transform: translateY(-50%);
    border-top: 0.25em solid transparent;
    border-right: 0.25em solid transparent;
    border-bottom: 0.25em solid transparent;
    border-left: 0.5em solid ${x => x.theme.colors.gray.semiBold};
    pointer-events: none;
  }

  ${x =>
    x.mode === 'open' &&
    `
    // Down-facing Caret
    &:after {
      border-top: 0.5em solid ${x.theme.colors.gray.semiBold};
      border-right: 0.25em solid transparent;
      border-bottom: 0;
      border-left: 0.25em solid transparent;
    }
  `}
`

const Section = styled.div``

export default class Accordion extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    mode: PropTypes.oneOf(['closed', 'open']),
  }

  static defaultProps = {
    mode: 'open',
  }

  constructor(props) {
    super(props)

    const { mode } = this.props

    this.state = { mode }
  }

  toggleMode = () => {
    this.setState(({ mode: prevMode }) => ({
      mode: prevMode === 'open' ? 'closed' : 'open',
    }))
  }

  render() {
    const { mode } = this.state
    const { label, children, ...rest } = this.props

    return (
      <Container {...rest} mode={mode}>
        <Header
          mode={mode}
          onClick={this.toggleMode}
          role="button"
          tabIndex={0}
        >
          <Text f={1} fontWeight="bold">
            {label}
          </Text>
        </Header>

        {mode === 'open' && <Section>{children}</Section>}
      </Container>
    )
  }
}
