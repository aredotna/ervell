// This is sort of a stop gap until we switch over login to be using our GraphQL endpoint.
// We have to map the model directly to the fields we're expecting.

export default user => {
  if (!user) return null

  const initials = user.username
    .split(' ')
    .slice(0, 4)
    .map(name => name[0])
    .join('')

  const avatar = user.avatar_image && user.avatar_image.display

  const name = `${user.first_name} ${user.last_name}`

  return {
    id: user.id,
    initials,
    avatar,
    name,
    slug: user.slug,
    authentication_token: user.authentication_token,
    is_premium: user.is_premium,
    hide_notification_count: user.hide_notification_count,
  }
}
