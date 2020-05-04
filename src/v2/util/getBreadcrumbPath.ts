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
  console.log('crumbable', crumbable)
  const crumbs = (crumbable => {
    switch (crumbable.__typename) {
      case 'Channel':
        return [{ label: crumbable.owner.name }, { label: crumbable.label }]
      case 'ClientSerializedMe':
        return [{ label: crumbable.name }]
      case 'User':
        return [{ label: crumbable.label }]
      case 'Group':
        return [{ label: crumbable.label }]
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
