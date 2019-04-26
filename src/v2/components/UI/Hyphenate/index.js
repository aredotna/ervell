import styled from 'styled-components'
import PropTypes from 'prop-types'

import { hyphenate, breakWord } from 'v2/styles/mixins'

const Hyphenate = styled.span`
  ${x => x.hyphenate && hyphenate}
  ${x => x.break && breakWord}
`

Hyphenate.propTypes = {
  hyphenate: PropTypes.bool,
  break: PropTypes.bool,
}

Hyphenate.defaultProps = {
  hyphenate: true,
  break: false,
}

export default Hyphenate
