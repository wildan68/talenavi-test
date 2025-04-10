import { useApi } from '@/composables/api'
import type { IMockResponse } from '@/types/mock.type'

const { query } = useApi()
export const MainServices = {
  getTask: {
    call: () => {
      return query<IMockResponse[]>('/9d9895f9-70eb-49d2-99f7-cb3dacca8a94', { headers: { throwOnError: true } })
    },
    key: 'getTask'
  }
}