// This is sort of a stop gap until we switch over login to be using our GraphQL endpoint.
// We have to map the model directly to the fields we're expecting.

export default (
  user: any
): null | {
  id?: any
  initials?: any
  avatar?: any
  name?: any
  slug?: any
  authentication_token?: any
  is_premium?: any
  is_lifetime_premium?: any
  is_supporter?: any
  hide_notification_count?: any
} => {
  if (!user) return null

  const initials = user.username
    .split(' ')
    .slice(0, 4)
    .map(name => name[0])
    .join('')

  const avatar = user.avatar_image && user.avatar_image.display

  const name = `${user.first_name} ${user.last_name}`

  const hide_notification_count = user.hide_notification_count || false
  const is_lifetime_premium = user.is_lifetime_premium || false
  const is_supporter = user.is_supporter || false

  return {
    id: user.id,
    initials,
    avatar,
    name,
    slug: user.slug,
    authentication_token: user.authentication_token,
    is_premium: user.is_premium,
    is_lifetime_premium,
    is_supporter,
    hide_notification_count,
  }
}
