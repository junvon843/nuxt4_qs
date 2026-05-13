<script setup lang="ts">
import type { BreadcrumbItem } from './BreadcrumbNav.vue'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <div class="breadcrumb-bar">
    <div class="qs-container">
      <BreadcrumbNav :items="items" />
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
