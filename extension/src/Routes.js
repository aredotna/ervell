import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import parseRoute from 'react/util/parseRoute';

import Extension from 'extension/src/components/Extension';
import withLoginStatus from 'react/hocs/WithLoginStatus';

import Login from 'extension/src/components/Login';
import MainMenu from 'extension/src/components/MainMenu';
import Blocks from 'extension/src/components/Blocks';
import EditBlock from 'extension/src/components/EditBlock';

const Routes = ({ isLoggedIn }) => (
  <Extension>
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
            path="/edit/:id"
            component={EditBlock}
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
    </Switch>
  </Extension>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withLoginStatus(Routes);
