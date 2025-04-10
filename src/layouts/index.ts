import type { RouteRecordRaw } from 'vue-router';
import Default from '@/layouts/default.vue'

const layouts = import.meta.glob('@/layouts/*.vue');

export const setupLayouts = (routes: RouteRecordRaw[]) => {
  return routes.map(route => {
    if (!route.meta?.layout) {
      return {
        ...route,
        component: Default as RouteRecordRaw['component'],
        children: route.children ? route.children : [{ path: '', component: route.component as RouteRecordRaw['component'] }],
      }
    }

    const layoutPath = `/src/layouts/${route.meta.layout}.vue`;
    const layoutComponent = layouts[layoutPath] ? layouts[layoutPath] : Default;

    return {
      ...route,
      component: layoutComponent as RouteRecordRaw['component'],
      children: route.children ? route.children : [{ path: '', component: route.component as RouteRecordRaw['component'] }]
    }
  })
}