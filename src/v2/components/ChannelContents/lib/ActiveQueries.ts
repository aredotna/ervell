export interface ActiveQueries {
  [key: string]: boolean
}

export const key = pageSkeleton => JSON.stringify(pageSkeleton)
