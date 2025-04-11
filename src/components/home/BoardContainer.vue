<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import Draggable from 'vuedraggable'
import type { IMockResponse } from '@/types/mock.type'
import { EStatusColor } from '@/enums'

type TStatus = {
  label: string
  color: string
}
interface IProps {
  status: TStatus
  isDrag: boolean
}

interface IEmits {
  (e: 'onDragStart' | 'onDragEnd'): void
}


const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()
const store = useTaskStore()
const tasks = computed(() => store.tasks.filter((task) => task.status === props.status.label))
const filteredTasks = computed(() => store.filteredTasks.filter((task) => task.status === props.status.label))
const controlOnStart = ref<boolean>(true)
const isVm = ref<boolean>(false)
const taskList = computed(() => filteredTasks.value.length > 0 && tasks.value.length > 0 ? filteredTasks.value : tasks.value ? tasks.value : [])
const titleColor = computed(() => EStatusColor[props.status.label as keyof typeof EStatusColor])
const statusCount = computed(() => taskList.value.length)

const onClone = (task: IMockResponse) => {
  return { ...task }
}
const onPullFunction = () => {
  return controlOnStart.value ? 'clone' : true
}
const onStart = ({ originalEvent }: { originalEvent: MouseEvent, item: { _underlying_vm_: IMockResponse } }) => {
  emit('onDragStart')
  isVm.value = true
  controlOnStart.value = originalEvent.ctrlKey
}

const onEnd = () => {
  isVm.value = false
  emit('onDragEnd')
}

const onChangeStatus = (evt: Record<string, any>) => {
  if (!evt.added) return
  
  const findIndex = store.tasks.findIndex((task) => task.title === evt.added.element.title)
  store.editTask(findIndex, { ...evt.added.element, status: props.status.label })
}
</script>

<template>
  <Draggable
    :list="taskList"
    class="board-container"
    :class="[{ 'board-container__drag': isDrag && !isVm }, { 'min-h-[100%]': taskList.length }, { 'min-h-[400px]': !taskList.length }]"
    :clone="onClone"
    :group="{ name: 'card', pull: onPullFunction }"
    item-key="title"
    @start="onStart"
    @end="onEnd"
    @change="onChangeStatus"
  >
    <template #item="{ element }">
      <BoardCard :data="element" />
    </template>

    <template #header>
      <div
        class="board-title"
        :class="[titleColor]"
      >
        <div class="flex justify-between w-full">
          <span>{{ status.label }}</span>

          <Badge
            :value="statusCount"
            severity="secondary"
          />
        </div>
      </div>
    </template>
  </Draggable>
</template>

<style scoped lang="scss">
.board-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  background: var(--p-surface-100);
  padding: 12px;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  min-width: 200px;

  &__drag {
    border: 2px solid var(--p-primary-color);
    @apply bg-primary/10;
  }
}

.board-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--p-surface-200);
  padding: 12px;
  color: white;
  margin: -12px;
  margin-bottom: 4px;
}
</style>
