#
# Using ["The Twelve-Factor App"](http://12factor.net/) as a reference all
# environment configuration will live in environment variables. This file
# simply lays out all of those environment variables with sensible defaults
# for development.
#

module.exports =
  NODE_ENV: "development"
  PORT: 4000
  APP_URL: "http://localhost:4000"
  API_BASE: "http://api.are.na"
  GRAPHQL_ENDPOINT: "http://api.are.na/graphql"
  API_URL: "http://api.are.na/v2"
  PUSHER_KEY: '19beda1f7e2ca403abab'
  S3_KEY: null
  S3_SECRET: null
  SESSION_SECRET: '3rv3ll-mAnd1ngo'
  SESSION_COOKIE_MAX_AGE: 31536000000
  SESSION_COOKIE_KEY: 'arena.session'
  BLOG_URL: 'http://posts.are.na'
  COOKIE_DOMAIN: null
  ASSET_PATH: '/assets/'
  IMAGE_PATH: '/images/'
  IMAGE_PROXY_URL: 'http://images.are.na'
  REDIS_URL: null
  GOOGLE_ANALYTICS_ID: null
  STRIPE_PUBLISHABLE_KEY: null
  X_APP_TOKEN: null
  IOS_APP_ID: 1299153149
  ITUNES_LINK: null
  HOMEPAGE_EXPLORE_USER_IDS: "449,3630,11465,9040,52,14031,17886,12341,14364,4094,9935,8743,23,9039,4620,17,4840,10850,5831,128,2471,7249,8565,2424,812,14,15,410,1036,7358,10465"
  ADMIN_SLUGS: 'chris-sherron,charles-broskoski,damon-zucconi,daniel-pianetti,christopher-barley,meg-miller,christina-badal,leo-shaw'

# Override any values with env variables if they exist
for key, val of module.exports
  val = (process.env[key] or val)
  module.exports[key] = try JSON.parse(val) catch then val