export default (req, res, next) => {
  const { path } = req;

  let subject;
  let mode = 'channels';

  if (path.match(/\/channels$/)) {
    subject = 'channels';
    mode = 'channels';
  } else if (path.match(/\/blocks$/)) {
    subject = 'blocks';
    mode = 'blocks';
  }

  res.locals.sd.SUBJECT = subject;
  res.locals.sd.MODE = mode;

  return next();
};
