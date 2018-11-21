import sharify from 'sharify';

const { data: { APP_URL } } = sharify;

export default (req, res, next) => {
  if (req.query.sort && req.query.sort === 'RANDOM' && !req.query.seed) {
    const seed = Math.floor(Math.random() * 100000000) + 1;
    return res.redirect(301, `${APP_URL}${req.url}&seed=${seed}`);
  }
  return next();
};
