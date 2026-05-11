<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { NavItem } from '~/utils/nav.model'
import { headerNavItems } from '~/utils/nav.model'

const openKey = ref<string | null>(null)
const mobileOpen = ref(false)
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const items = computed(() => headerNavItems)

function keyOf(item: NavItem) {
  return `${item.type}:${item.label}`
}

function open(item: NavItem) {
  if (item.type === 'link') return
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
    closeTimer.value = null
  }
  openKey.value = keyOf(item)
}

function close(item?: NavItem) {
  closeTimer.value = setTimeout(() => {
    if (!item) {
      openKey.value = null
      return
    }
    if (openKey.value === keyOf(item)) openKey.value = null
  }, 1000)
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  if (!mobileOpen.value) openKey.value = null
}

const isTop = ref(true)
function onScroll() {
  isTop.value = window.scrollY <= 10
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const topSearch = ref('')
function submitTopSearch() {
  const q = topSearch.value.trim()
  if (!q) return
  window.location.hash = `#search?q=${encodeURIComponent(q)}`
}
</script>

<template>
  <header class="navHeader" :class="{ isTop }" @mouseleave="close()">
    <div class="qs-container navInner">
      <NuxtLink class="brand" to="/" aria-label="返回首页">
        <span class="brandMark">青颂</span>
      </NuxtLink>

      <button class="burger" type="button" @click="toggleMobile" aria-label="打开菜单">
        <span />
        <span />
        <span />
      </button>

      <nav class="nav" :class="{ isOpen: mobileOpen }" aria-label="主导航">
        <ul class="navList">
          <li
            v-for="item in items"
            :key="keyOf(item)"
            class="navItem"
            :class="{ hasMenu: item.type !== 'link', isOpen: openKey === keyOf(item) }"
            @mouseenter="open(item)"
          >
            <a
              v-if="item.type === 'link' && item.href.startsWith('http')"
              class="navLink"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ item.label }}</span>
            </a>
            <NuxtLink
              v-else-if="item.type === 'link'"
              class="navLink"
              :to="item.href"
            >
              <span>{{ item.label }}</span>
            </NuxtLink>
            <a
              v-else
              class="navLink"
              :href="item.href"
              @click.prevent="openKey = openKey === keyOf(item) ? null : keyOf(item)"
            >
              <span>{{ item.label }}</span>
              <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>

            <div v-if="item.type !== 'link'" class="menuWrap" @mouseleave="close(item)">
              <MegaMenu :item="item" />
            </div>
          </li>
        </ul>

        <div class="topSearch">
          <input
            v-model="topSearch"
            type="text"
            placeholder="搜索"
            class="topSearchInput"
            @keyup.enter="submitTopSearch"
          />
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navHeader {
  position: fixed;
  top: 0;
  inset-inline: 0;
  height: var(--qs-nav-height);
  z-index: 50;
  background: rgb(9, 34, 27);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease;
}
.navHeader.isTop {
  background: transparent;
  backdrop-filter: none;
  border-bottom-color: transparent;
}
.navInner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
}
.brand {
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  color: #fff;
}
.brandMark {
  font-weight: 700;
  letter-spacing: 0.12em;
}
.burger {
  display: none;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  background: transparent;
  padding: 10px;
  cursor: pointer;
}
.burger span {
  display: block;
  height: 2px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 2px;
}
.burger span + span {
  margin-top: 7px;
}
.nav {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 18px;
  justify-content: flex-end;
  align-self: stretch;
}
.navList {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 10px;
  align-items: center;
  height: 100%;
}
.navItem {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.navLink {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 10px;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  white-space: nowrap;
}
.navItem.hasMenu .navLink:hover,
.navItem.isOpen .navLink {
  background: rgba(51, 157, 238, 0.925);
}
.chev {
  font-size: 12px;
  opacity: 0.9;
}
.menuWrap {
  position: absolute;
  left: 0;
  top: var(--qs-nav-height);
  width: 30vw;
  min-width: 320px;
  max-width: 480px;
  display: none;
  margin-top: -12px;
  padding-top: 12px;
}
.navItem.isOpen .menuWrap {
  display: block;
}
.topSearch {
  width: 260px;
}
.topSearchInput {
  width: 100%;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 14px;
  outline: none;
}
.topSearchInput::placeholder {
  color: rgba(255, 255, 255, 0.55);
}

@media (max-width: 992px) {
  .burger {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }
  .nav {
    position: fixed;
    top: var(--qs-nav-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(6, 47, 53, 0.98);
    padding: 18px 24px;
    display: none;
    align-items: flex-start;
    flex-direction: column;
    overflow: auto;
  }
  .nav.isOpen {
    display: flex;
  }
  .navList {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
  .menuWrap {
    position: static;
    display: none;
    margin-top: 8px;
    padding-top: 0;
  }
  .navItem.isOpen .menuWrap {
    display: block;
  }
  .topSearch {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
