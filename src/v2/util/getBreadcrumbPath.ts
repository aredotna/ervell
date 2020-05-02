import { KonnectableCell } from '__generated__/KonnectableCell'
import { IdentifiableCell } from '__generated__/IdentifiableCell'
import { FeedObject } from '__generated__/FeedObject'
import { SerializeMeQueryHook_serializedMe } from '__generated__/SerializeMeQueryHook'

type Crumbable =
  | KonnectableCell
  | IdentifiableCell
  | FeedObject
  | SerializeMeQueryHook_serializedMe

export const getBreadcrumbPath = (crumbable: Crumbable) => {
  const crumbs = (crumbable => {
    switch (crumbable.__typename) {
      case 'Channel':
        return [
          { title: crumbable.owner.name },
          { title: crumbable.truncatedTitle },
        ]
      case 'SerializedMe':
        return [{ title: crumbable.name }]
      case 'User':
        return [{ title: crumbable.name }]
      case 'Group':
        return [{ title: crumbable.name }]
      default:
        return []
    }
  })(crumbable)

  return {
    breadcrumbs: JSON.stringify({
      crumbs,
    }),
  }
}
