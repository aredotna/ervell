import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import blockLightboxShareFragment from 'v2/components/BlockLightbox/components/BlockLightboxShare/fragments/blockLightboxShare'

import Box from 'v2/components/UI/Box'
import CopyToClipboard from 'v2/components/UI/CopyToClipboard'

const Container = styled(Box)`
  > a {
    display: block;
  }
`

export default class BlockLightboxShare extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxShareFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = e => {
    e.preventDefault()
    this.setState({ mode: 'active' })
  }

  render() {
    const { mode } = this.state
    const { block } = this.props

    const url = `https://www.are.na${block.shareable_href}`
    const text = block.shareable_title

    return (
      <React.Fragment>
        {mode === 'resting' ? (
          <a href="#" onClick={this.handleClick}>
            Share
          </a>
        ) : (
          <Container mb={6}>
            <CopyToClipboard label="Copy link" value={url} />

            <a
              href={`https://twitter.com/intent/tweet?original_referer=${url}&text=${text}&url=${url}&via=aredotna`}
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              Twitter
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              Facebook
            </a>
          </Container>
        )}
      </React.Fragment>
    )
  }
}
