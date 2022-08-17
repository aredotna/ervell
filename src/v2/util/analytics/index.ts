import * as Fathom from 'fathom-client'

const EVENT_CODES = {
  MONTHLY: 'VYQ1HCEC',
  YEARLY: 'GEB9UYLM',
  PLUS_YEARLY: 'ZZYHEWZN',
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
