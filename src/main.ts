import '@/assets/css/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import primevue from '@/plugins/primevue/config'
import '@/plugins/iconify/config'
import '@/styles/index.scss'

const app = createApp(App)
app.use(primevue())
app.use(createPinia())
app.use(router)

app.mount('#app')
