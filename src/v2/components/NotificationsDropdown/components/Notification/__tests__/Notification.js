import React from 'react'
import { shallow } from 'enzyme'

import Notification from '../index'

const mentionNotification = {
  __typename: 'Notification',
  id: 666,
  is_read: true,
  created_at: '2 days ago',
  action: 'mentioned you',
  item_title: 'hey man',
  connector: 'you',
  owner: {
    __typename: 'User',
    label: 'John',
    href: '/user/hey',
  },
  item: {
    __typename: 'Comment',
    body: 'hey @you',
    href: '/block/555',
  },
  target: {
    __typename: 'User',
    label: 'John',
    href: '/john',
  },
}

const commentNotification = {
  __typename: 'Notification',
  id: 666,
  is_read: true,
  created_at: '2 days ago',
  action: 'commented on',
  item_title: 'hey man',
  connector: 'you',
  owner: {
    __typename: 'User',
    label: 'John',
    href: '/user/hey',
  },
  item: {
    __typename: 'Comment',
    body: 'hi bro',
    href: '/block/555',
  },
  target: {
    __typename: 'User',
    label: 'John',
    href: '/john',
  },
}

describe('Notification', () => {
  it('renders for mentioned notifications', () => {
    const wrapper = shallow(<Notification notification={mentionNotification} />)
    expect(wrapper.text()).toEqual(
      expect.stringContaining('mentioned you in a comment')
    )
  })

  it('renders for ordinary comments', () => {
    const wrapper = shallow(<Notification notification={commentNotification} />)
    expect(wrapper.text()).toEqual(expect.stringContaining('said'))
  })
})
