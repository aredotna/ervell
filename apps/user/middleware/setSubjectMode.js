export default (req, res, next) => {
  const { path } = req;

  let subject;
  let mode = 'all';

  if (path.match(/\/channels$/)) {
    subject = 'channels';
    mode = 'channels';
  } else if (path.match(/\/blocks$/)) {
    subject = 'blocks';
    mode = 'blocks';
  } else if (path.match(/\/index$/)) {
    subject = 'index';
    mode = 'index';
  } else if (path.match(/\/following$/)) {
    mode = 'following';
  } else if (path.match(/\/followers$/)) {
    mode = 'followers';
  }

  res.locals.sd.SUBJECT = subject;
  res.locals.sd.MODE = mode;

  return next();
};
