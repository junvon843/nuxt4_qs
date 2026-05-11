<script setup lang="ts">
// 统一使用 default layout，Hero 背景由 config 控制
/**
 * PracticeAreaDetail.vue
 * ========================
 * 单个专业领域详情页：
 * - 顶部 Hero 由 DefaultLayout 根据 hero.config.json 统一渲染
 * - 左侧 sticky 导航：概述 / 代表性案例 / 法律服务内容
 * - 右侧内容区：有内容才显示对应 section
 */

import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { practicesData } from './data'
import type { Practice } from './data'

const route = useRoute()
const practices = ref<Practice[]>(practicesData as Practice[])

const practice = computed(() => {
  const slug = route.params.slug as string
  return practices.value.find((p) => p.slug === slug) || null
})

/* -------- 目录导航 -------- */
const navItems = computed(() => {
  const items: { id: string; label: string }[] = []
  if (!practice.value) return items
  if (practice.value.overview.length) items.push({ id: 'overview', label: '概述' })
  if (practice.value.cases.length) items.push({ id: 'cases', label: '代表性案例' })
  if (practice.value.services.length) items.push({ id: 'services', label: '法律服务内容' })
  return items
})

const activeId = ref('')
const showTop = ref(false)

function scrollTo(id: string) {
  const el = document.getElementById('section-' + id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onScroll() {
  const sy = window.scrollY
  showTop.value = sy > 500

  const sections = document.querySelectorAll('.pa-section')
  let current = ''
  sections.forEach((s) => {
    if (s.getBoundingClientRect().top < 140) current = s.id
  })
  if (current) activeId.value = current.replace('section-', '')
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  nextTick(onScroll)
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

useHead({
  title: computed(() =>
    practice.value?.name
      ? practice.value.name + ' - 北京青颂律师事务所'
      : '专业领域详情'
  ),
})
</script>

<template>
  <div v-if="practice" class="practice-detail">
    <header class="pa-header">
      <div class="qs-container">
        <h1 class="pa-header__title">{{ practice.name }}</h1>
      </div>
    </header>
    <!-- Body -->
    <div class="qs-container pa-body">
      <!-- 左侧导航 -->
      <aside class="pa-nav">
        <div class="pa-nav__title">目录</div>
        <nav class="pa-nav__list">
          <a
            v-for="item in navItems"
            :key="item.id"
            :class="{ 'is-active': activeId === item.id }"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </nav>
      </aside>

      <!-- 右侧内容 -->
      <main class="pa-content">
        <!-- 概述 -->
        <section
          v-if="practice.overview.length"
          id="section-overview"
          class="pa-section"
        >
          <h2 class="pa-section__title">概述</h2>
          <div class="pa-section__body">
            <p v-for="(text, i) in practice.overview" :key="i">{{ text }}</p>
          </div>
        </section>

        <!-- 代表性案例 -->
        <section
          v-if="practice.cases.length"
          id="section-cases"
          class="pa-section"
        >
          <h2 class="pa-section__title">代表性案例</h2>
          <ul class="pa-case-list">
            <li v-for="(c, i) in practice.cases" :key="i">{{ c }}</li>
          </ul>
        </section>

        <!-- 法律服务内容 -->
        <section
          v-if="practice.services.length"
          id="section-services"
          class="pa-section"
        >
          <h2 class="pa-section__title">法律服务内容</h2>
          <div class="pa-service-tags">
            <span v-for="(s, i) in practice.services" :key="i" class="pa-service-tag">{{ s }}</span>
          </div>
        </section>
      </main>
    </div>

    <!-- Back to top -->
    <button
      class="pa-backtop"
      :class="{ 'is-visible': showTop }"
      @click="window.scrollTo({ top: 0, behavior: 'smooth' })"
    >
      ↑
    </button>
  </div>

  <div v-else class="practice-notfound">
    <div class="qs-container">
      <p>专业领域不存在</p>
      <NuxtLink to="/practice-areas">返回列表</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Header */
.pa-header {
  padding: 40px 0 16px;
  text-align: center;
}
.pa-header__title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}

/* Body */
.pa-body {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 3rem;
  padding: 48px 0 80px;
  align-items: start;
}

/* Nav */
.pa-nav {
  position: sticky;
  top: calc(var(--qs-nav-height) + 24px);
  align-self: flex-start;
  background: #fff;
  border-radius: var(--qs-radius);
  padding: 1.5rem;
  box-shadow: var(--qs-shadow);
  border: 1px solid var(--qs-color-border);
}
.pa-nav__title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--qs-color-text-secondary);
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--qs-color-border);
}
.pa-nav__list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.pa-nav__list a {
  display: block;
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--qs-color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  text-decoration: none;
}
.pa-nav__list a:hover {
  background: var(--qs-color-bg);
  color: var(--qs-color-teal-900);
}
.pa-nav__list a.is-active {
  background: #f0f4f8;
  color: var(--qs-color-teal-900);
  border-left-color: var(--qs-color-brand);
  font-weight: 600;
}

/* Content */
.pa-content {
  background: #fff;
  border-radius: var(--qs-radius);
  padding: 3rem;
  box-shadow: var(--qs-shadow);
  border: 1px solid var(--qs-color-border);
}

/* Section */
.pa-section {
  margin-bottom: 56px;
  scroll-margin-top: 120px;
}
.pa-section:last-child {
  margin-bottom: 0;
}
.pa-section__title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--qs-color-teal-950);
  margin-bottom: 24px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--qs-color-brand);
  display: inline-block;
}
.pa-section__body {
  font-size: 16px;
  line-height: 1.9;
  color: var(--qs-color-text);
}
.pa-section__body p {
  margin-bottom: 16px;
  text-align: justify;
}

/* Case list */
.pa-case-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.pa-case-list li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--qs-color-text);
}
.pa-case-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 8px;
  height: 8px;
  background: var(--qs-color-brand);
  border-radius: 50%;
}

/* Service tags */
.pa-service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.pa-service-tag {
  display: inline-block;
  padding: 10px 20px;
  background: #f0f4f8;
  border: 1px solid var(--qs-color-border);
  border-radius: 100px;
  font-size: 14px;
  color: var(--qs-color-teal-900);
  line-height: 1.5;
}

/* Back to top */
.pa-backtop {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  background: #fff;
  border: 1px solid var(--qs-color-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--qs-shadow);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s;
  z-index: 998;
  font-size: 1.2rem;
  color: var(--qs-color-teal-900);
}
.pa-backtop.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.pa-backtop:hover {
  background: var(--qs-color-teal-900);
  color: #fff;
}

/* Not found */
.practice-notfound {
  text-align: center;
  padding: 120px 0;
  color: var(--qs-color-text-secondary);
}
.practice-notfound a {
  color: var(--qs-color-brand);
  text-decoration: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .pa-body {
    grid-template-columns: 1fr;
  }
  .pa-nav {
    position: relative;
    top: 0;
    order: -1;
  }
  .pa-nav__list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .pa-nav__list a {
    border-left: none;
    border: 1px solid var(--qs-color-border);
    white-space: nowrap;
  }
}
@media (max-width: 768px) {
  .pa-content {
    padding: 1.5rem;
  }
}
</style>
