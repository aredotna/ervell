import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const PageBreakout = styled.div`
  display: block;
  margin-left -4em;
  margin-right: -4em;
`

const WideImage = styled.img`
  max-width: 100%;
`

const WideScreenshot = ({ src }) => (
  <PageBreakout>
    <WideImage src={src} />
  </PageBreakout>
)

WideScreenshot.propTypes = {
  src: PropTypes.string.isRequired,
}

export default WideScreenshot
