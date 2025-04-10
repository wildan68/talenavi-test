export type IPagination = {
  limit?: number
  page?: number
  total?: number
  total_pages?: number
}
  
export type IResponse<T> = {
  response: boolean
  data: T
  pagination?: IPagination
}
  
export type IErrorResponse = {
  response: boolean
  data: string[]
}