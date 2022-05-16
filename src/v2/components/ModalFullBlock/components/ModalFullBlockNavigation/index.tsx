import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Mousetrap from 'mousetrap'

import Link from 'v2/components/UI/Link'
import Icons from 'v2/components/UI/Icons'

import modalFullBlockQuery from 'v2/components/ModalFullBlock/queries/modalFullBlock'
import { useApolloClient } from '@apollo/client'

const Prev = styled(Link).attrs({
  p: 3,
})`
  svg path {
    fill: ${props => props.theme.colors.gray.semiBold};
    cursor: pointer;
  }

  &:hover {
    svg path {
      fill: ${props => props.theme.colors.gray.bold};
    }
  }
`

const Next = styled(Prev)``

interface ModalFullBlockNavigationProps {
  id: string
  ids: string[]
  onChange: (id: string) => void
}

export const ModalFullBlockNavigation: React.FC<ModalFullBlockNavigationProps> = ({
  id,
  ids,
  onChange,
  ...rest
}) => {
  const client = useApolloClient()

  const [cursor, setCursor] = useState(ids.indexOf(id))

  const next = useCallback(() => {
    return ids[cursor >= ids.length - 1 ? 0 : cursor + 1]
  }, [ids, cursor, id])

  const prev = useCallback(() => {
    return ids[cursor <= 0 ? ids.length - 1 : cursor - 1]
  }, [ids, cursor, id])

  const preload = useCallback(
    (direction: 'next' | 'prev') => {
      const prospectiveId = direction == 'next' ? next() : prev()

      client.query({
        query: modalFullBlockQuery,
        variables: { id: prospectiveId },
      })
    },
    [client]
  )

  const goPrev = useCallback(
    e => {
      e.preventDefault()

      const prevId = prev()
      return onChange(prevId)
    },
    [onChange, next]
  )

  const goNext = useCallback(
    e => {
      e.preventDefault()

      const nextId = next()
      return onChange(nextId)
    },
    [onChange, next]
  )

  useEffect(() => {
    Mousetrap.bind('left', goPrev)
    Mousetrap.bind('right', goNext)

    setCursor(ids.indexOf(id))

    return () => {
      Mousetrap.unbind('left')
      Mousetrap.unbind('right')
    }
  }, [id, ids, goPrev, goNext])

  return (
    <>
      <Prev onClick={goPrev} onMouseOver={() => preload('prev')} {...rest}>
        <Icons name="ArrowPrev" size="1.2rem" color="gray.medium" />
      </Prev>

      <Next onClick={goNext} {...rest}>
        <Icons name="ArrowNext" size="1.2rem" color="gray.medium" />
      </Next>
    </>
  )
}

export default ModalFullBlockNavigation
