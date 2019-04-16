import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import parseRoute from 'react/util/parseRoute';

import Extension from 'extension/src/components/Extension';
import Layout from 'extension/src/components/Layout';
import withLoginStatus from 'react/hocs/WithLoginStatus';

import Login from 'extension/src/components/Login';
import MainMenu from 'extension/src/components/MainMenu';
import Blocks from 'extension/src/components/Blocks';

const Routes = ({ isLoggedIn }) => (
  <Extension>
    <Layout>
      <Switch>
        {!isLoggedIn &&
          <Route
            path="/"
            component={Login}
          />
        }

        {isLoggedIn &&
          <React.Fragment>
            <Route
              path="/blocks"
              component={Blocks}
            />
            <Route
              exact
              path="/index.html"
              render={parseRoute(({ query }) => {
                // if we have a type, go ahead and show the blocks component
                if (query.type) {
                  return (<Blocks />);
                }

                return (
                  <MainMenu url={query.url} />
                );
              })}
            />
          </React.Fragment>
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
  </Extension>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withLoginStatus(Routes);
