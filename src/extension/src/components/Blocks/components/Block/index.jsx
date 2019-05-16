/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Truncate from 'v2/components/UI/Truncate'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { FilledButton } from 'v2/components/UI/Buttons'

const Container = styled(Box)`
  display: flex;
  position: absolute;
  border: 1px solid ${props => props.theme.colors.gray.semiLight};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const TextContainer = styled(Box).attrs({ p: 3 })`
  min-width: 100%;
  text-align: left;
  display: flex;
  position: relative;
  overflow-y: hidden;

  &:after {
    content: '';
    background: linear-gradient(
      ${x => x.theme.colors.utility.transparent} 0%,
      white 95%
    );
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

const ImageContainer = styled(Box)`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${props => props.src});
  width: 100%;
  height: 100%;
`

const LinkContainer = styled(Box).attrs({
  my: 3,
  p: 3,
})`
  min-width: 100%;
  text-align: center;
  display: flex;
  position: relative;
  overflow: hidden;
`

const LinkText = styled(Text).attrs({
  f: 1,
  align: 'left',
  font: 'mono',
  color: 'gray.semiBold',
})`
  overflow: hidden;
`

const Overlay = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  > * {
    display: none;
  }

  &:hover > * {
    display: block;
  }
`

class Block extends PureComponent {
  static propTypes = {
    block: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  onEdit = () => {
    const { history } = this.props
    history.push(`/edit`)
  }

  render() {
    const { block } = this.props
    const isText = block.type === 'Text' || block.type === 'Link'

    return (
      <Container isText={isText}>
        {block.type === 'Text' && (
          <TextContainer>
            <Text f={3} font="serif">
              {block.value}
            </Text>
          </TextContainer>
        )}
        {block.type === 'Link' && (
          <LinkContainer>
            <LinkText>
              <Truncate suffix="..." length={40}>
                {block.value}
              </Truncate>
            </LinkText>
          </LinkContainer>
        )}
        {block.type === 'Image' && <ImageContainer src={block.value} />}
        <Overlay>
          {block.type !== 'Link' && (
            <FilledButton f={2} bg="white" onClick={this.onEdit}>
              Edit
            </FilledButton>
          )}
        </Overlay>
      </Container>
    )
  }
}

export default withRouter(Block)
