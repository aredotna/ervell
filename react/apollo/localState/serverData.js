import url from 'url';

export default (req) => {
  const { url: currentUrl, user, cookies } = req;

  const token = user && user.get('authentication_token');
  const currentRoute = { ...url.parse(currentUrl) };
  const isLoggedIn = !!(user && user.id);

  return {
    token,
    currentRoute,
    isLoggedIn,
    cookies,
  };
};
