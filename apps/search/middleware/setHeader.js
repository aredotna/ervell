import SearchComponent from 'react/components/Search';

export default (req, res, next) => {
  const { SEARCH } = res.locals.sd;

  return req.apollo.render(SearchComponent, {
    search: SEARCH
  })
    .then((searchComponent) => {
      res.locals.searchComponent = searchComponent;
      next();
    })
    .catch(next);
  next();
};
