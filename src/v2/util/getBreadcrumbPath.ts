import { KonnectableCell } from '__generated__/KonnectableCell'
import { IdentifiableCell } from '__generated__/IdentifiableCell'

type Crumbable = KonnectableCell | IdentifiableCell

export const getBreadcrumbPath = (crumbable: Crumbable) => {
  const crumbs = (crumbable => {
    switch (crumbable.__typename) {
      case 'Channel':
        return [
          { title: crumbable.owner.name },
          { title: crumbable.truncatedTitle },
        ]
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
