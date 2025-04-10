import InlineField from '@wildanrizky/vue-inline-field'
import '@wildanrizky/vue-inline-field/dist/vue-inline-field.css'
import { InputText, Select, InputNumber } from 'primevue'
import type { App } from 'vue'

const useInlineField = (): { install(app: App): void } => {
  return {
    install(app) {
      app.use(InlineField, {
        components: {
          InputText,
          Select,
          InputNumber
        },
        locale: 'en'
      })
    }
  }
}

export default useInlineField