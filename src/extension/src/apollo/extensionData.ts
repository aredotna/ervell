export default () => {
  const token = window.localStorage.getItem('authentication_token')
  const isLoggedIn = !!token

  return {
    token,
    isLoggedIn,
  }
}
