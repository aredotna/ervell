import { TableRow_blokk } from '__generated__/TableRow'

export const FIRST_COLUMN_WIDTH = `35%`

export type TableData =
  | (TableRow_blokk & { expanded?: boolean })
  | { isNull: true }
