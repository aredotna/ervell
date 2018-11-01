import url from 'url';
import sharify from 'sharify';

export default () => {
  const { data: { CURRENT_USER, CURRENT_URL } } = sharify;

  const token = CURRENT_USER && CURRENT_USER.authentication_token;
  const currentRoute = { ...url.parse(CURRENT_URL || window.location.href) };
  const isLoggedIn = !!(CURRENT_USER && CURRENT_USER.id);

  // TODO: Better method of this:
  const pairs = document.cookie.split(';');
  const cookies = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    cookies[(`${pair[0]}`).trim()] = unescape(pair[1]);
  }

  return {
    token,
    currentRoute,
    isLoggedIn,
    cookies,
  };
};
