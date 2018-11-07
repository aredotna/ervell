import url from 'url';
import sharify from 'sharify';
// TODO: Migrate cookies-js to universal-cookie
// https://www.npmjs.com/package/universal-cookie
// `cookie` is a tiny dependency on `universal-cookie`
import cookie from 'cookie';

export default () => {
  const { data: { CURRENT_USER, CURRENT_URL } } = sharify;

  const token = CURRENT_USER && CURRENT_USER.authentication_token;
  const currentRoute = { ...url.parse(CURRENT_URL || window.location.href) };
  const isLoggedIn = !!(CURRENT_USER && CURRENT_USER.id);
  const cookies = cookie.parse(document.cookie);

  return {
    token,
    currentRoute,
    isLoggedIn,
    cookies,
  };
};
