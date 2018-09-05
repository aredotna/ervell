import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'react/components/UserDropdown/components/Link';

const SmallLink = styled(Link).attrs({
  f: 2,
  fontWeight: 'normal',
})`
`;

const SecondaryLinks = ({ isPremium }) => (
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

    {!isPremium &&
      <SmallLink color="state.premium" href="/premium">
        Premium features
      </SmallLink>
    }

    <SmallLink href="/sign_out">
      Log Out
    </SmallLink>
  </div>
);

SecondaryLinks.propTypes = {
  isPremium: PropTypes.bool.isRequired,
};

export default SecondaryLinks;
