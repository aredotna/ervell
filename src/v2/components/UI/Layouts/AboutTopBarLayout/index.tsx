import React from 'react'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import { AboutTopBar } from 'v2/components/AboutTopBar'

export const AboutTopBarLayout = ({
  children,
  ...rest
}: {
  children: React.ReactNode
}) => {
  return (
    <BlankLayout {...rest}>
      <AboutTopBar />

      {children}
    </BlankLayout>
  )
}
