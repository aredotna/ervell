import SearchComponent from 'react/components/Search';
import HomeComponent from 'react/components/Home';

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
