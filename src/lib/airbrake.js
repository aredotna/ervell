import { AIRBRAKE_PROJECT_ID, AIRBRAKE_API_KEY } from 'config.coffee'

const AirbrakeClient = require('airbrake-js')
export const airbrake = new AirbrakeClient({
  projectId: AIRBRAKE_PROJECT_ID,
  projectKey: AIRBRAKE_API_KEY,
})
