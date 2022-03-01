import { SearchSorts } from '__generated__/globalTypes'
import { ColumnIds } from './types'

export const FIRST_COLUMN_WIDTH = `35%`

/**
 * If we want to allow a column to be sortable,
 * add the column's ID to this object with the Sorts
 * value it should control
 */
export const columnIdsToSorts: { [key in ColumnIds]?: SearchSorts } = {
  [ColumnIds.updatedAt]: SearchSorts.UPDATED_AT,
  [ColumnIds.createdAt]: SearchSorts.CREATED_AT,
  [ColumnIds.title]: SearchSorts.ALPHA,
}
