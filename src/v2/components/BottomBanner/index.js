import React from 'react'
import PropTypes from 'prop-types'

import Banners from 'v2/components/Banners'
import FixedWrapper from 'v2/components/UI/FixedWrapper'

const BottomBanner = ({ banner, ...rest }) => {
  if (!banner) return null

  const Banner = Banners[banner]

  if (!Banner) {
    return <div />
  }

  return (
    <FixedWrapper bottom>
      <Banner banner={banner} {...rest} />
    </FixedWrapper>
  )
}

BottomBanner.propTypes = {
  banner: PropTypes.string,
}

BottomBanner.defaultProps = {
  banner: null,
}

export default BottomBanner
