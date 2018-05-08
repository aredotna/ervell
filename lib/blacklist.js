import { any, map, bind } from 'underscore';

export default blacklist => ({
  currentPath() {
    return window.location.pathname;
  },

  currentRoute() {
    return this.currentPath().replace(/\/$/, '');
  },

  test(pattern) {
    return new RegExp(pattern).test(this.currentRoute());
  },

  isCurrentRouteBlacklisted() {
    return any(map(blacklist, bind(this.test, this)));
  },
});
