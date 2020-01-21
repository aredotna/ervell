// import browser from 'webextension-polyfill'

export default async () => {
  let token

  try {
    token = window.localStorage.getItem('authentication_token')
  } catch {
    // const value = await browser.storage.local.get('authentication_token')
    // token = value.authentication_token
  }

  const isLoggedIn = !!token

  return {
    token,
    isLoggedIn,
  }
}
