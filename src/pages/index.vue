<script setup lang="ts">
import type { Component } from 'vue'

type TMenu = 'table' | 'kanban'
const menu = ref<TMenu>('table')
const ComponentMenu = reactive<{
  key: TMenu
  label: string
  icon: string
  component: Component
}[]>([{
  key: 'table',
  label: 'Main Table',
  icon: 'tabler-table',
  component: defineAsyncComponent(() => import('@/components/home/Table.vue'))
}, {
  key: 'kanban',
  label: 'Kanban',
  icon: 'tabler-layout-kanban',
  component: defineAsyncComponent(() => import('@/components/home/Kanban.vue'))
}])
</script>

<template>
  <div class="flex flex-col gap-6">
    <Tabs v-model:value="menu">
      <TabList>
        <Tab
          v-for="item in ComponentMenu"
          :key="item.key"
          :value="item.key"
          :pt="{
            root: {
              class: 'flex gap-2 items-center'
            }
          }"
        >
          <Icon :name="item.icon" />
          <span>{{ item.label }}</span>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          v-for="item in ComponentMenu"
          :key="item.key"
          :value="item.key"
        >
          <Component :is="item.component" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>