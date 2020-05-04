import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { hyphenate } from 'v2/styles/mixins'

const CollaboratorLink = styled(Link).attrs({
  role: 'button',
})`
  cursor: pointer;
  ${x => x.length > 25 && hyphenate}
`

export default CollaboratorLink
