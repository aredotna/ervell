import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'
import Notifications from 'v2/components/NotificationsDropdown/components/Notifications'
import NotificationsDropdown from 'v2/components/NotificationsDropdown'

storiesOf('NotificationsDropdown', module)
  .add('default', () => (
    <Specimen>
      <NotificationsDropdown />
    </Specimen>
  ))
  .add('empty', () => (
    <Specimen>
      <Notifications notifications={[]} />
    </Specimen>
  ))
