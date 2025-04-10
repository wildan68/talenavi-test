<script setup lang="ts">
import type { Component } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { MainServices } from '@/services'
import { useTaskStore } from '@/stores/task.store'
const store = useTaskStore()

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

const { data } = useQuery({
  queryKey: [MainServices.getTask.key],
  queryFn: async () => await MainServices.getTask.call(),
  throwOnError: true
})

watchEffect(() => {
  if (!data.value) return
  if (!data.value.data) return

  store.setTasks(data.value.data)
})
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