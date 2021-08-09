//
// TODO: replace this entirely
// In the interest of meeting the 8/9 deadline, this was copied wholesale from https://github.com/felix-lunii/react-scroll-section
// It needed modification to work
// Its build script was also broken
// Hence, no fork, no node_modules
// Now it works, but this is gross
// The end.
//

import ScrollingProvider from './ScrollingProvider'
import Section from './Section'
import { useScrollSection, useScrollSections } from './useScrollSection'
import { ScrollContext } from './context'

export {
  ScrollContext,
  Section,
  ScrollingProvider,
  useScrollSection,
  useScrollSections,
}
