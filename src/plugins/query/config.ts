import type { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

const useQuery = (): { install(app: App): void } => {
  return {
    install(app) {
      app.use(VueQueryPlugin, {
        queryClientConfig: {
          defaultOptions: {
            queries: {
              retry: 0,
              gcTime: 0,
              refetchOnWindowFocus: false,
              refetchOnReconnect: true,
              refetchOnMount: true,
              retryOnMount: true,
              staleTime: 0
            }
          }
        }
      })
    }
  }
}

export default useQuery