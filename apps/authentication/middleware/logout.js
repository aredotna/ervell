module.exports = (req, _res, next) => {
  req.logout();
  return next();
};
