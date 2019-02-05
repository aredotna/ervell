import React from 'react';

import SmallLink from 'react/components/UserDropdown/components/SecondaryLinks/components/SmallLink';

const signOut = () => {
  window.localStorage.clear();
  window.location.href = '/me/sign_out';
};

export default () => (
  <SmallLink onClick={signOut}>
    Log Out
  </SmallLink>
);
