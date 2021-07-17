import React, {
  memo,
  useState,
  useCallback,
  forwardRef,
  ComponentProps,
  useRef,
  useImperativeHandle,
  useMemo,
} from 'react'
import { SortableElement } from 'react-sortable-hoc'

import { ChannelContentsConnectable as ChannelContentsConnectableData } from '__generated__/ChannelContentsConnectable'

import { touch as isTouchDevice } from 'v2/util/is'

import Cell from 'v2/components/Cell'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import { ConnectableContextMenu } from 'v2/components/ConnectableContextMenu'
import { DragHandle } from 'v2/components/UI/DragHandle'
import { IntersectionObserverBox } from 'v2/components/UI/IntersectionObserverBox'

const SortableGridItem = SortableElement(GridItem, { withRef: true })
const SortableGridItemWithGridItemRef = forwardRef<
  HTMLElement,
  ComponentProps<typeof SortableGridItem>
>((props, ref) => {
  const innerRef = useRef<HTMLElement>()

  const refCallback = useCallback((r: any) => {
    if (!r) {
      return
    }

    const divElement: HTMLElement = r.getWrappedInstance()

    if (!divElement) {
      return
    }

    innerRef.current = divElement
  }, [])

  useImperativeHandle(
    ref,
    () => {
      return innerRef.current
    },
    []
  )

  return <SortableGridItem {...props} ref={refCallback} />
})

interface Props {
  channel: any
  connectable: ChannelContentsConnectableData
  index: number
  context: any[]
  onRemove: ({ id, type }: { id: number; type: string }) => any
  onChangePosition: ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => any
}

export const ChannelContentsItem: React.FC<Props> = memo(
  ({ channel, connectable, index, context, onRemove, onChangePosition }) => {
    const [isHovering, setHover] = useState(false)

    type Ev = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    const startHover = useCallback<Ev>(() => {
      if (isTouchDevice()) return
      setHover(true)
    }, [])
    const endHover = useCallback<Ev>(() => {
      if (isTouchDevice()) return
      setHover(false)
    }, [])

    const handleChangePosition = useCallback(
      (newIndex: number) => onChangePosition({ oldIndex: index, newIndex }),
      [index, onChangePosition]
    )

    const intersectionObserverCallback = useCallback<
      (cellID: number) => (entries: IntersectionObserverEntry[]) => void
    >(
      cellID => entries => {
        for (const entry of entries) {
          console.log(cellID, entry)
        }
      },
      []
    )

    const intersectionObserverOptions = useMemo<IntersectionObserverInit>(
      () => ({ rootMargin: '400px' }),
      []
    )

    if (connectable) {
      const children: React.ReactNode = (
        <Cell.Konnectable
          konnectable={connectable}
          context={context}
          onOverlay={endHover}
          onOverlayClose={startHover}
        >
          {isHovering && (
            <>
              {channel.can.reorder_connections && (
                <DragHandle position="absolute" top={8} left={8} zIndex={1} />
              )}

              <ConnectableContextMenu
                channel={channel}
                connectable={connectable}
                onRemove={onRemove}
                onChangePosition={handleChangePosition}
              />
            </>
          )}
        </Cell.Konnectable>
      )

      return (
        <IntersectionObserverBox
          Component={SortableGridItemWithGridItemRef}
          callback={intersectionObserverCallback}
          id={index}
          options={intersectionObserverOptions}
          componentProps={{
            disabled: !channel.can.reorder_connections,
            index: index,
            onMouseEnter: startHover,
            onMouseLeave: endHover,
            children: children,
          }}
        />
      )
    }

    return (
      <GridItem>
        <Cell.Skeletal />
      </GridItem>
    )
  }
)
