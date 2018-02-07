import { any, map, bind } from 'underscore';

export default blacklist => {
  return {
    currentPath: function() {
      return location.pathname;
    },

    currentRoute: function() {
      return this.currentPath().replace(/\/$/, '');
    },

    test: function(pattern) {
      return new RegExp(pattern).test(this.currentRoute());
    },

    isCurrentRouteBlacklisted: function() {
      return any(map(blacklist, bind(this.test, this)));
    }
  };
};
