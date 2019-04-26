import url from 'url'

import serializedMe from 'v2/apollo/localState/serializedMe'

export default (req, res) => {
  const { url: currentUrl, user, cookies } = req
  const {
    locals: { sd: sharifyData },
  } = res

  const token = user && user.get('authentication_token')
  const currentRoute = { ...url.parse(currentUrl) }
  const isLoggedIn = !!(user && user.id)

  return {
    token,
    currentRoute,
    isLoggedIn,
    cookies,
    serializedMe: serializedMe(user && user.attributes),
    sharifyData,
  }
}
