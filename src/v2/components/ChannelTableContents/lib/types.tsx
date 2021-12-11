import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import { SortDirection, Sorts } from '__generated__/globalTypes'

/**
 * A small augmentation over a simple array of blocks.
 * Since react-table doesn't support rows with null
 * values, we swap in an object object { isNull: true }
 */
export type TableData =
  | ChannelTableContentsSet_channel_blokks
  | { isNull: true }

export type SortAndSortDir = {
  sort: Sorts
  dir: SortDirection
}
