import * as Fathom from 'fathom-client'

const EVENT_CODES = {
  MONTHLY: 'OBXRH7LQ',
  YEARLY: 'MARIM8F8',
  PLUS_YEARLY: 'GXL9W0MB',
}

export default {
  // Specifies a `hitType` of event and sensibly formats payload object
  event(key: string, value: number): void {
    const code = EVENT_CODES[key]
    console.log('Tracking Goal', { code, value })
    return Fathom.trackGoal(code, value)
  },

  trackPageView(params = {}) {
    return Fathom.trackPageview(params)
  },

  initializePage() {
    Fathom.load('CSKXORCZ', {
      url: 'https://fl.are.na/script.js',
      honorDNT: true,
      excludedDomains: ['staging.are.na'],
      canonical: false,
      auto: false,
    })
  },
}
