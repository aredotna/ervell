import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import {
  GenericButtonLink,
  mixin as buttonMixin,
  buttonColor,
  BUTTON_BORDER_RADIUS,
  buttonPadding,
} from 'v2/components/UI/GenericButton'
import FollowButton from 'v2/components/FollowButton'
import MessageButton from 'v2/components/MessageButton'
import ButtonGroup from 'v2/components/UI/ButtonGroup'
import Modal from 'v2/components/UI/Modal'
import ManageGroup from 'v2/components/ManageGroup'
import Icons from 'v2/components/UI/Icons'
import Overlay from 'v2/components/UI/Overlay'
import Box from 'v2/components/UI/Box'

import { ProfileMetadataActions as ProfileMetadataActionsType } from '__generated__/ProfileMetadataActions'
import VerticalButtonGroup from 'v2/components/UI/VerticalButtonGroup'
import { MuteProfileButton } from './components/ProfileMuteButton'
import { ProfileRestrictButton } from './components/ProfileRestrictButton'

const Button = styled(GenericButtonLink)`
  ${buttonMixin}
`

const PremiumButton = styled(Button)`
  color: ${x => x.theme.colors.state.premium};
`

const IdentifiableFollowButton = styled(FollowButton)`
  ${buttonMixin}
`

const MenuButton = styled(GenericButtonLink)`
  border-width: 1px !important;
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

const UserMessageButton = styled(MessageButton).attrs({
  f: 1,
})`
  ${buttonMixin}
  ${itemMixin}
`

const MuteButton = styled(MuteProfileButton).attrs({ f: 1 })`
  ${itemMixin}
`

const RestrictButton = styled(ProfileRestrictButton).attrs({ f: 1 })`
  ${itemMixin}
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
  border-radius: ${BUTTON_BORDER_RADIUS};
  ${buttonColor};
`

interface ProfileMetadataActionsProps {
  identifiable: ProfileMetadataActionsType
}

export const ProfileMetadataActions: React.FC<ProfileMetadataActionsProps> = ({
  identifiable,
}) => {
  const [mode, setMode] = useState<'resting' | 'open' | 'closing'>('resting')
  const ref = useRef(null)

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

  const openManageGroupModal = useCallback(
    e => {
      e.preventDefault()
      const { id } = identifiable
      new Modal(ManageGroup, {
        id,
        onSuccess: res => {
          const {
            data: {
              update_group: {
                group: { href },
              },
            },
          } = res
          // Slug may have changed so redirect
          window.location = href
        },
      }).open()
    },
    [identifiable]
  )

  return (
    <>
      <ButtonGroup f={1}>
        {identifiable.__typename === 'User' && identifiable.can.message && (
          <IdentifiableFollowButton
            id={identifiable.id}
            type={identifiable.__typename.toUpperCase()}
          >
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
          </IdentifiableFollowButton>
        )}

        {identifiable.__typename === 'User' && identifiable.can.manage && (
          <Button href="/settings">
            <Icons name="Cog" size="1rem" mr={4} color="gray.medium" />
            Settings
          </Button>
        )}

        {identifiable.__typename === 'Group' &&
          (identifiable.can.manage || identifiable.can.manage_users) && (
            <Button onClick={openManageGroupModal}>
              <Icons name="Pencil" size="1rem" mr={4} color="gray.medium" />
              Edit group
            </Button>
          )}

        {identifiable.__typename === 'Group' &&
          identifiable.can.manage &&
          identifiable.is_upgradeable && (
            <PremiumButton href="/settings/group_billing">
              <Icons
                name="Medallion"
                size="1rem"
                mr={4}
                color="state.premium"
              />
              Upgrade
            </PremiumButton>
          )}

        {identifiable.__typename === 'Group' && identifiable.can.follow && (
          <IdentifiableFollowButton
            id={identifiable.id}
            type={identifiable.__typename.toUpperCase()}
          >
            {({ isFollowed }) =>
              ({
                true: 'Unfollow',
                false: 'Follow',
              }[isFollowed])
            }
          </IdentifiableFollowButton>
        )}

        {identifiable.__typename === 'User' && identifiable.can.follow && (
          <MenuButton onClick={handleClick} ref={ref}>
            ...
          </MenuButton>
        )}
      </ButtonGroup>

      {mode == 'open' && identifiable.__typename == 'User' && (
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
              <MuteButton id={identifiable.id.toString()} />
              <RestrictButton
                id={identifiable.id.toString()}
                name={identifiable.name}
              />
              <UserMessageButton
                id={identifiable.id}
                type={identifiable.__typename.toUpperCase()}
                title={`Clicking this creates a collaborative channel between you and ${identifiable.name}`}
              >
                {({ mode }) => (
                  <React.Fragment>
                    {
                      {
                        resting: 'Start private channel',
                        working: 'Creating...',
                        redirecting: 'Creating...',
                        error: 'Error',
                      }[mode]
                    }
                  </React.Fragment>
                )}
              </UserMessageButton>
            </VerticalButtonGroup>
          </Inner>
        </Overlay>
      )}
    </>
  )
}

export default ProfileMetadataActions
