<script setup lang="ts">
interface IProps {
  name: string
}

defineProps<IProps>()
</script>

<template>
  <div :class="name" />
</template>