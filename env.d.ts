/// <reference types="vite/client" />
/// <reference path="auto-imports.d.ts" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="unplugin-icons/types/vue" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    action?: string
    subject?: string
    layoutWrapperClasses?: string
  }
}