import { SerializeMeQueryHook_serializedMe } from '__generated__/SerializeMeQueryHook'
import { LoadingBreadcrumbChannel } from '__generated__/LoadingBreadcrumbChannel'
import { LoadingBreadcrumbUser } from '__generated__/LoadingBreadcrumbUser'
import { LoadingBreadcrumbGroup } from '__generated__/LoadingBreadcrumbGroup'

type Crumbable =
  | LoadingBreadcrumbChannel
  | LoadingBreadcrumbUser
  | LoadingBreadcrumbGroup
  | SerializeMeQueryHook_serializedMe

export const getBreadcrumbPath = (crumbable: Crumbable) => {
  const crumbs = (crumbable => {
    switch (crumbable.__typename) {
      case 'Channel':
        return [{ title: crumbable.owner.name }, { title: crumbable.label }]
      case 'ClientSerializedMe':
        return [{ title: crumbable.name }]
      case 'User':
        return [{ title: crumbable.label }]
      case 'Group':
        return [{ title: crumbable.label }]
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
