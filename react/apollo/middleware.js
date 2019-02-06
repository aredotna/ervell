import { initApolloClient } from 'react/apollo';
import ssr from 'react/apollo/ssr';
import serverData from 'react/apollo/localState/serverData';

export default (req, res, next) => {
  const client = initApolloClient(serverData(req, res));

  req.apollo = { client, render: ssr(client) };

  next();
};
