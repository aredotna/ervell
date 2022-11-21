import React from 'react'
import { ContentfulContent } from 'v2/components/ContentfulContent'
import { FONT_SIZES } from 'v2/styles/text'
import { AboutPageContents_aboutPage_team_teamDescription } from '__generated__/contentful/AboutPageContents'

interface TeamProps {
  content?: AboutPageContents_aboutPage_team_teamDescription
}

export const TeamInner: React.FC<TeamProps> = ({ content }) => {
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

export default TeamInner
