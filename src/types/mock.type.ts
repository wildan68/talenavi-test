export type IMockResponse = {
  index?: number
  title: string
  developer: string
  priority: string
  status: string
  type: string
  "Estimated SP": number | null
  "Actual SP": number | null
  date: string | Date | null
  [key: string]: any
}