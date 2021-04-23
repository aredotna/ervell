export default async () => {
  let token

  try {
    const browser = require('webextension-polyfill')
    const value = await browser.storage.local.get('authentication_token')
    token = value.authentication_token
  } catch {
    token = window.localStorage.getItem('authentication_token')
  }

  const isLoggedIn = !!token

  return {
    token,
    isLoggedIn,
  }
}
