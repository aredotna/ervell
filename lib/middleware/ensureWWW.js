import { parse } from 'url';
import sharify from 'sharify';


export default (req, res, next) => {
  const { APP_URL } = process.env;
  const appURLisWWW = parse(APP_URL).host.match('www');
  const reqIsNotWWW = !(req.get('host').match('www'));
  
  if (appURLisWWW && reqIsNotWWW) {
    return res.redirect(301, APP_URL + req.url);
  }

  return next();
}