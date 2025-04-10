<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import { EStatusColor, EPriority, EType } from '@/enums'
import type { IMockResponse } from '@/types/mock.type'
import { useComponent } from '@wildanrizky/vue-inline-field'

const store = useTaskStore()
const tasks = computed(() => store.tasks)
const filteredTasks = computed(() => store.filteredTasks)
const allTask = computed(() => filteredTasks.value.length > 0 && tasks.value.length > 0 ? filteredTasks.value : tasks.value)
const isCreateTask = ref<boolean>(false)
const createTaskTitle = ref<string>('')
const createTaskRef = ref<HTMLElement | null>(null)
const selectPriorityRef = ref<HTMLElement | null>(null)
const priority = computed(() => Object.keys(EPriority))
const createTaskPriority = ref<string | null>(priority.value[0])
const { InlineField } = useComponent()

onClickOutside(createTaskRef, (ev) => {
  const element = ev.target as HTMLElement
  if (!element) return
  if (element.parentElement?.id === 'options') return
  const isSelect = element.className?.includes('select') || false
  if (isSelect) return
  isCreateTask.value = false
}, { ignore: [selectPriorityRef] })


const statusClass = (data: IMockResponse) => {
  return EStatusColor[data.status as keyof typeof EStatusColor] ?? '!bg-slate-500'
}
const priorityClass = (data: IMockResponse) => {
  return EPriority[data.priority as keyof typeof EPriority] ?? '!bg-slate-500'
}
const typeClass = (data: IMockResponse) => {
  return EType[data.type as keyof typeof EType] ?? '!bg-slate-500'
}
const onCreateTask = () => {
  store.addTask({
    title: createTaskTitle.value,
    priority: createTaskPriority.value as string
  })

  createTaskTitle.value = ''
  isCreateTask.value = false
}
const onSaveTask = (data) => {
  console.log('data', data)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Menu />
    <DataTable
      :value="allTask"
      show-gridlines
      scrollable
      scroll-height="500px"
      :pt="{
        bodyRow: {
          class: '!text-sm'
        },
        headerRow: {
          class: '!text-sm'
        },
        footer: {
          class: [
            'cursor-pointer',
            { '!py-4 hover:bg-surface-100': !isCreateTask },
            { '!border-2 !border-primary': isCreateTask }
          ]
        },
      }"
    >
      <Column
        selection-mode="multiple"
        style="width: 12px"
      />

      <Column
        field="title"
        header="Task"
        class="min-w-[350px]"
        :pt="{
          bodyCell: {
            class: '!p-0 !m-0'
          }
        }"
      >
        <template #body="{ data }">
          <div class=" flex items-center gap-2 justify-between">
            <div class="flex-1 px-2">
              <InlineField
                v-model="data.title"
                v-tooltip.bottom="'Click to edit'"
                field-type="InputText"
                fluid
                :pt="{ root: { class: '!border-none' } }"
                @outside-click="onSaveTask"
              />
            </div>

            <Divider
              layout="vertical"
              :pt="{ root: { class: '!h-[100px]'} }"
            />

            <div class="pr-6">
              <Button
                icon="tabler-message-circle-plus"
                variant="text"
                severity="secondary"
              />
            </div>
          </div>
        </template>
      </Column>

      <Column
        field="developer"
        header="Developer"
      >
        <template #body>
          <div class="flex justify-center">
            <Button
              icon="tabler-user"
              severity="secondary"
              rounded
            />
          </div>
        </template>
      </Column>

      <Column
        field="status"
        header="Status"
        class="w-[150px]"
        body-class="!p-0 !m-0"
      >
        <template #body="{ data }">
          <div
            class="w-full min-h-[100px] flex items-center justify-center text-white"
            :class="[statusClass(data)]"
          >
            <div class="overflow-hidden !text-ellipsis whitespace-nowrap max-w-[100px]">
              {{ data.status }}
            </div>
          </div>
        </template>
      </Column>

      <Column
        field="priority"
        header="Priority"
        class="w-[150px]"
        body-class="!p-0 !m-0"
      >
        <template #body="{ data }">
          <div
            class="w-full min-h-[100px] flex items-center justify-center text-white"
            :class="[priorityClass(data)]"
          >
            <div class="overflow-hidden !text-ellipsis whitespace-nowrap max-w-[100px] text-white">
              {{ data.priority }}
            </div>
          </div>
        </template>
      </Column>

      <Column
        field="type"
        header="Type"
        class="w-[150px]"
        body-class="!p-0 !m-0"
      >
        <template #body="{ data }">
          <div
            class="w-full min-h-[100px] flex items-center justify-center text-white"
            :class="[typeClass(data)]"
          >
            <div class="overflow-hidden !text-ellipsis whitespace-nowrap max-w-[100px]">
              {{ data.type }}
            </div>
          </div>
        </template>
      </Column>

      <Column
        field="date"
        header="Date"
        class="min-w-[120px]"
      />

      <Column
        field="estimated_sp"
        header="Estimated SP"
        class="min-w-[130px]"
      >
        <template #body="{ data }">
          <div class="overflow-hidden !text-ellipsis whitespace-nowrap max-w-[50px]">
            {{ data['Estimated SP'] }}
          </div>
        </template>
      </Column>

      <Column
        field="actual_sp"
        header="Actual SP"
        class="min-w-[130px]"
      >
        <template #body="{ data }">
          <div class="overflow-hidden !text-ellipsis whitespace-nowrap max-w-[50px]">
            {{ data['Actual SP'] }}
          </div>
        </template>
      </Column>

      <template #footer>
        <div
          ref="createTaskRef"
          v-focustrap
        >
          <template v-if="!isCreateTask">
            <div
              class="flex items-center gap-2"
              @click="isCreateTask = !isCreateTask"
            >
              <Icon name="tabler-plus" />
              <span>Create new task</span>
            </div>
          </template>

          <template v-else>
            <div class="flex items-center gap-3">
              <Select
                ref="selectPriorityRef"
                v-model="createTaskPriority"
                :options="priority"
                :pt="{
                  root: {
                    class: '!border-none !shadow-none !p-0'
                  }
                }"
              />

              <InputText
                v-model="createTaskTitle"
                autofocus
                fluid
                placeholder="What needs to be done?"
                :pt="{
                  root: {
                    class: '!border-none !shadow-none !p-0'
                  }
                }"
                size="small"
                @keydown.enter.prevent="onCreateTask"
              />
            </div>
          </template>
        </div>
      </template>
    </DataTable>
  </div>
</template>