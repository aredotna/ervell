import React, { useState, useCallback, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Mousetrap from 'mousetrap'
import { debounce } from 'underscore'

import { BREAKPOINTS } from 'v2/styles/constants'

import Box from 'v2/components/UI/Box'
import Link from 'v2/components/UI/Link'
import Icons from 'v2/components/UI/Icons'
import Close from 'v2/components/UI/Close'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import BlockLightbox from 'v2/components/BlockLightbox'
import ModalBlockLightboxNavigation from 'v2/components/ModalBlockLightbox/components/ModalBlockLightboxNavigation'

import modalBlockLightboxQuery from 'v2/components/ModalBlockLightbox/queries/modalBlockLightbox'
import {
  ModalBlockLightbox as ModalBlockLightboxQuery,
  ModalBlockLightboxVariables,
  ModalBlockLightbox_block,
} from '__generated__/ModalBlockLightbox'

const Fullscreen = styled(Link).attrs({
  border: '1px solid',
})`
  cursor: pointer;
  border-radius: ${props => props.theme.radii.subtle};
  user-select: none;

  &:hover {
    border-color: ${props => props.theme.colors.gray.bold};
    svg {
      fill: ${props => props.theme.colors.gray.bold};
    }
  }
`

type ModalBlockLightboxLayoutType = 'DEFAULT' | 'FULLSCREEN'

interface ModalBlockLightboxInnerProps {
  error?: any
  loading?: boolean
  block?: ModalBlockLightbox_block
  id: number
  ids?: string[]
  layout: ModalBlockLightboxLayoutType
}

const ModalBlockLightboxInner: React.FC<ModalBlockLightboxInnerProps> = ({
  loading,
  error,
  block,
  id,
  ids,
  layout,
}) => {
  const history = useHistory()
  const { state } = useLocation()

  const [currentId, setCurrentId] = useState<number>(id)

  const updateId = useCallback(
    newId => {
      history.push({
        pathname: `/block/${newId}`,
        state,
      })
      setCurrentId(newId)
    },
    [history, state]
  )

  if (loading) {
    return (
      <Box position="relative" width="100%" height="100%">
        <LoadingIndicator />
      </Box>
    )
  }

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  return (
    <BlockLightbox block={block} context="MODAL" layout={layout}>
      {ids.length > 1 && (
        <ModalBlockLightboxNavigation
          id={currentId}
          ids={ids}
          onChange={updateId}
        />
      )}
    </BlockLightbox>
  )
}

interface ModalBlockLightboxProps {
  id: number
  ids?: string[]
}

export const ModalBlockLightbox: React.FC<ModalBlockLightboxProps> = ({
  id,
  ids,
}) => {
  //
  // Handle data for block
  //
  const { data, loading, error } = useQuery<
    ModalBlockLightboxQuery,
    ModalBlockLightboxVariables
  >(modalBlockLightboxQuery, { variables: { id: id.toString() } })

  //
  // Handle toggling layout modes
  //
  const [layout, setLayout] = useState<ModalBlockLightboxLayoutType>('DEFAULT')

  const toggleLayout = useCallback(() => {
    const newLayout = layout === 'DEFAULT' ? 'FULLSCREEN' : 'DEFAULT'
    setLayout(newLayout)
  }, [setLayout, layout])

  //
  // Handle route navigation, forward backward and close
  //
  const history = useHistory()
  const location = useLocation()
  const background = location.state && JSON.parse(location.state.background)

  const onClose = useCallback(() => {
    history.push(background.pathname, { preventScroll: true })
  }, [background, history])

  //
  // Handle key binding and window resizing
  //

  const checkMobileBreakpoint = useCallback(() => {
    if (layout === 'FULLSCREEN' && window.innerWidth <= BREAKPOINTS.mobile) {
      setLayout('DEFAULT')
    }
  }, [layout])

  const debouncedCheckMobileBreakpoint = debounce(checkMobileBreakpoint, 250)

  useEffect(() => {
    Mousetrap.bind('esc', onClose)

    window.addEventListener('resize', debouncedCheckMobileBreakpoint)

    return () => {
      Mousetrap.unbind('esc')
    }
  }, [onClose, debouncedCheckMobileBreakpoint])

  //
  // Render component
  //

  return (
    <Box position="relative" width="100%" height="100%">
      <ModalBlockLightboxInner
        loading={loading}
        error={error}
        block={data && data.block}
        ids={ids}
        layout={layout}
        id={id}
      />
      <Box
        // Hides fullscreen button on mobile
        display={['none', 'block', 'block']}
        position="absolute"
        bottom={0}
        right={0}
        zIndex={1}
        p={7}
      >
        <Fullscreen
          p={4}
          onClick={toggleLayout}
          bg={{ DEFAULT: 'background' }[layout]}
          borderColor={
            {
              DEFAULT: 'gray.semiLight',
              FULLSCREEN: 'gray.semiBold',
            }[layout]
          }
        >
          <Icons
            size="1rem"
            name={
              {
                DEFAULT: 'EnterFullscreen',
                FULLSCREEN: 'ExitFullscreen',
              }[layout]
            }
            color="gray.semiBold"
          />
        </Fullscreen>
      </Box>

      <Close
        size={8}
        py={5}
        px={4}
        thickness="2px"
        onClick={onClose}
        position="absolute"
        top={0}
        right={0}
        zIndex={1}
      />
    </Box>
  )
}
