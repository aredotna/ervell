import browser from 'webextension-polyfill'

export default () => {
  let token

  try {
    token = window.localStorage.getItem('authentication_token')
  } catch {
    token = browser.storage.local.get('authentication_token')
  }

  const isLoggedIn = !!token

  return {
    token,
    isLoggedIn,
  }
}
