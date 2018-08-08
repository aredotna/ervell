// TODO: Make legible
export default (req, res, next) => {
  const { path } = req;
  const modeRegex = /\/(channels|blocks|users)$/;
  const modeMatch = path.match(modeRegex);

  let mode = 'all';

  if (modeMatch) {
    // eslint-disable-next-line
    mode = modeMatch[1];
  }

  res.locals.sd.MODE = mode;

  return next();
};
