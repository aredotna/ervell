import React from 'react'
import { shallow } from 'enzyme'

import Truncate from '../index'

describe('Truncate', () => {
  it('Escapes godddamn motherfucking ampersands', () => {
    const wrapper = shallow(<Truncate>{`Bonnie &amp; Clyde`}</Truncate>)
    expect(wrapper.text()).toEqual(expect.stringContaining('Bonnie & Clyde'))
  })
})
