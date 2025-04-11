<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import { EStatusColor, EPriorityColor, ETypeColor } from '@/enums'

const store = useTaskStore()
const statusCount = computed(() => store.legendsCount(EStatusColor, 'status'))
const priorityCount = computed(() => store.legendsCount(EPriorityColor, 'priority'))
const typeCount = computed(() => store.legendsCount(ETypeColor, 'type'))
</script>

<template>
  <div class="flex gap-6">
    <div class="flex items-center gap-4">
      <span class="text-sm font-semibold">Status</span>

      <div class="flex items-center gap-2">
        <div
          v-for="status in statusCount"
          :key="status.label"
          v-tooltip.bottom="status.label"
          class="flex items-center"
        >
          <Badge :pt="{ root: { class: status.color }}">
            {{ status.count }}
          </Badge>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-sm font-semibold">Priority</span>

      <div class="flex items-center gap-2">
        <div
          v-for="priority in priorityCount"
          :key="priority.label"
          v-tooltip.bottom="priority.label"
          class="flex items-center"
        >
          <Badge :pt="{ root: { class: priority.color }}">
            {{ priority.count }}
          </Badge>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-sm font-semibold">Type</span>

      <div class="flex items-center gap-2">
        <div
          v-for="type in typeCount"
          :key="type.label"
          v-tooltip.bottom="type.label"
          class="flex items-center"
        >
          <Badge :pt="{ root: { class: type.color }}">
            {{ type.count }}
          </Badge>
        </div>
      </div>
    </div>
  </div>
</template>