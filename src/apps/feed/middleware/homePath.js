export default (req, res, next) => {
  if (!req.user) return next();

  const path = req.user.get('home_path');

  if ((path != null) && path !== '/') {
    res.redirect(302, path);
  }

  return next();
};
