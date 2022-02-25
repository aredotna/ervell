import { SearchSorts, SortDirection } from '__generated__/globalTypes'

export type SortAndSortDir = {
  sort: SearchSorts
  dir: SortDirection
}

export enum ColumnIds {
  content = 'content',
  title = 'title',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
  author = 'author',
  connections = 'connections',
  addSettings = 'addSettings',
}
