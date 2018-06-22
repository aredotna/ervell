import url from 'url';

import { initApolloClient } from 'react/apollo';
import ssr from 'react/apollo/ssr';

export default (req, _res, next) => {
  const currentRoute = { ...url.parse(req.url) };
  const isLoggedIn = !!(req.user && req.user.id);

  const client = initApolloClient({
    token: req.user && req.user.get('authentication_token'),
    currentRoute,
    isLoggedIn,
  });

  req.apollo = {
    client,
    render: ssr(client),
  };

  next();
};
