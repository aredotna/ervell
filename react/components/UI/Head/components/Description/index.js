import React from 'react';
import PropTypes from 'prop-types';

import Head from 'react/components/UI/Head';

const Description = ({ children: description }) => (
  <Head>
    <meta property="description" content={description} />
    <meta name="twitter:description" content={description} />
    <meta property="og:description" content={description} />
  </Head>
);

Description.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Description;
