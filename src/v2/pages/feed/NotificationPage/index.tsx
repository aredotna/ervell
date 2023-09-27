import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { FeedMetadata } from 'v2/components/FeedMetadata'
import { Feed } from 'v2/components/Feed'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import Title from 'v2/components/UI/Head/components/Title'

import clearNotificationsMutation from 'v2/pages/feed/NotificationPage/mutations/clearNotificationsMutation'

import { clearNotifications } from '__generated__/clearNotifications'
import { FeedType } from '__generated__/globalTypes'

export const NotificationPage: React.FC = () => {
  const [clearNotifications] = useMutation<clearNotifications>(
    clearNotificationsMutation
  )

  useEffect(() => {
    clearNotifications()
  }, [clearNotifications])

  return (
    <ErrorBoundary>
      <Title>Notifications</Title>

      <TopBarLayout>
        <Constrain>
          <FeedMetadata />
          <Feed type={FeedType.NOTIFICATION} />
        </Constrain>
      </TopBarLayout>
    </ErrorBoundary>
  )
}

export default NotificationPage
