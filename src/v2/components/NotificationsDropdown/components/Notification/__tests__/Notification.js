import React from 'react'
import { shallow } from 'enzyme'

import Notification from '../index'

const notification = {
  __typename: 'Notification',
  id: 666,
  is_read: false,
  created_at: '2 days ago',
  action: 'mentioned you',
  item_title: 'hey man',
  connector: 'you',
  owner: {
    __typename: 'User',
    label: 'John',
  },
  item: {
    __typename: 'Comment',
    label: 'hey man',
  },
  target: {
    __typename: 'User',
    label: 'John',
    href: '/john',
  },
}

describe('Notification', () => {
  it('renders without crashing', () => {
    shallow(<Notification notification={notification} />)
  })
})
