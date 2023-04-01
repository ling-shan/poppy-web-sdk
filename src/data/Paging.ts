export type PagingParams<T = any> = {
  pageNum: number
  pageSize: number
} & T

export interface PagingResult<T = any> {
  totalCount: number
  list: T[]
}
