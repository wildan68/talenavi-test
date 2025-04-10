<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'

const store = useTaskStore()
const search = ref<string>('')

watch(search, () => {
  store.searchTask(search.value)
})
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
      label="Person"
      severity="secondary"
    />

    <Button
      icon="tabler-arrows-sort"
      variant="text"
      label="Sort"
      severity="secondary"
    />
  </div>
</template>