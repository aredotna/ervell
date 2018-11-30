import initFeed from 'apps/feed/client/feed';

document.addEventListener('DOMContentLoaded', () =>
  initFeed(document.getElementByClassName('.js-feed')[0]));
