import { Sorts } from '__generated__/globalTypes'

export function mapSort(id: string): Sorts | null {
  const sort =
    {
      'connection.created_at': Sorts.CREATED_AT,
    }[id] ?? null

  return sort
}
