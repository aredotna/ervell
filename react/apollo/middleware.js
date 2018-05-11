import url from 'url';

import { initApolloClient } from 'react/apollo';
import ssr from 'react/apollo/ssr';

export default (req, res, next) => {
  const client = initApolloClient({
    token: req.user && req.user.get('authentication_token'),
    url: req.url,
    path: url.parse(req.url).pathname,
  });

  req.apollo = {
    client,
    render: ssr(client),
  };

  next();
};
