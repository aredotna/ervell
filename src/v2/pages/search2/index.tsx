import React from 'react'

import Constrain from 'v2/components/UI/Constrain'
import { AdvancedSearchResultsGrid } from 'v2/components/AdvancedSearch/components/AdvancedSearchResultsGrid'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import AdvancedSearchMetadata from './components/AdvancedSearchMetadata'

export const Search2Page: React.FC = () => {
  return (
    <TopBarLayout>
      <Constrain>
        <AdvancedSearchMetadata />
        <AdvancedSearchResultsGrid />
      </Constrain>
    </TopBarLayout>
  )
}
