import React, { CSSProperties, useEffect, useRef, useState } from 'react'

export function Sticky({
  position,
  stuckClasses = '',
  unstuckClasses = '',
  stuckStyles = {},
  unstuckStyles = {},
  children,
  positionValue = -1,
}) {
  const [stuck, setStuck] = useState(false)
  const ref = useRef<HTMLDivElement>()

  const classes = stuck ? stuckClasses : unstuckClasses
  const styles = stuck ? stuckStyles : unstuckStyles

  const inlineStyles: CSSProperties = {
    position: 'sticky',
    [position]: positionValue,
    ...styles,
  }

  useEffect(() => {
    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      ([e]) => {
        return setStuck(e.intersectionRatio < 1)
      },
      { threshold: [1], rootMargin: '40px' }
    )
    observer.observe(cachedRef)
    return () => observer.unobserve(cachedRef)
  }, [ref])

  return (
    <div style={inlineStyles} className={classes} ref={ref}>
      {children}
    </div>
  )
}
