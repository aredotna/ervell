import React from 'react';

import Icons from 'react/components/UI/Icons';
import SmallLink from 'react/components/UserDropdown/components/SecondaryLinks/components/SmallLink';

const signOut = () => {
  window.localStorage.clear();
  window.location.href = '/me/sign_out';
};

export default () => (
  <SmallLink onClick={signOut}>
    <Icons name="Logout" color="gray.medium" mr={4} />
    Log Out
  </SmallLink>
);
