import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from '@apollo/client/react/hoc'

import dismissBannerMutation from 'v2/components/UI/Banner/mutations/dimissBanner'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Close from 'v2/components/UI/Close'
import Icons from 'v2/components/UI/Icons'

const Container = styled(Box).attrs({
  p: 6,
})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled(Box).attrs({
  display: 'flex',
  flexDirection: ['column', 'column', 'row'],
  alignItems: 'center',
  justifyContent: 'center',
})``

class Banner extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
    onClose: PropTypes.func,
    iconName: PropTypes.string,
    banner: PropTypes.string,
    dismissBanner: PropTypes.func.isRequired,
    isCloseable: PropTypes.bool,
  }

  static defaultProps = {
    color: null,
    onClose: null,
    iconName: null,
    banner: null,
    isCloseable: true,
  }

  state = {
    mode: 'resting',
  }

  handleClose = e => {
    e.preventDefault()

    const { onClose, dismissBanner, banner } = this.props

    if (banner) {
      dismissBanner({
        variables: { banner },
      })
    }

    if (onClose) onClose()

    this.setState({ mode: 'closed' })
  }

  render() {
    const {
      children,
      color,
      onClose,
      iconName,
      isCloseable,
      ...rest
    } = this.props

    if (this.state.mode === 'closed') return null

    return (
      <Container {...rest}>
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {iconName && (
            <Icons flexShrink={0} name={iconName} color={color} mr={5} />
          )}

          <Box flex={[1, 1, 'unset']}>
            <Text
              color={color}
              fontWeight="bold"
              textAlign="center"
              underlineLinks
              hoverLinks={{ color: 'gray.bold' }}
            >
              <Wrapper>{children}</Wrapper>
            </Text>
          </Box>
        </Box>

        {isCloseable && (
          <Close
            size={7}
            thickness="4px"
            color={color}
            alignSelf="flex-start"
            onClick={this.handleClose}
          />
        )}
      </Container>
    )
  }
}

export default graphql(dismissBannerMutation, {
  name: 'dismissBanner',
})(Banner)
