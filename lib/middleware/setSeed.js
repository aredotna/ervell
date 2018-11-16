export default (req, res, next) => {
  const seed = Math.floor(Math.random() * 100000000) + 1;

  res.locals.sd.SEED = seed;
  res.locals.seed = seed;

  return next();
};