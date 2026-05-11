<script setup lang="ts">
const { hero } = useHero()
</script>

<template>
  <div class="layout">
    <AppHeader />
    <div class="page-wrap">
      <PageHero
        v-if="hero.show"
        :image="hero.image"
        :height="hero.height"
      />
      <main class="main">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100svh;
}
.page-wrap {
  position: relative;
}
.main {
  position: relative;
  z-index: 1;
  padding-top: var(--qs-nav-height);
}
</style>
