import sharify from 'sharify';
import Cookies from 'cookies-js';

import CATEGORIES from 'v2/util/analytics/categories';

const {
  data: { NODE_ENV },
} = sharify;

// Wraps the global `ga` exposed by analytics.js
const ga = (...args) => {
  const {
    data: { DO_NOT_TRACK },
  } = sharify;

  if (DO_NOT_TRACK) return null;

  if (!window.ga) {
    console.warn('`ga` is undefined', [...args]);
    return null;
  }

  if (NODE_ENV === 'development') {
    console.info('analytics', [...args]);
    return null;
  }

  return window.ga(...args);
};

export default {
  // Simply calls `ga#send` while observing 'Do Not Track' settings.
  track(params = {}) {
    // TODO: Consider renaming `SAVE` to something more obvious,
    // or just set `DO_NOT_TRACK` explicitly.
    const {
      data: { SAVE },
    } = sharify;

    if (SAVE) {
      // Silently ignores any tracking when inside of bookmarklet/extension context.
      return null;
    }

    return ga('send', params);
  },

  // Specifies a `hitType` of event and sensibly formats payload object
  event(description, params = {}) {
    const category = CATEGORIES[params.category || 'default'];
    const nonInteraction = category.interactive ? 0 : 1;

    return this.track({
      hitType: 'event',
      eventCategory: category.name,
      eventAction: description,
      eventLabel: params.label,
      eventValue: params.value,
      nonInteraction,
    });
  },

  registerCurrentUser({ isLoggedIn, registeredTimestamp }) {
    ga('set', 'dimension1', isLoggedIn);
    if (!registeredTimestamp) return;
    ga('set', 'dimension2', registeredTimestamp);
  },

  pageData() {
    // TODO: Once this is loaded on Group profiles / Channels
    // Hash all of this data before sending it. Should
    // set a variable like `TRACK_PRIVATELY` or something.
    return {
      title: document.title,
      location: window.location.href,
      page: window.location.pathname,
    };
  },

  trackPageView(params = {}) {
    return this.track({
      ...this.pageData(),
      ...params,
      hitType: 'pageview',
    });
  },

  initializePage() {
    const {
      data: { CURRENT_USER },
    } = sharify;
    const isLoggedIn = CURRENT_USER ? 'Logged In' : 'Logged Out';

    this.registerCurrentUser({
      isLoggedIn,
      registeredTimestamp: CURRENT_USER && CURRENT_USER.registered,
    });

    this.trackPageView();

    // Logs this event once per-session
    if (Cookies.get('active_session') !== 'true') {
      Cookies.set('active_session', 'true');

      this.event(`Visited logged ${isLoggedIn ? 'in' : 'out'}`, {
        category: 'funnel',
      });
    }
  },
};
