import React from 'react';
import PropTypes from 'prop-types';

import Banners from 'react/components/Banners';
import FixedWrapper from 'react/components/UI/FixedWrapper';

const BottomBanner = ({ banner, ...rest }) => {
  if (!banner) return null;

  const Banner = Banners[banner];

  return (
    <FixedWrapper bottom>
      <Banner banner={banner} {...rest} />
    </FixedWrapper>
  );
};

BottomBanner.propTypes = {
  banner: PropTypes.string,
};

BottomBanner.defaultProps = {
  banner: null,
};

export default BottomBanner;
