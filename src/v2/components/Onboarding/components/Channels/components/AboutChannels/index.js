import React from 'react'
import PropTypes from 'prop-types'
import CTAText from 'v2/components/Onboarding/components/UI/CTAText'
import CTAButton from 'v2/components/Onboarding/components/UI/CTAButton'

const AboutChannels = props => {
  const { goForward } = props

  return (
    <div>
      <CTAText>
        Channels are collections of content built around an idea.
      </CTAText>
      <CTAText>
        You can add images, links, PDFs, videos, text, and more.
      </CTAText>
      <CTAButton onClick={goForward}>Got it</CTAButton>
    </div>
  )
}

AboutChannels.propTypes = {
  goForward: PropTypes.func.isRequired,
}

export default AboutChannels
