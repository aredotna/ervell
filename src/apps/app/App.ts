import { Router } from 'express'
import apolloMiddleware from '../../v2/apollo/middleware'
import pageResolver from '../../v2/components/UI/Page/resolver'
import withStaticRouter from '../../v2/hocs/WithStaticRouter'
import { Routes } from './Routes'

export const App = Router()

const middlewareStack = [apolloMiddleware]

const resolve = [
  ...middlewareStack,
  (req, res, next) => {
    req.apollo
      .render(withStaticRouter(Routes), null, { mode: 'page' })
      .then(apolloRes => {
        pageResolver({ bundleName: 'app', apolloRes, res })
      })
      .catch(next)
  },
]

App.get('*', ...resolve)
