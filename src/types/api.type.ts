export type IPagination = {
  limit?: number
  page?: number
  total?: number
  total_pages?: number
}
  
export type IMeta = {
  status: number
  message: string
}
  
export type IResponse<T> = {
  meta: IMeta
  data: T
  pagination?: IPagination
}
  
export type IErrorResponse = {
  meta: IMeta
  data: string[]
}