import { useContext } from 'react'
import { ScrollContext } from './context'

export const useScrollSection = (id: string) => {
  const { scrollTo, selected: selectedSection } = useContext(ScrollContext)
  const onClick = () => scrollTo(id)
  const selected = selectedSection === id

  return { onClick, selected }
}

export const useScrollSections = () => {
  const { scrollTo, selected: selectedSection, refs, meta } = useContext(
    ScrollContext
  )

  const sections = Object.keys(refs).map(id => ({
    id,
    meta: meta[id],
    onClick: () => scrollTo(id),
    selected: selectedSection === id,
  }))

  return sections
}
