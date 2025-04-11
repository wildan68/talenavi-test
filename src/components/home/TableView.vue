<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import { EStatusColor, EPriorityColor, ETypeColor } from '@/enums'
import type { IMockResponse } from '@/types/mock.type'
import { useComponent } from '@wildanrizky/vue-inline-field'
import type { PopoverMethods } from 'primevue'
import { useToast } from 'primevue/usetoast'
import dayjs from 'dayjs'
import type { MenuItem } from 'primevue/menuitem'

const store = useTaskStore()
const tasks = computed(() => store.tasks)
const filteredTasks = computed(() => store.filteredTasks)
const allTask = computed(() => filteredTasks.value.length > 0 && tasks.value.length > 0 ? filteredTasks.value : tasks.value)
const totalEstimatedSp = computed(() => store.sumEstimatedSp())
const totalActualSp = computed(() => store.sumActualSp())
const isCreateTask = ref<boolean>(false)
const createTaskTitle = ref<string>('')
const createTaskRef = ref<HTMLElement | null>(null)
const selectPriorityRef = ref<HTMLElement | null>(null)
const priority = computed(() => Object.keys(EPriorityColor))
const createTaskPriority = ref<string | null>(priority.value[0])
const { InlineField } = useComponent()
const developerPopoverRef = ref<PopoverMethods | null>(null)
const toast = useToast()
const datePopoverRef = ref<PopoverMethods | null>(null)
const popoverData = ref<IMockResponse | null>(null)
const statusList = computed<MenuItem[]>(() => Object.keys(EStatusColor).map((key) => ({ 
  label: key,
  color: EStatusColor[key as keyof typeof EStatusColor],
  command: () => {
    onSaveTask({ index: popoverData.value?.index as number, data: popoverData.value as IMockResponse, event: key, column: 'status' })
    mainPopoverRef.value?.hide()
  }
})))
const priorityList = computed<MenuItem[]>(() => Object.keys(EPriorityColor).map((key) => ({ 
  label: key,
  color: EPriorityColor[key as keyof typeof EPriorityColor],
  command: () => {
    onSaveTask({ index: popoverData.value?.index as number, data: popoverData.value as IMockResponse, event: key, column: 'priority' })
    mainPopoverRef.value?.hide()
  }
})))
const typeList = computed<MenuItem[]>(() => Object.keys(ETypeColor).map((key) => ({ 
  label: key,
  color: ETypeColor[key as keyof typeof ETypeColor],
  command: () => {
    onSaveTask({ index: popoverData.value?.index as number, data: popoverData.value as IMockResponse, event: key, column: 'type' })
    mainPopoverRef.value?.hide()
  }
})))
const mainPopoverRef = ref<PopoverMethods | null>(null)
const mainPopoverType = ref<'status' | 'priority' | 'type' >('status')
const mainSelected = computed(() => {
  switch (mainPopoverType.value) {
  case 'status':
    return statusList.value
  case 'priority':
    return priorityList.value
  case 'type':
    return typeList.value
  default:
    return []
  }
})

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
  return EPriorityColor[data.priority as keyof typeof EPriorityColor] ?? '!bg-slate-500'
}
const typeClass = (data: IMockResponse) => {
  return ETypeColor[data.type as keyof typeof ETypeColor] ?? '!bg-slate-500'
}
const onCreateTask = () => {
  store.addTask({
    title: createTaskTitle.value,
    developer: '',
    status: 'Ready to start',
    priority: createTaskPriority.value as string,
    'Estimated SP': 0,
    'Actual SP': 0
  })

  createTaskTitle.value = ''
  isCreateTask.value = false
}

const onSaveTask = ({ index, data, event, column }: { index: number, data: IMockResponse, event: string, column: string }) => {
  if (['Estimated SP', 'Actual SP'].includes(column)) {
    if (!/^\d+$/.test(event)) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Only number allowed',
        life: 3000
      })
      return
    }

    if (event[0] === '0' && event.length > 1) {
      event = event.slice(1)
    }
  }

  store.editTask(index, { ...data, [column]: ['Estimated SP', 'Actual SP'].includes(column) ? Number(event) : event })
}

const onShowDeveloper = (event: MouseEvent, data: IMockResponse) => {
  if (!data.developer) return
  developerPopoverRef.value?.toggle(event)
  popoverData.value = data
}

const onShowMainPopover = (event: MouseEvent, data: IMockResponse, index: number, type: 'status' | 'priority' | 'type') => {
  mainPopoverRef.value?.toggle(event)
  mainPopoverType.value = type
  popoverData.value = { ...data, index }
}

const onChangeDate = (event: MouseEvent, data: IMockResponse, index: number) => {
  datePopoverRef.value?.toggle(event)
  popoverData.value = { ...data, index }
}

const onDateSelected = (date: Date) => {
  if (!popoverData.value) return

  const formatDate = dayjs(date).format('YYYY-MM-DD')
  onSaveTask({
    index: popoverData.value.index as number,
    data: popoverData.value,
    event: formatDate,
    column: 'date'
  })
  datePopoverRef.value?.hide()
}

const onRemoveDate = () => {
  onSaveTask({
    index: popoverData.value?.index as number,
    data: popoverData.value as IMockResponse,
    event: '',
    column: 'date'
  })

  datePopoverRef.value?.hide()
}
</script>

