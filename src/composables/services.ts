import { useQueryClient } from '@tanstack/vue-query'

export const useServices = () => {
  const service = useQueryClient()

  const refetchQueries = (...args: string[]) => {
    for (const arg of args) {
      service.refetchQueries({
        queryKey: [arg],
        exact: false
      })
    }
  }

  const removeQueries = (...args: string[]) => {
    for (const arg of args) {
      service.removeQueries({
        queryKey: [arg],
        exact: false
      })
    }
  }

  const resetQueries = (...args: string[]) => {
    for (const arg of args) {
      service.resetQueries({
        queryKey: [arg],
        exact: false
      })
    }
  }

  return {
    refetchQueries,
    removeQueries,
    resetQueries
  }
}