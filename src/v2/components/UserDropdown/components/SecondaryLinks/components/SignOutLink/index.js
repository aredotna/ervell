import React from 'react'
import axios from 'axios'

import Icons from 'v2/components/UI/Icons'
import SmallLink from 'v2/components/UserDropdown/components/SecondaryLinks/components/SmallLink'

const signOut = () => {
  window.localStorage.clear()
  axios({
    method: 'POST',
    url: `/me/sign_out`,
  }).then(() => {
    window.location.href = ''
  })
}

export default () => (
  <SmallLink onClick={signOut}>
    <Icons name="Logout" color="gray.medium" mr={4} />
    Log Out
  </SmallLink>
)
