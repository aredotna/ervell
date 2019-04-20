import React from 'react';
import PropTypes from 'prop-types';

import Head from 'react/components/UI/Head';

const Image = ({ children: image_url }) => (
  <Head>
    <meta property="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image_url} />
    <meta property="og:image" content={image_url} />
  </Head>
);

Image.propTypes = {
  children: PropTypes.string,
};

Image.defaultProps = {
  children: null,
};

export default Image;
