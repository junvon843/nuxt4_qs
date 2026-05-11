<script setup lang="ts">
const footerData = {
  brand: '北京青颂律师事务所',
  copyright: '© 2026',
  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Twitter', href: '#' },
  ],
}
</script>

<template>
  <footer class="footer">
    <div class="qs-container inner">
      <div class="left">
        <div class="logo">{{ footerData.brand }}</div>
        <div class="copy">{{ footerData.copyright }}</div>
      </div>
      <div class="right">
        <a
          v-for="s in footerData.socials"
          :key="s.label"
          class="social"
          :href="s.href"
          @click.prevent
        >
          {{ s.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--qs-color-teal-980);
  color: rgba(255, 255, 255, 0.78);
  padding: 18px 0;
}
.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.logo {
  font-weight: 800;
  letter-spacing: 0.14em;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
}
.copy {
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.8;
}
.right {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.social {
  font-size: 12px;
  letter-spacing: 0.12em;
  opacity: 0.85;
}
.social:hover {
  opacity: 1;
  color: #fff;
}
@media (max-width: 768px) {
  .inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .right {
    justify-content: flex-start;
  }
}
</style>
