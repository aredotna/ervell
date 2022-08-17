// NOTE: Extend this layout when creating new layouts
// Do not put anything here that cannot be put on any page.

import React, { useEffect } from 'react'

import LegacyDarkTheme from 'v2/components/UI/Layouts/BlankLayout/components/LegacyDarkTheme'
import BaseStyles from 'v2/components/UI/Layouts/BlankLayout/components/BaseStyles'
import Description from 'v2/components/UI/Head/components/Description'

import analytics from 'v2/util/analytics'
import globalKeyboardShortcuts from 'v2/util/globalKeyboardShortcuts'
import { useLocation } from 'react-router'
import PageContextProvider from 'v2/components/PageContext'
import { AdvancedSearchContextProvider } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

export const BlankLayout: React.FC = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    globalKeyboardShortcuts.bind()
    analytics.initializePage()

    return () => {
      globalKeyboardShortcuts.unbind()
    }
  }, [])

  useEffect(() => {
    analytics.trackPageView()
  }, [location.pathname])

  return (
    <PageContextProvider>
      <AdvancedSearchContextProvider>
        <LegacyDarkTheme />
        <BaseStyles />

        <Description>
          Are.na is a platform for connecting ideas and building knowledge.
        </Description>

        {children}
      </AdvancedSearchContextProvider>
    </PageContextProvider>
  )
}

export default BlankLayout
