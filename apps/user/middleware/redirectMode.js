const TEMPORARY_REDIRECT_STATUS = 302;

export default (req, res, next) => {
  const filter = req.cookies.filter || 'all';

  const maybeRedirect = (path) => {
    if (req.path === path) return next();
    return res.redirect(TEMPORARY_REDIRECT_STATUS, path);
  };

  switch (filter) {
    case 'all':
      return next();
    case 'channels':
      return maybeRedirect(`/${req.params.id}/channels`);
    case 'index':
      return maybeRedirect(`/${req.params.id}/index`);
    case 'blocks':
      return maybeRedirect(`/${req.params.id}/blocks`);
    default:
      return next();
  }
};
