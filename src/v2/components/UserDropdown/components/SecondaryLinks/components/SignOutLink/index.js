import React from 'react'

import Icons from 'v2/components/UI/Icons'
import SmallLink from 'v2/components/UserDropdown/components/SecondaryLinks/components/SmallLink'

const signOut = () => {
  window.localStorage.clear()
  window.location.href = '/me/sign_out'
}

export default () => (
  <SmallLink onClick={signOut}>
    <Icons name="Logout" color="gray.medium" mr={4} />
    Log Out
  </SmallLink>
)
