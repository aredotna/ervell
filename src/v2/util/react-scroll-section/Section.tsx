import React, { useMemo, useContext } from 'react'
import { ScrollContext } from './context'

type Props = {
  id: string
  meta?: unknown
  children: React.ReactNode
} & React.HTMLProps<HTMLButtonElement>

const Section = ({ id, children, meta, ...rest }: Props) => {
  const { registerRef } = useContext(ScrollContext)
  const ref = useMemo(() => registerRef({ id, meta }), [id, meta, registerRef])

  return (
    <section {...rest} ref={ref} id={id}>
      {children}
    </section>
  )
}

export default Section
