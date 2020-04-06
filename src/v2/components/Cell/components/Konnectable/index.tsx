import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { height, width, space } from 'styled-system'
import { Link } from 'react-router-dom'

import openBlockLightbox from 'v2/util/openBlockLightbox'
import { touch as isTouchDevice } from 'v2/util/is'

import { KonnectableCell as KonnectableCellData } from '__generated__/KonnectableCell'
import { Mode } from 'v2/components/Cell/components/Konnectable/types'

import { preset } from 'v2/styles/functions'
import constants from 'v2/styles/constants'

import Text from 'v2/components/UI/Text'
import { KonnectableDisplay } from 'v2/components/Cell/components/Konnectable/components/KonnectableDisplay'
import KonnectableMetadata from 'v2/components/Cell/components/Konnectable/components/KonnectableMetadata'
import KonnectableBlockOverlay from 'v2/components/Cell/components/Konnectable/components/KonnectableBlockOverlay'
import KonnectableChannelOverlay from 'v2/components/Cell/components/Konnectable/components/KonnectableChannelOverlay'

const Container = styled(Link)`
  box-sizing: border-box;
  position: relative;
  display: block;
  text-decoration: none;
  background-color: white;
  user-select: none;
  ${preset(width, { width: constants.blockWidth })}
  ${preset(height, { height: constants.blockWidth })}
  ${preset(space, { mb: 8 })}
`

const Comments = styled(Text).attrs({
  mr: 6,
  mb: 6,
  px: 5,
  py: 3,
  f: 2,
})`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.utility.translucent};
  z-index: 1;
  border-radius: ${constants.radii.subtle};
`

interface ContextProps {
  __typename: string
  id: number
}

interface Props {
  konnectable: KonnectableCellData
  context: ContextProps[]
  isPreviewable: boolean
  onOverlay?: () => any
  onOverlayClose?: () => any
  children?: React.ReactNode
}

interface State {
  mode: Mode
}

export class Konnectable extends PureComponent<Props> {
  static defaultProps = {
    context: [],
    isPreviewable: true,
  }

  state: Readonly<State> = {
    mode: Mode.RESTING,
  }

  onMouseEnter = () => {
    if (this.state.mode === Mode.OVERLAY || isTouchDevice()) return
    this.setState({ mode: Mode.HOVER })
  }

  onMouseLeave = () => {
    if (this.state.mode === Mode.OVERLAY || isTouchDevice()) return
    this.setState({ mode: Mode.RESTING })
  }

  onOverlay = () => {
    this.setState({ mode: Mode.OVERLAY })
    const { onOverlay } = this.props
    onOverlay && onOverlay()
  }

  onOverlayClose = () => {
    this.setState({ mode: Mode.HOVER })
    const { onOverlayClose } = this.props
    onOverlayClose && onOverlayClose()
  }

  openBlock = (e: React.MouseEvent<HTMLElement>) => {
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
    const { konnectable, isPreviewable, children, context } = this.props

    return (
      <Container
        // to={mode !== Mode.OVERLAY ? konnectable.href : undefined}
        to={{
          pathname: mode !== Mode.OVERLAY ? konnectable.href : undefined,
          state: {
            background:
              mode !== Mode.OVERLAY ? JSON.stringify(location) : undefined,
            context,
          },
        }}
        role="button"
        tabIndex={0}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        data-id={konnectable.id}
        data-no-instant={
          konnectable.__typename === 'Channel' ? undefined : true
        }
      >
        {children && children}

        {konnectable.__typename !== 'Channel' &&
          konnectable.counts.comments > 0 &&
          mode !== Mode.OVERLAY && (
            <Comments>{konnectable.counts.comments}</Comments>
          )}

        <KonnectableDisplay mode={mode} konnectable={konnectable} />

        {konnectable.__typename !== 'Channel' && (
          <KonnectableMetadata mode={mode} konnectable={konnectable} />
        )}

        {konnectable.__typename !== 'Channel' && mode !== Mode.RESTING && (
          <KonnectableBlockOverlay
            konnectable={konnectable}
            onOverlay={this.onOverlay}
            onClose={this.onOverlayClose}
          />
        )}

        {konnectable.__typename === 'Channel' && mode !== Mode.RESTING && (
          <KonnectableChannelOverlay
            channel={konnectable}
            onOverlay={this.onOverlay}
            onClose={this.onOverlayClose}
            isPreviewable={isPreviewable}
          />
        )}
      </Container>
    )
  }
}
