import React from 'react'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import { GlobalNavElements } from 'v2/components/GlobalNavElements'

interface TopBarLayoutProps {
  scheme?: 'DEFAULT' | 'GROUP'
  noBanner?: boolean
}

export const TopBarLayout: React.FC<TopBarLayoutProps> = ({
  scheme = 'DEFAULT',
  noBanner,
  children,
  ...rest
}) => {
  return (
    <BlankLayout {...rest}>
      <GlobalNavElements scheme={scheme} noBanner={noBanner} />

      <main>{children}</main>
    </BlankLayout>
  )
}

export default TopBarLayout
