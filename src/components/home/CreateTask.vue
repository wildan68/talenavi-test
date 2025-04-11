<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms'
import type { IMockResponse } from '@/types/mock.type'
import { yupResolver } from '@primevue/forms/resolvers/yup'
import * as yup from 'yup'
import { EStatusColor, EPriorityColor, ETypeColor } from '@/enums'
import dayjs from 'dayjs'
import { useTaskStore } from '@/stores/task.store'

interface IProps {
  modelValue: boolean
}

const props = defineProps<IProps>()
const modelVal = useModel(props, 'modelValue')
const developerField = ref<string>('')
const store = useTaskStore()
const initialValues = reactive<Partial<IMockResponse>>({
  title: '',
  developer: [],
  date: null,
  status: '',
  priority: '',
  type: '',
  'Actual SP': 0,
  'Estimated SP': 0
})
const status = Object.keys(EStatusColor)
const priority = Object.keys(EPriorityColor)
const type = Object.keys(ETypeColor)

const resolver = yupResolver(
  yup.object().shape({
    title: yup.string().required('Task is required').min(3, 'Task must be at least 3 characters').max(50, 'Task must be at most 50 characters'),
    date: yup.date().required('Date is required'),
    status: yup.string().required('Status is required'),
    priority: yup.string().required('Priority is required'),
    type: yup.string().required('Type is required'),
    'Actual SP': yup.number().required('Actual SP is required'),
    'Estimated SP': yup.number().required('Estimated SP is required')
  })
)

const onAddDeveloper = () => {
  initialValues.developer = [...initialValues.developer as string[], developerField.value]
  developerField.value = ''
}

const onRemoveDeveloper = (index: number) => {
  if (!Array.isArray(initialValues.developer)) return
  initialValues.developer.splice(index, 1)
}

const onFormSubmit = ({ valid }: FormSubmitEvent) => {
  if (!valid) return

  const task = {
    ...initialValues,
    date: dayjs(initialValues.date as Date).format('YYYY-MM-DD'),
    developer: (initialValues.developer as string[]).join(', ')
  }

  store.addTask(task)
  modelVal.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="modelVal"
    modal
    header="Create New Task"
    :style="{ width: '55rem' }"
    dismissable-mask
  >
    <Form
      v-slot="$form"
      :initial-values
      :resolver="resolver"
      class="flex flex-col gap-6 w-full py-2"
      @submit="onFormSubmit"
    >
      <div class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <InputText
            v-model="initialValues.title"
            name="title"
            type="text"
            fluid
          />

          <label for="name">Task</label>
        </FloatLabel>

        <Message
          v-if="$form.title?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.title.error.message }}
        </Message>
      </div>
          
      <div class="flex gap-6 w-full items-start">
        <div class="flex flex-col gap-4 flex-1">
          <div class="flex flex-col gap-1 flex-1">
            <FloatLabel variant="on">
              <Select
                v-model="initialValues.status"
                name="status"
                :options="status"
                class="w-full"
              >
                <template #value="{ value }">
                  <div
                    v-if="value"
                    class="flex items-center gap-2"
                  >
                    <div
                      class="w-4 h-4 rounded-full"
                      :class="[EStatusColor[value as keyof typeof EStatusColor]]"
                    />
                    <span>{{ value }}</span>
                  </div>
                </template>

                <template #option="{ option }">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-4 h-4 rounded-full"
                      :class="[EStatusColor[option as keyof typeof EStatusColor]]"
                    />
                    <span>{{ option }}</span>
                  </div>
                </template>
              </Select>

              <label for="status">Status</label>
            </FloatLabel>

            <Message
              v-if="$form.status?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.status.error.message }}
            </Message>
          </div>

          <div class="flex flex-col gap-1 flex-1">
            <FloatLabel variant="on">
              <Select
                v-model="initialValues.priority"
                name="priority"
                :options="priority"
                class="w-full"
              >
                <template #value="{ value }">
                  <div
                    v-if="value"
                    class="flex items-center gap-2"
                  >
                    <div
                      class="w-4 h-4 rounded-full"
                      :class="[EPriorityColor[value as keyof typeof EPriorityColor]]"
                    />
                    <span>{{ value }}</span>
                  </div>
                </template>

                <template #option="{ option }">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-4 h-4 rounded-full"
                      :class="[EPriorityColor[option as keyof typeof EPriorityColor]]"
                    />
                    <span>{{ option }}</span>
                  </div>
                </template>
              </Select>

              <label for="priority">Priority</label>
            </FloatLabel>

            <Message
              v-if="$form.priority?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.priority.error.message }}
            </Message>
          </div>

          <div class="flex flex-col gap-1 flex-1">
            <FloatLabel variant="on">
              <Select
                v-model="initialValues.type"
                name="type"
                :options="type"
                class="w-full"
              >
                <template #value="{ value }">
                  <div
                    v-if="value"
                    class="flex items-center gap-2"
                  >
                    <div
                      class="w-4 h-4 rounded-full"
                      :class="[ETypeColor[value as keyof typeof ETypeColor]]"
                    />
                    <span>{{ value }}</span>
                  </div>
                </template>

                <template #option="{ option }">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-4 h-4 rounded-full"
                      :class="[ETypeColor[option as keyof typeof ETypeColor]]"
                    />
                    <span>{{ option }}</span>
                  </div>
                </template>
              </Select>

              <label for="type">Type</label>
            </FloatLabel>

            <Message
              v-if="$form.type?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.type.error.message }}
            </Message>
          </div>
        </div>

        <div class="flex flex-col gap-4 flex-1">
          <div class="flex flex-col gap-2 flex-1">
            <span class="text-xs">Developer</span>

            <div class="flex flex-col gap-1">
              <div
                v-for="(developer, i) in initialValues.developer"
                :key="developer"
                class="flex justify-between"
              >
                <span class="text-sm">{{ developer }}</span>
                <Icon
                  name="tabler-x"
                  class="text-xs hover:!bg-gray-500 cursor-pointer text-red-500"
                  @click="onRemoveDeveloper(i)"
                />
              </div>
            </div>
        
            <div class="flex gap-2">
              <InputText
                v-model="developerField"
                type="text"
                fluid
                placeholder="Input developer name"
              />

              <Button
                icon="tabler-plus"
                @click="onAddDeveloper"
              />
            </div>

            <Message
              v-if="$form.developer?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.developer.error.message }}
            </Message>
          </div>

          <div class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputNumber
                v-model="initialValues['Estimated SP']"
                name="Estimated SP"
                type="text"
                fluid
              />

              <label for="Estimated SP">Estimated SP</label>
            </FloatLabel>

            <Message
              v-if="$form['Estimated SP']?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form['Estimated SP'].error.message }}
            </Message>
          </div>

          <div class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputNumber
                v-model="initialValues['Actual SP']"
                name="Actual SP"
                type="text"
                fluid
              />

              <label for="Actual SP">Actual SP</label>
            </FloatLabel>

            <Message
              v-if="$form['Actual SP']?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form['Actual SP'].error.message }}
            </Message>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs">Date</span>

        <DatePicker
          v-model="(initialValues.date as Date)"
          inline
          class="w-full"
          name="date"
        />


        <Message
          v-if="$form.date?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.date.error.message }}
        </Message>
      </div>

      <div class="flex justify-end gap-2 items-center">
        <Button
          severity="primary"
          variant="outlined"
          label="Cancel"
          @click="modelVal = false"
        />

        <Button
          type="submit"
          severity="primary"
          label="Create"
        />
      </div>
    </Form>
  </Dialog>
</template>