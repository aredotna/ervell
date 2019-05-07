import setRedirectTo from 'lib/middleware/setRedirectTo'

describe('setRedirectTo', () => {
  const next = () => {}
  const res = { locals: { sd: {} } }

  describe('no redirect-to query string, no matching path', () => {
    const req = { query: {}, path: '/login' }

    it('sets REDIRECT_TO to the fallback', () => {
      setRedirectTo(req, res, next)
      expect(res.locals.sd.REDIRECT_TO).toEqual('/')
    })
  })

  describe('some redirect-to query string', () => {
    const req = { query: { 'redirect-to': '/foo/bar' } }

    it('sets REDIRECT_TO to the query string value', () => {
      setRedirectTo(req, res, next)
      expect(res.locals.sd.REDIRECT_TO).toEqual('/foo/bar')
    })
  })

  describe('a matching path', () => {
    describe('no query string, and an exact match', () => {
      const req = {
        query: {},
        path: '/sign_up',
      }

      it('falls back to the path matched value', () => {
        setRedirectTo(req, res, next)
        expect(res.locals.sd.REDIRECT_TO).toEqual('/welcome')
      })
    })

    describe('no query string, and an exact match', () => {
      const req = {
        query: {},
        path: '/register/xxx_token_xxx',
      }

      it('falls back to the path matched value', () => {
        setRedirectTo(req, res, next)
        expect(res.locals.sd.REDIRECT_TO).toEqual('/welcome')
      })
    })
  })
})
