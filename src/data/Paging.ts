export type PagingParams<T = any> = {
  pageNum: number
  pageSize: number
} & T

export interface PagingResult<T = any> {
  totalCount: number
  pageNum: number
  pageSize: number
  list: T[]
}

export const DefaultPageSize = 20;
