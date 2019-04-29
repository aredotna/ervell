import React from 'react'
import PropTypes from 'prop-types'
import CTAText from 'v2/components/Onboarding/components/UI/CTAText'
import CTAButton from 'v2/components/Onboarding/components/UI/CTAButton'

const Welcome = props => {
  const { goForward } = props

  return (
    <div>
      <CTAText>Welcome to Are.na!</CTAText>
      <CTAText>Let’s make your first channel.</CTAText>
      <CTAButton onClick={goForward}>Next</CTAButton>
    </div>
  )
}

Welcome.propTypes = {
  goForward: PropTypes.func.isRequired,
}

export default Welcome
