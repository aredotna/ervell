import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import sharify from 'sharify';

import Head from 'react/components/UI/Head';
import Description from 'react/components/UI/Head/components/Description';

const { data: { IMAGE_PATH } } = sharify;

const BodyStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export default class Blank extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <BodyStyle />

        <Head>
          <meta name="google-site-verification" content="yEDzyeh9dYsQoRw7VJA6X5aVthUCYVTNK6nOUQU1eEE" />
          <meta name="google-site-verification" content="YlzaBIQnBQhN5JFfKeoinJXrTlfdmdtFZ6s8Ez_O8vc" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimal-ui" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <link rel="apple-touch-icon" href={`${IMAGE_PATH}touch-icon-iphone.png`} />
          <link rel="apple-touch-icon" sizes="76x76" href={`${IMAGE_PATH}touch-icon-ipad.png`} />
          <link rel="apple-touch-icon" sizes="120x120" href={`${IMAGE_PATH}touch-icon-iphone-retina.png`} />
          <link rel="apple-touch-icon" sizes="152x152" href={`${IMAGE_PATH}touch-icon-ipad-retina.png`} />

          <meta name="apple-itunes-app" content="app-id=1299153149" />
          <link rel="mask-icon" href={`${IMAGE_PATH}arena-mark.svg" color="black`} />

          <meta name="twitter:site" content="@aredotna" />
        </Head>

        <Description>
          Are.na is a social platform for creative and collaborative research.
        </Description>

        {children}
      </Fragment>
    );
  }
}
