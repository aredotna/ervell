import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import parseRoute from 'react/util/parseRoute';

import Layout from 'extension/src/components/Layout';
import withLoginStatus from 'react/hocs/WithLoginStatus';

import Login from 'extension/src/components/Login';
import MainMenu from 'extension/src/components/MainMenu';

const Routes = ({ isLoggedIn }) => (
  <Layout>
    <Switch>
      {!isLoggedIn &&
        <Route
          path="/"
          component={Login}
        />
      }

      {isLoggedIn &&
        <Route
          path="/"
          component={MainMenu}
        />
      }

      {/* <Route
        path="/register/:invitation_token"
        render={parseRoute(({ params, query }) => (
          <AcceptInvitationPage
            invitation_token={params.invitation_token}
            raw_invitation_token={query.invite_token}
          />
        ))}
      /> */}
    </Switch>
  </Layout>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withLoginStatus(Routes);
