import { SortDirection, Sorts } from '__generated__/globalTypes'

export type SortAndSortDir = {
  sort: Sorts
  dir: SortDirection
}

export enum ColumnIds {
  content = 'content',
  title = 'title',
  addedAt = 'addedAt',
  author = 'author',
  connections = 'connections',
  addSettings = 'addSettings',
}
