import { initApolloClient } from 'v2/apollo'
import ssr from 'v2/apollo/ssr'
import serverData from 'v2/apollo/localState/serverData'

export default (req, res, next) => {
  const client = initApolloClient(serverData(req, res))

  console.log('IN THE APOLLO MIDDLEWARE!!!!!')

  req.apollo = { client, render: ssr(client) }

  next()
}
