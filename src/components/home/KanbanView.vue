<script setup lang="ts">
import BoardContainer from '@/components/home/BoardContainer.vue'
import { EStatusColor } from '@/enums'

const statusList = computed(() => Object.keys(EStatusColor).map((key) => ({
  label: key,
  color: EStatusColor[key as keyof typeof EStatusColor]
})))
const isDrag = ref<boolean>(false)

const onDragStart = () => {
  isDrag.value = true
}

const onDragEnd = () => {
  isDrag.value = false
}
</script>

<template>
  <div class="flex flex-col">
    <TaskMenu />

    <div class="md:overflow-auto pr-4">
      <div class="flex gap-4">
        <BoardContainer
          v-for="status in statusList"
          :key="status.label"
          :status="status"
          :is-drag="isDrag"
          @on-drag-start="onDragStart"
          @on-drag-end="onDragEnd"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.board-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  gap: 12px;
  border-bottom: 2px solid var(--p-surface-200);
  padding: 12px;
}
</style>