import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sharify from 'sharify';

import Head from 'v2/components/UI/Head';
import Title from 'v2/components/UI/Head/components/Title';
import CenteringBox from 'v2/components/UI/CenteringBox';
import RegistrationForm from 'v2/components/RegistrationForm';

const {
  data: { RECAPTCHA_SITE_KEY },
} = sharify;

export default class RegistrationPage extends Component {
  static propTypes = {
    selected: PropTypes.oneOf(['basic', 'premium']),
  };

  static defaultProps = {
    selected: 'basic',
  };

  state = {
    validation_token: null,
  };

  componentDidMount() {
    window.onRecaptchaLoad = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: 'homepage' })
          .then(validation_token => this.setState({ validation_token }));
      });
    };
  }

  render() {
    const { validation_token } = this.state;
    const { selected } = this.props;

    return (
      <CenteringBox p={7}>
        <Head>
          <script
            src={`https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=${RECAPTCHA_SITE_KEY}`}
          />
        </Head>

        <Title>Join</Title>

        <RegistrationForm
          validation_token={validation_token}
          selected={selected}
        />
      </CenteringBox>
    );
  }
}