<template>
  <div class="flex flex-col">
    <TaskMenu />

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
        <template #body="{ data, index }">
          <div class=" flex items-center gap-2 justify-between">
            <div class="flex-1 px-2">
              <InlineField
                v-tooltip.bottom="'Click to edit'"
                :value="data.title"
                field-type="InputText"
                fluid
                :pt="{ root: { class: '!border-none' } }"
                @update:value="(e) => onSaveTask({
                  index,
                  data,
                  event: e,
                  column: 'title'
                })"
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
        <template #body="{ data }">
          <div class="flex justify-center">
            <Button
              icon="tabler-user"
              severity="secondary"
              rounded
              @mouseenter="(e) => onShowDeveloper(e, data)"
              @mouseleave="() => developerPopoverRef?.hide()"
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
        <template #body="{ data, index }">
          <div
            class="w-full min-h-[100px] flex items-center justify-center text-white cursor-pointer"
            :class="[statusClass(data)]"
            @click="(e) => onShowMainPopover(e, data, index, 'status')"
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
        <template #body="{ data, index }">
          <div
            class="w-full min-h-[100px] flex items-center justify-center text-white cursor-pointer"
            :class="[priorityClass(data)]"
            @click="(e) => onShowMainPopover(e, data, index, 'priority')"
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
        <template #body="{ data, index }">
          <div
            class="w-full min-h-[100px] flex items-center justify-center text-white cursor-pointer"
            :class="[typeClass(data)]"
            @click="(e) => onShowMainPopover(e, data, index, 'type')"
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
      >
        <template #body="{ data, index }">
          <div @click="onChangeDate($event, data, index)">
            <div
              v-if="data.date"
              class="flex"
            >
              {{ dayjs(data.date).format('DD MMM, YYYY') }}
            </div>

            <div
              v-else
              class="text-gray-400 italic hover:bg-gray-100 hover:p-1 hover:rounded-sm"
            >
              No date
            </div>
          </div>
        </template>
      </Column>

      <Column
        field="estimated_sp"
        header="Estimated SP"
        class="min-w-[130px]"
      >
        <template #body="{ data, index }">
          <InlineField
            v-tooltip.bottom="'Click to edit'"
            :value="data['Estimated SP']"
            field-type="InputText"
            fluid
            :pt="{ root: { class: '!border-none' } }"
            @update:value="(e) => onSaveTask({
              index,
              data,
              event: e,
              column: 'Estimated SP'
            })"
          />
        </template>
      </Column>

      <Column
        field="actual_sp"
        header="Actual SP"
        class="min-w-[130px]"
      >
        <template #body="{ data, index }">
          <InlineField
            v-tooltip.bottom="'Click to edit'"
            :value="data['Actual SP']"
            field-type="InputText"
            fluid
            :pt="{ root: { class: '!border-none' } }"
            @update:value="(e) => onSaveTask({
              index,
              data,
              event: e,
              column: 'Actual SP'
            })"
          />
        </template>
      </Column>

      <template #footer>
        <div
          ref="createTaskRef"
          v-focustrap
        >
          <template v-if="!isCreateTask">
            <div class="flex justify-between items-center">
              <div
                class="flex items-center gap-2"
                @click="isCreateTask = !isCreateTask"
              >
                <Icon name="tabler-plus" />
                <span>Create new task</span>
              </div>

              <Summary />

              <div class="flex gap-2 items-center">
                <Badge :pt="{ root: { class: '!py-4 flex items-center gap-2' }}">
                  Estimated SP 
                  <Badge
                    :value="totalEstimatedSp"
                    severity="secondary"
                  />
                </Badge>
                <Badge :pt="{ root: { class: '!py-4 flex items-center gap-2' }}">
                  Actual SP 
                  <Badge
                    :value="totalActualSp"
                    severity="secondary"
                  />
                </Badge>
              </div>
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

    <Popover ref="developerPopoverRef">
      <div
        v-if="popoverData"
        class="flex flex-col gap-2"
      >
        <div
          v-for="item in (popoverData.developer as string).split(',')"
          :key="item"
          class="flex items-center gap-2"
        >
          <Icon name="tabler-user" />
          <span class="text-sm">{{ item }}</span>
        </div>
      </div>
    </Popover>


    <Popover ref="mainPopoverRef">
      <div class="flex flex-col gap-2 max-h-[250px] overflow-auto">
        <Menu
          :model="mainSelected"
          :pt="{
            root: {
              class: '!border-none'
            }
          }"
        >
          <template #item="{ item, props: prop }">
            <Button
              v-bind="prop.action"
              fluid
              variant="text"
              :pt="{
                root: {
                  class: `!justify-start ${item.label === popoverData?.[mainPopoverType] && item.color + ' !text-white' }`
                }
              }"
            >
              {{ item.label }}
            </Button>
          </template>
        </Menu>
      </div>
    </Popover>

    <Popover ref="datePopoverRef">
      <div class="flex flex-col gap-2">
        <DatePicker
          :model-value="popoverData?.date ? new Date(popoverData?.date as Date) : null"
          inline
          class="w-full sm:w-[30rem]"
          @date-select="onDateSelected"
        />

        <Button
          fluid
          variant="outlined"
          @click="onRemoveDate"
        >
          Remove date
        </Button>
      </div>
    </Popover>
  </div>
</template>