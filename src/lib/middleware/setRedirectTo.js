const DEFAULT_PATH = '/'

const SPECIAL_CASE_PATHS = [
  [/^\/sign_up$/, '/welcome'],
  [/^\/register\/\w+$/, '/welcome'],
]

const tail = xs => xs && xs[1]

export default (req, res, next) => {
  const REDIRECT_TO =
    req.query['redirect-to'] ||
    tail(SPECIAL_CASE_PATHS.find(([re, _]) => req.path.match(re))) ||
    DEFAULT_PATH

  res.locals.sd.REDIRECT_TO = REDIRECT_TO

  next()
}
