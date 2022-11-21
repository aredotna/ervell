import React from 'react'
import { ContentfulContent } from 'v2/components/ContentfulContent'
import { FONT_SIZES } from 'v2/styles/text'
import { AboutPageContents_aboutPage_businessModelAndPosition_businessModelContent } from '__generated__/contentful/AboutPageContents'

interface Props {
  content?: AboutPageContents_aboutPage_businessModelAndPosition_businessModelContent
}

export const BusinessModelAndPosition: React.FC<Props> = ({ content }) => {
  return (
    <>
      <ContentfulContent
        defaultFontSize={FONT_SIZES.home.lg}
        content={content?.json}
        boldLinks={true}
        underlineLinks={false}
      />
    </>
  )
}

export default BusinessModelAndPosition
