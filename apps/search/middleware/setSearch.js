import { remove as removeDiacritics } from 'diacritics';

export default (req, res, next) => {
  const q = removeDiacritics(req.params.query);
  res.locals.sd.SEARCH = q;

  return next();
};
