import sinon from 'sinon';
import rewire from 'rewire';
import ensureWWW from '../ensureWWW';

describe('ensureWWW', () => {
  const next = () => {};
  process.env.APP_URL = 'https://www.are.na';

  describe('non-WWW req', () => {
    const req = { query: {}, url: '/charles-broskoski', get: () => 'are.na' };
    const res = { locals: { sd: { APP_URL: 'https://www.are.na'} }, redirect: sinon.stub() };

    it('redirects to www', () => {
      ensureWWW(req, res, next);
      expect(res.redirect.args[0][0]).toEqual(301);
      expect(res.redirect.args[0][1]).toEqual('https://www.are.na/charles-broskoski');
    });
  });

  describe('WWW req', () => {
    const req = { query: {}, url: '/charles-broskoski', get: () => 'www.are.na' };
    const res = { locals: { sd: { APP_URL: 'https://www.are.na'} }, redirect: sinon.stub() };
    const next = sinon.stub();

    it('does not redirect', () => {
      ensureWWW(req, res, next);
      expect(res.redirect.called).toEqual(false);
      expect(next.called).toEqual(true);
    });
  });
});
