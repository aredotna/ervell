import React, { memo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { SortableHandle } from 'react-sortable-hoc'

import Icons from 'v2/components/UI/Icons'
import { BoxProps } from 'v2/components/UI/Box'
import { ContextToggle } from 'v2/components/UI/ContextToggle'

const Container = styled(ContextToggle)`
  cursor: ${({ isGrabbing }: { isGrabbing: boolean }) =>
    isGrabbing ? 'grabbing' : 'grab'};
`

export const DragHandle = SortableHandle(
  memo((props: BoxProps) => {
    const [isGrabbing, setGrab] = useState(false)

    const handleMouseDown = useCallback(() => setGrab(true), [])
    const handleMouseUp = useCallback(() => setGrab(false), [])

    return (
      <Container
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        isGrabbing={isGrabbing}
        title="Drag to re-order"
        {...props}
      >
        <Icons name="Drag" color="gray.medium" />
      </Container>
    )
  })
)
