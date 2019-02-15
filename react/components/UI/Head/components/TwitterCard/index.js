import React from 'react';
import PropTypes from 'prop-types';

import Head from 'react/components/UI/Head';

const TwitterCard = ({ children: images }) => (
  <Head>
    <meta name="twitter:card" content="summary_large_image" />
    {images.length > 0 && images.map(image => (
      <meta property="og:image" content={image} />
    ))}
  </Head>
);

TwitterCard.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TwitterCard;
