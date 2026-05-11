<script setup lang="ts">
definePageMeta({ layout: 'plain' })
import { ref, onMounted } from 'vue'
import { quickLinks, buildAttorneySearchUrl } from './not-found/data'

const searchQuery = ref('')
const isVisible = ref(false)

function goHome() {
  navigateTo({ name: 'home' })
}

function handleSearch() {
  const url = buildAttorneySearchUrl(searchQuery.value)
  navigateTo(url)
}

function goToLink(path: string) {
  if (path.startsWith('#')) return
  navigateTo(path)
}

onMounted(() => {
  // 触发入场动画
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})

useHead({
  title: '页面未找到 - 北京青颂律师事务所',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <section class="not-found" :class="{ 'is-visible': isVisible }">
    <!-- 背景光晕 -->
    <div class="bg-glow" />
    <div class="bg-glow bg-glow--secondary" />

    <div class="qs-container inner">
      <!-- 404 数字 -->
      <div class="code-wrap">
        <h1 class="code">404</h1>
        <div class="code-line" />
      </div>

      <!-- 主文案 -->
      <div class="text-block">
        <h2 class="title">页面未找到</h2>
        <p class="desc">
          抱歉，您访问的页面可能已经移除、更名或暂时不可用。<br />
          如需帮助，可以通过以下方式继续浏览。
        </p>
      </div>

      <!-- 搜索框 -->
      <div class="search-block">
        <div class="search-label">寻找合适的专业人员？</div>
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="输入律师姓名"
            aria-label="输入律师姓名"
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" type="button" @click="handleSearch">
            搜索
          </button>
        </div>
      </div>

      <!-- 快速链接 -->
      <div class="links-block">
        <div class="links-label">或者前往</div>
        <div class="links-grid">
          <a
            v-for="link in quickLinks"
            :key="link.label"
            class="link-card"
            :href="link.path"
            @click.prevent="goToLink(link.path)"
          >
            <span class="link-title">{{ link.label }}</span>
            <span class="link-desc">{{ link.description }}</span>
          </a>
        </div>
      </div>

      <!-- 返回首页 -->
      <div class="action-block">
        <button class="home-btn" type="button" @click="goHome">
          <span class="home-btn__arrow">←</span>
          <span>返回首页</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0 80px;
  background: linear-gradient(180deg, var(--qs-color-teal-980) 0%, var(--qs-color-teal-950) 100%);
  color: #fff;
  overflow: hidden;
}

/* ---- 背景光晕 ---- */
.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0;
  transition: opacity 1.2s ease;
}

.not-found.is-visible .bg-glow {
  opacity: 0.15;
}

.bg-glow {
  width: 600px;
  height: 600px;
  background: var(--qs-color-brand);
  top: -200px;
  right: -100px;
}

.bg-glow--secondary {
  width: 400px;
  height: 400px;
  background: var(--qs-color-teal-900);
  bottom: -100px;
  left: -100px;
  transition-delay: 0.3s;
}

/* ---- 内部容器 ---- */
.inner {
  position: relative;
  z-index: 1;
  max-width: 640px;
  text-align: center;
}

/* ---- 404 数字 ---- */
.code-wrap {
  margin-bottom: 32px;
}

.code {
  margin: 0;
  font-size: 140px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 8px;
  background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.35) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: float 4s ease-in-out infinite;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.not-found.is-visible .code {
  opacity: 1;
  transform: translateY(0);
}

.code-line {
  width: 60px;
  height: 3px;
  background: var(--qs-color-brand);
  margin: 20px auto 0;
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0);
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}

.not-found.is-visible .code-line {
  opacity: 1;
  transform: scaleX(1);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* ---- 文案区域 ---- */
.text-block {
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
}

.not-found.is-visible .text-block {
  opacity: 1;
  transform: translateY(0);
}

.title {
  margin: 0 0 14px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 2px;
}

.desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
}

/* ---- 搜索框 ---- */
.search-block {
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
}

.not-found.is-visible .search-block {
  opacity: 1;
  transform: translateY(0);
}

.search-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
  letter-spacing: 0.1em;
}

.search-box {
  display: flex;
  gap: 10px;
  max-width: 480px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  height: 48px;
  padding: 0 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s, background 0.3s;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.search-input:focus {
  border-color: var(--qs-color-brand);
  background: rgba(255, 255, 255, 0.09);
}

.search-btn {
  height: 48px;
  padding: 0 24px;
  background: var(--qs-color-brand);
  border: none;
  border-radius: 4px;
  color: var(--qs-color-teal-980);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.search-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* ---- 快速链接 ---- */
.links-block {
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s;
}

.not-found.is-visible .links-block {
  opacity: 1;
  transform: translateY(0);
}

.links-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 16px;
  letter-spacing: 0.1em;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-width: 480px;
  margin: 0 auto;
}

.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 18px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, transform 0.25s;
}

.link-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}

.link-title {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

.link-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
}

/* ---- 返回首页 ---- */
.action-block {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease 0.9s, transform 0.7s ease 0.9s;
}

.not-found.is-visible .action-block {
  opacity: 1;
  transform: translateY(0);
}

.home-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.home-btn:hover {
  border-color: var(--qs-color-brand);
  color: var(--qs-color-brand);
  background: rgba(182, 200, 0, 0.06);
}

.home-btn__arrow {
  display: inline-block;
  transition: transform 0.3s;
}

.home-btn:hover .home-btn__arrow {
  transform: translateX(-4px);
}

/* ---- 响应式 ---- */
@media (max-width: 768px) {
  .code {
    font-size: 100px;
  }

  .title {
    font-size: 22px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-btn {
    width: 100%;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
