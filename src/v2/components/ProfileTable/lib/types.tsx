import { SortDirection, SortOrderEnum } from '__generated__/globalTypes'

export type SortAndSortDir = {
  sort: SortOrderEnum
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
