export default (req, res, next) => {
  const sort = req.query.sort || 'updated_at';
  const seed = Math.floor(Math.random() * 100000000) + 1;

  res.locals.sd.SEED = seed;
  res.locals.sd.SORT = sort;

  res.locals.seed = seed;
  res.locals.sort = sort;

  return next();
};
