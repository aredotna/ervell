import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import { ChannelBreadcrumb } from 'v2/components/ChannelMetadata/components/ChannelBreadcrumb'
import { ChannelSearchPage_channel } from '__generated__/ChannelSearchPage'
import AdvancedSearchFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import Box from 'v2/components/UI/Box'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import { generateUrlFromVariables } from 'v2/util/tokenizeAdvancedSearch'

interface ChannelMetadataProps {
  channel: ChannelSearchPage_channel
  view?: 'grid' | 'table'
}

export const ChannelSearchMetadata: React.FC<ChannelMetadataProps> = ({
  channel,
  view,
  ...rest
}) => {
  const navigate = useNavigate()
  const { state } = useContext(AdvancedSearchContext)

  useEffect(() => {
    console.log('CHANNEL SEARCH METADATA state', state)
    navigate(generateUrlFromVariables(state.variables), { replace: true })
  }, [state.query])

  return (
    <Box mb={9}>
      <HeaderMetadataContainer
        breadcrumb={<ChannelBreadcrumb channel={channel} />}
        mb={9}
        {...rest}
      >
        <AdvancedSearchFilter />
      </HeaderMetadataContainer>
    </Box>
  )
}

export default ChannelSearchMetadata
