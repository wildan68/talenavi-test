<script setup lang="ts">
// 
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      icon="tabler-plus"
      label="New Task"
    />

    <IconField>
      <InputIcon class="tabler-search" />
      <InputText placeholder="Search a task" />
    </IconField>

    <Button
      icon="tabler-user"
      variant="text"
      label="Person"
    />

    <Button
      icon="tabler-arrows-sort"
      variant="text"
      label="Sort"
    />
  </div>
</template>