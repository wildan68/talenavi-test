import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import ThemesConfig from '@/plugins/primevue/themes.config'
import type { App } from 'vue'

const usePrimeVue = (): { install(app: App): void } => {
  return {
    install(app) {
      app.use(PrimeVue, {
        ripple: true,
        theme: {
          preset: ThemesConfig,
          options: {
            darkModeSelector: 'light',
            cssLayer: false
          }
        }
      })
      app.use(DialogService)
      app.use(ToastService)
    },
  }
}

export default usePrimeVue