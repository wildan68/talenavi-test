<script setup lang="ts">
// 
</script>

<template>
  <div class="flex flex-col gap-6">
    <Menu />
    <DataTable
      :value="products"
      table-style="min-width: 50rem"
    >
      <Column
        field="code"
        header="Code"
      />
      <Column
        field="name"
        header="Name"
      />
      <Column
        field="category"
        header="Category"
      />
      <Column
        field="quantity"
        header="Quantity"
      />
    </DataTable>
  </div>
</template>