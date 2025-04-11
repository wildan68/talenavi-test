<script setup lang="ts">
import type { IMockResponse } from '@/types/mock.type'
import { EPriorityColor, ETypeColor } from '@/enums';
import type { PopoverMethods } from 'primevue';

interface IProps {
  data: IMockResponse
}

defineProps<IProps>()

const developerPopoverRef = ref<PopoverMethods | null>(null)
</script>

<template>
  <Card :pt="{ root: { class: '!p-4 !m-0 flex flex-col gap-4 cursor-pointer trasition-all ease-in-out duration-300 hover:!bg-gray-50' }, body: { class: '!p-0 !text-xs' }}">
    <template #header>
      <div class="font-semibold">
        {{ data.title }}
      </div>
    </template>


    <template #subtitle>
      <div class="flex gap-2 items-center flex-wrap">
        <Badge :pt="{ root: { class: `overflow-hidden !text-ellipsis whitespace-nowrap max-w-[100px] ${EPriorityColor[data.priority as keyof typeof EPriorityColor]}`}}">
          {{ data.priority ?? '-' }}
        </Badge>
        <Badge :pt="{ root: { class: `overflow-hidden !text-ellipsis whitespace-nowrap max-w-[150px] ${ETypeColor[data.type as keyof typeof ETypeColor]}`}}">
          {{ data.type ?? '-' }}
        </Badge>
        <Badge
          :pt="{ root: { class: 'overflow-hidden !text-ellipsis whitespace-nowrap max-w-[150px]'}}"
          severity="secondary"
        >
          {{ data['Estimated SP'] }} Esrimated SP
        </Badge>
        <Badge
          :pt="{ root: { class: 'overflow-hidden !text-ellipsis whitespace-nowrap max-w-[150px]'}}"
          severity="secondary"
        >
          {{ data['Actual SP'] }} Actual SP
        </Badge>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between items-center">
        <Icon
          name="tabler-user"
          @mouseenter="developerPopoverRef?.show"
          @mouseleave="developerPopoverRef?.hide"
        />

        <Popover ref="developerPopoverRef">
          <div
            v-if="data"
            class="flex flex-col gap-2"
          >
            <div
              v-for="item in (data.developer as string).split(',')"
              :key="item"
              class="flex items-center gap-2"
            >
              <Icon name="tabler-user" />
              <span class="text-sm">{{ item }}</span>
            </div>
          </div>
        </Popover>

        <div class="flex gap-2">
          <Button
            icon="tabler-message"
            severity="secondary"
            variant="text"
          />

          <Button
            icon="tabler-git-branch"
            severity="secondary"
            variant="text"
          />
        </div>
      </div>
    </template>
  </Card>
</template>