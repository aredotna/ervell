import { initApolloClient } from 'react/apollo';
import ssr from 'react/apollo/ssr';

export default (req, res, next) => {
  const X_AUTH_TOKEN = req.user && req.user.get('authentication_token');
  const client = initApolloClient(X_AUTH_TOKEN);

  req.apollo = {
    client,
    render: ssr(client),
  };

  next();
};
