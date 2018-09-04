import React from 'react';
import styled from 'styled-components';

import Link from 'react/components/UserDropdown/components/Link';

const SmallLink = styled(Link).attrs({
  f: 2,
  fontWeight: 'normal',
})`
`;

export default () => (
  <div>
    <SmallLink href="/settings">
      Settings
    </SmallLink>

    <SmallLink href="/tools">
      More tools
    </SmallLink>

    <SmallLink href="/faqs">
      Help / FAQs
    </SmallLink>

    <SmallLink href="/about">
      About
    </SmallLink>

    <SmallLink color="state.premium" href="/premium">
      Premium features
    </SmallLink>

    <SmallLink href="/sign_out">
      Log Out
    </SmallLink>
  </div>
);
