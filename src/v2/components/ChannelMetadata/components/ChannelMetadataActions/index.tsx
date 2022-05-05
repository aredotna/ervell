import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import Modal from 'v2/components/UI/Modal'
import Icons from 'v2/components/UI/Icons'
import ManageChannel from 'v2/components/ManageChannel'
import Button, {
  mixin as buttonMixin,
  GenericButtonLink,
  buttonColor,
  buttonPadding,
} from 'v2/components/UI/GenericButton'
import ButtonGroup from 'v2/components/UI/ButtonGroup'
import FollowButton from 'v2/components/FollowButton'
import Overlay from 'v2/components/UI/Overlay'
import VerticalButtonGroup from 'v2/components/UI/VerticalButtonGroup'

import MuteChannelButton from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton'

import { ChannelMetadataActions as ChannelMetadataActionsType } from '__generated__/ChannelMetadataActions'
import Box from 'v2/components/UI/Box'
import { FlagContent } from 'v2/components/FlagContent'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

const ChannelFollowButton = styled(FollowButton)`
  ${buttonMixin}
  min-height: 16px;
`

const MenuButton = styled(GenericButtonLink)`
  border-width: 1px !important;
`

const Inner = styled(Box)`
  width: 10em;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${props => props.theme.colors.background};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  text-align: left;
  ${buttonColor};
`

const itemMixin = `
  font-size: ${props => props.theme.fontSizesIndexed.xs} !important;
  border-width: 1px !important;
  text-align: left;
  justify-content: flex-start;
  ${buttonPadding}
  height: 34px;
  padding-top: 0;
  padding-bottom: 0;
`

const MuteButton = styled(MuteChannelButton).attrs({ f: 1 })`
  ${itemMixin}
`

const FlagButton = styled(FlagContent).attrs({ f: 1 })`
  ${buttonMixin}
  ${itemMixin}
`

interface ChannelMetadataActionsProps {
  channel: ChannelMetadataActionsType
}

export const ChannelMetadataActions: React.FC<ChannelMetadataActionsProps> = ({
  channel,
}) => {
  const ref = useRef(null)
  const [mode, setMode] = useState<'resting' | 'open' | 'closing'>('resting')

  const openEditChannel = useCallback(() => {
    const onUpdate = href => {
      window.location = href
    }

    const modal = new Modal(ManageChannel, { id: channel.id, onUpdate })
    modal.open()
  }, [])

  const handleClick = useCallback(() => {
    if (mode == 'closing') return
    setMode('open')
  }, [])

  const handleClose = useCallback(() => {
    setMode('closing')
    setTimeout(() => {
      setMode('resting')
    }, 100)
  }, [])

  const { id, can } = channel

  return (
    <>
      <ButtonGroup f={1}>
        {channel.can.follow && (
          <ChannelFollowButton id={id} type="CHANNEL">
            {({ isFollowed }) =>
              ({
                true: (
                  <React.Fragment>
                    <Icons
                      name="Unfollow"
                      size="1rem"
                      mr={4}
                      color="gray.medium"
                    />
                    Unfollow
                  </React.Fragment>
                ),
                false: (
                  <React.Fragment>
                    <Icons
                      name="Follow"
                      size="1rem"
                      mr={4}
                      color="gray.medium"
                    />
                    Follow
                  </React.Fragment>
                ),
              }[isFollowed])
            }
          </ChannelFollowButton>
        )}

        {(can.update || can.destroy) && (
          <Button onClick={openEditChannel}>
            <Icons name="Pencil" size="1rem" mr={4} color="gray.medium" />
            Edit channel
          </Button>
        )}

        {(can.follow || can.mute) && (
          <MenuButton onClick={handleClick} ref={ref}>
            <Icons name="Ellipsis" color="gray.semiBold" />
          </MenuButton>
        )}
      </ButtonGroup>

      {mode == 'open' && (can.follow || can.mute) && (
        <Overlay
          onClose={handleClose}
          targetEl={() => ref.current}
          alignToY="bottom"
          alignToX="right"
          anchorY="top"
          anchorX="right"
          offsetY={5}
          offsetX={0}
          marginY={10}
        >
          <Inner>
            <VerticalButtonGroup>
              <MuteButton channel={channel} />
              {!can.update && (
                <FlagButton
                  id={channel.id}
                  type={BaseConnectableTypeEnum.CHANNEL}
                  label="Flag inappropriate"
                />
              )}
            </VerticalButtonGroup>
          </Inner>
        </Overlay>
      )}
    </>
  )
}

export default ChannelMetadataActions
