import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import WithLoginStatus from 'v2/hocs/WithLoginStatus'

import Box from 'v2/components/UI/Box'
import GenericButton from 'v2/components/UI/GenericButton'
import ConnectionSelection from 'v2/components/ConnectionSelection'

import { inputPadding } from 'v2/components/UI/Inputs'

const Container = styled(Box)`
  position: relative;
  font-size: ${props => props.theme.fontSizesIndexed.xs};
`

const Fieldset = styled.div`
  position: relative;
`

const Close = styled.a.attrs({
  role: 'button',
})`
  position: absolute;
  top: 0;
  right: 100%;
  padding: ${inputPadding}; // TODO
  text-align: center;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizesIndexed.xs};
  line-height: 1;
  border: 2px solid transparent;

  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${props => props.theme.fontSizesIndexed.lg};
  }
`

// HACK: Inputs get rendered 2px taller than buttons
// given identical params. This allows us to match them up.
const ConnectPadding = styled.span`
  display: inline-block;
  padding: 1px 0;
`

class Connect extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['BLOCK', 'CHANNEL']).isRequired,
    f: PropTypes.number,
    refetchQueries: PropTypes.arrayOf(
      PropTypes.shape({
        query: PropTypes.object.isRequired,
        variables: PropTypes.object,
      })
    ),
    isLoggedIn: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    f: 1,
    refetchQueries: [],
  }

  state = {
    mode: 'resting',
  }

  openConnect = () => {
    const { isLoggedIn } = this.props

    if (!isLoggedIn) {
      window.location = `/sign_up?redirect-to=${window.location.pathname}`
      return null
    }

    this.setState({ mode: 'active' })
  }

  handleClose = () => {
    this.setState({ mode: 'resting' })
  }

  render() {
    const { mode } = this.state
    const { id, type, f, refetchQueries, ...rest } = this.props

    return (
      <Container {...rest}>
        {mode === 'resting' && (
          <GenericButton onClick={this.openConnect} f={f}>
            <ConnectPadding>Connect &rarr;</ConnectPadding>
          </GenericButton>
        )}

        {mode === 'active' && (
          <>
            <Fieldset>
              <Close onClick={this.handleClose}>
                &nbsp;
                <span>&times;</span>
              </Close>

              <ConnectionSelection
                id={id}
                type={type}
                refetchQueries={refetchQueries}
              />
            </Fieldset>
          </>
        )}
      </Container>
    )
  }
}

export default WithLoginStatus(Connect)
