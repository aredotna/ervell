import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import passwordResettableUserQuery from 'react/pages/authentication/ResetPasswordPage/queries/passwordResettableUser';

import Title from 'react/components/UI/Head/components/Title';
import Text from 'react/components/UI/Text';
import Icons from 'react/components/UI/Icons';
import CenteringBox from 'react/components/UI/CenteringBox';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ResetPasswordForm from 'react/components/ResetPasswordForm';

export default class ResetPasswordPage extends Component {
  static propTypes = {
    reset_password_token: PropTypes.string.isRequired,
  }

  render() {
    const { reset_password_token } = this.props;

    return (
      <Query query={passwordResettableUserQuery} variables={{ reset_password_token }} ssr={false}>
        {({ loading, error }) => {
          if (loading) {
            return (
              <CenteringBox>
                <LoadingIndicator />
              </CenteringBox>
            );
          }

          if (error) {
            return (
              <CenteringBox p={7} flexDirection="column">
                <Title>
                  Sorry
                </Title>

                <Icons name="ArenaMark" size={7} mb={9} />

                <Text f={5} mb={6}>
                  We’re unable to reset your password.
                </Text>

                <Text f={2} underlineLinks>
                  If you believe this is in error please contact
                  {' '}
                  <a href="mailto:help@are.na">help@are.na</a>
                </Text>
              </CenteringBox>
            );
          }

          return (
            <CenteringBox p={7}>
              <Title>
                Reset your password
              </Title>

              <ResetPasswordForm
                reset_password_token={reset_password_token}
              />
            </CenteringBox>
          );
        }}
      </Query>
    );
  }
}
