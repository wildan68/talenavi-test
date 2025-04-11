<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import { useComponent } from '@wildanrizky/vue-inline-field'
import type { PopoverMethods, TieredMenuMethods } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'

const store = useTaskStore()
const search = ref<string>('')
const { InlineField } = useComponent()
const selectDeveloperRef = ref<PopoverMethods | null>(null)
const developers = computed(() => store.developers)
const sortFilterRef = ref<TieredMenuMethods>()
const filters = reactive<{
  developer: string[]
}>({
  developer: [],
})

const sortFilterMenu = computed<MenuItem[]>(() => [
  {
    label: 'Ascending',
    items: [
      {
        label: 'Task',
        command: () => {
          store.sortByAscending('title')
        }
      }, {
        label: 'Status',
        command: () => {
          store.sortByAscending('status')
        }
      }, {
        label: 'Priority',
        command: () => {
          store.sortByAscending('priority')
        }
      }, {
        label: 'Type',
        command: () => {
          store.sortByAscending('type')
        }
      }, {
        label: 'Date',
        command: () => {
          store.sortByAscDate('date')
        }
      }, {
        label: 'Estimated SP',
        command: () => {
          store.sortByAscNumber('Estimated SP')
        }
      }, {
        label: 'Actual SP',
        command: () => {
          store.sortByAscNumber('Actual SP')
        }
      }, 
    ]
  },
  {
    label: 'Descending',
    items: [
      {
        label: 'Task',
        command: () => {
          store.sortByDescending('title')
        }
      }, {
        label: 'Status',
        command: () => {
          store.sortByDescending('status')
        }
      }, {
        label: 'Priority',
        command: () => {
          store.sortByDescending('priority')
        }
      }, {
        label: 'Type',
        command: () => {
          store.sortByDescending('title')
        }
      }, {
        label: 'Date',
        command: () => {
          store.sortByDescDate('date')
        }
      }, {
        label: 'Estimated SP',
        command: () => {
          store.sortByDescNumber('Estimated SP')
        }
      }, {
        label: 'Actual SP',
        command: () => {
          store.sortByDescNumber('Actual SP')
        }
      }, 
    ]
  }
])

watch(search, () => {
  store.searchTask(search.value)
})

const isActiveDeveloperFilters = (person: string) => {
  return filters.developer.includes(person)
}

const onSelectDeveloper = (person: string) => {
  if (isActiveDeveloperFilters(person)) {
    filters.developer = filters.developer.filter((item) => item !== person)
    store.filterByDeveloper(filters.developer)
    return
  }
  
  store.filterByDeveloper(filters.developer = [...filters.developer, person])
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      icon="tabler-plus"
      label="New Task"
    />

    <IconField>
      <InputIcon class="tabler-search" />
      <InputText
        v-model="search"
        placeholder="Search a task"
      />
    </IconField>

    <Button
      icon="tabler-user"
      variant="text"
      label="Developer"
      severity="secondary"
      @click="selectDeveloperRef?.show($event)"
    />

    <Button
      icon="tabler-arrows-sort"
      variant="text"
      label="Sort"
      severity="secondary"
      @click="sortFilterRef?.toggle"
    />

    <TieredMenu
      ref="sortFilterRef"
      :model="sortFilterMenu"
      popup
    />
  </div>

  <Popover ref="selectDeveloperRef">
    <div
      v-for="person in developers"
      :key="person"
      class="flex items-center gap-2 cursor-pointer hover:bg-surface-100 transition-all duration-300 px-3 py-2 rounded-md"
      @click="onSelectDeveloper(person)"
    >
      <div
        class="flex w-5 h-5 border-2 border-surface-300 rounded transition-all duration-300"
        :class="[{ 'bg-blue-500 !border-primary': isActiveDeveloperFilters(person) }]"
      >
        <Icon
          v-if="isActiveDeveloperFilters(person)"
          name="tabler-check"
          class="text-white"
        />
      </div>

      <span>{{ person }}</span>
    </div>
  </Popover>
</template>