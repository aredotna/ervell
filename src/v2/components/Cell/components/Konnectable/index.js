import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'

import openBlockLightbox from 'v2/util/openBlockLightbox'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

import constants from 'v2/styles/constants'

import Typography from 'v2/components/UI/Text'

import Attachment from 'v2/components/Cell/components/Konnectable/components/Attachment'
import Channel from 'v2/components/Cell/components/Konnectable/components/Channel'
import Embed from 'v2/components/Cell/components/Konnectable/components/Embed'
import Image from 'v2/components/Cell/components/Konnectable/components/Image'
import Link from 'v2/components/Cell/components/Konnectable/components/Link'
import Text from 'v2/components/Cell/components/Konnectable/components/Text'
import PendingBlock from 'v2/components/Cell/components/Konnectable/components/PendingBlock'
import Metadata from 'v2/components/Cell/components/Konnectable/components/Metadata'
import BlokkOverlay from 'v2/components/Cell/components/Konnectable/components/BlokkOverlay'
import ChannelOverlay from 'v2/components/Cell/components/Konnectable/components/ChannelOverlay'

const BlokkMetadata = styled(Metadata)``

const Container = styled.a`
  box-sizing: border-box;
  position: relative;
  display: block;
  text-decoration: none;
  width: ${x => x.theme.constantValues.blockWidth};
  height: ${x => x.theme.constantValues.blockWidth};
  margin-bottom: ${x => x.theme.space[8]};
`

const Comments = styled(Typography).attrs({
  mr: 6,
  mb: 6,
  px: 5,
  py: 3,
  f: 2,
})`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${x => x.theme.colors.utility.translucent};
  z-index: 1;
  border-radius: ${constants.radii.subtle};
`

export default class Konnectable extends PureComponent {
  static propTypes = {
    konnectable: propType(konnectableCellFragment).isRequired,
    context: PropTypes.arrayOf(
      PropTypes.shape({
        __typename: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
    isPreviewable: PropTypes.bool,
  }

  static defaultProps = {
    context: [],
    isPreviewable: true,
  }

  state = {
    mode: 'resting',
  }

  onMouseEnter = () => {
    if (this.state.mode === 'overlay') return
    this.setState({ mode: 'hover' })
  }

  onMouseLeave = () => {
    if (this.state.mode === 'overlay') return
    this.setState({ mode: 'resting' })
  }

  onOverlay = () => this.setState({ mode: 'overlay' })

  onOverlayClose = () => this.setState({ mode: 'hover' })

  openBlock = e => {
    const {
      konnectable: { __typename, id },
      context,
    } = this.props

    if (e.metaKey || e.ctrlKey || __typename === 'Channel') return null

    e.preventDefault()

    return openBlockLightbox({
      id,
      context,
    })
  }

  render() {
    const { mode } = this.state
    const { konnectable, isPreviewable } = this.props

    return (
      <Container
        href={mode !== 'overlay' ? konnectable.href : undefined}
        role="button"
        tabIndex={0}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.openBlock}
        data-id={konnectable.id}
      >
        {konnectable.counts.comments > 0 && mode !== 'overlay' && (
          <Comments>{konnectable.counts.comments}</Comments>
        )}

        {[
          {
            Attachment: () => (
              <Attachment
                key="attachment"
                attachment={konnectable}
                mode={mode}
              />
            ),
            Channel: () => (
              <Channel key="channel" channel={konnectable} mode={mode} />
            ),
            Embed: () => <Embed key="embed" embed={konnectable} mode={mode} />,
            Image: () => <Image key="image" image={konnectable} mode={mode} />,
            Link: () => <Link key="link" link={konnectable} mode={mode} />,
            Text: () => <Text key="text" text={konnectable} mode={mode} />,
            PendingBlock: () => (
              <PendingBlock key="text" mode={mode} block={konnectable} />
            ),
          }[konnectable.__typename](),

          konnectable.__typename !== 'Channel' && (
            <BlokkMetadata
              key="metadata"
              mode={mode}
              konnectable={konnectable}
            />
          ),

          konnectable.__typename !== 'Channel' && mode !== 'resting' && (
            <BlokkOverlay
              key="overlay"
              konnectable={konnectable}
              onOverlay={this.onOverlay}
              onClose={this.onOverlayClose}
            />
          ),

          konnectable.__typename === 'Channel' && mode !== 'resting' && (
            <ChannelOverlay
              key="overlay"
              channel={konnectable}
              onOverlay={this.onOverlay}
              onClose={this.onOverlayClose}
              isPreviewable={isPreviewable}
            />
          ),
        ]}
      </Container>
    )
  }
}
