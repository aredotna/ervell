import * as Fathom from 'fathom-client'

export default {
  // Specifies a `hitType` of event and sensibly formats payload object
  event(code, value) {
    trackGoal(code, value)
  },

  trackPageView(params = {}) {
    console.log('trackPageView', window.location.pathname)
    Fathom.trackPageview()
  },

  initializePage() {
    Fathom.load('CSKXORCZ', {
      honorDNT: true,
      excludedDomains: ['staging.are.na'],
      canonical: false,
      auto: false,
    })
  },
}
