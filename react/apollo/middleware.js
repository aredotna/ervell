import { initApolloClient } from 'react/apollo';
import ssr from 'react/apollo/ssr';
import serverData from 'react/apollo/localState/serverData';

export default (req, _res, next) => {
  const client = initApolloClient(serverData(req));

  req.apollo = { client, render: ssr(client) };

  next();
};
