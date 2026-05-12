<script setup lang="ts">
// 统一使用 default layout，Hero 背景由 config 控制
/**
 * LawyerList.vue
 * =============
 * 律师列表页面：
 * - 从后端 API 获取律师数据
 * - 动态加载筛选选项
 * - 用 v-for 循环渲染多个 LawyerCard
 * - 处理 LawyerCard 抛出的事件
 * - 添加交互：筛选、切换布局模式
 */

import { ref, computed, onMounted } from 'vue'
import LawyerCard from '~/components/LawyerCard.vue'
import type { Lawyer } from './data'

// ----------------------------------------
// 响应式状态
// ----------------------------------------

const lawyers = ref<Lawyer[]>([])
const officeOptionsFromApi = ref<string[]>([])
const practiceAreaOptionsFromApi = ref<string[]>([])
const loading = ref(false)
const errorMsg = ref('')

/** 当前布局模式：横向列表 vs 纵向网格 */
const layoutMode = ref<'horizontal' | 'vertical'>('horizontal')

/** 当前选中的专业领域筛选条件 */
const selectedArea = ref<string>('全部')

/** 当前选中的办公室筛选条件 */
const selectedOffice = ref<string>('全部')

// ----------------------------------------
// 计算属性：派生数据
// ----------------------------------------

/** 所有可选的专业领域（包含 "全部"） */
const areaOptions = computed(() => ['全部', ...practiceAreaOptionsFromApi.value])

/** 所有可选的办公室（包含 "全部"） */
const officeOptions = computed(() => ['全部', ...officeOptionsFromApi.value])

/** 根据筛选条件过滤后的律师列表 */
const filteredLawyers = computed(() => {
  return lawyers.value.filter((lawyer) => {
    const matchArea =
      selectedArea.value === '全部' ||
      lawyer.practice_areas.some((a) => a.name === selectedArea.value)

    const matchOffice =
      selectedOffice.value === '全部' || lawyer.office === selectedOffice.value

    return matchArea && matchOffice
  })
})

// ----------------------------------------
// API 请求
// ----------------------------------------

async function fetchLawyers() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<Lawyer[]>('/api/firm/attorneys/')
    lawyers.value = res
  } catch (e) {
    errorMsg.value = '加载律师数据失败，请稍后重试'
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function fetchOptions() {
  try {
    const [officesRes, areasRes] = await Promise.all([
      $fetch<{ offices: string[] }>('/api/firm/attorneys/offices/'),
      $fetch<{ practice_areas: string[] }>('/api/firm/attorneys/practices/'),
    ])
    officeOptionsFromApi.value = officesRes.offices
    practiceAreaOptionsFromApi.value = areasRes.practice_areas
  } catch (e) {
    console.error('加载筛选项失败', e)
  }
}

// ----------------------------------------
// 事件处理
// ----------------------------------------

const router = useRouter()

function onViewDetail(id: number) {
  navigateTo('/attorney/' + id)
}

function onSendEmail(email: string) {
  window.open('mailto:' + email)
}

// ----------------------------------------
// 生命周期
// ----------------------------------------

onMounted(() => {
  fetchLawyers()
  fetchOptions()
})

// ----------------------------------------
// SEO
// ----------------------------------------

useSeoMeta({
  title: '专业人员 - 北京青颂律师事务所',
  description: '青颂律师事务所专业律师团队，覆盖涉外法律咨询、争议解决、执行领域及体育法律服务。',
  ogTitle: '专业人员 - 北京青颂律师事务所',
  ogDescription: '青颂律师事务所专业律师团队，覆盖涉外法律咨询、争议解决、执行领域及体育法律服务。',
  ogImage: 'https://qs-legal.com/head/1.png',
  ogUrl: 'https://qs-legal.com/attorney',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <section class="lawyer-list">
    <div class="qs-container">
      <BreadcrumbNav :items="[{ label: '首页', href: '/' }, { label: '专业人员' }]" />
      <!-- 页面标题 -->
      <header class="lawyer-list__header">
        <h1 class="lawyer-list__title">专业人员</h1>
        <p class="lawyer-list__subtitle">
          我们拥有一支由资深律师组成的专业团队，覆盖多个核心执业领域
        </p>
      </header>

      <!-- 工具栏：筛选器 + 布局切换 -->
      <div class="lawyer-list__toolbar">
        <div class="lawyer-list__filters">
          <!-- 专业领域筛选 -->
          <label class="filter-group">
            <span class="filter-label">专业领域</span>
            <select v-model="selectedArea" class="filter-select">
              <option v-for="opt in areaOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </label>

          <!-- 办公室筛选 -->
          <label class="filter-group">
            <span class="filter-label">办公室</span>
            <select v-model="selectedOffice" class="filter-select">
              <option v-for="opt in officeOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </label>
        </div>

        <!-- 布局切换按钮 -->
        <!-- <div class="lawyer-list__layout-toggle">
          <button
            class="toggle-btn"
            :class="{ 'toggle-btn--active': layoutMode === 'horizontal' }"
            @click="layoutMode = 'horizontal'"
          >
            列表
          </button>
          <button
            class="toggle-btn"
            :class="{ 'toggle-btn--active': layoutMode === 'vertical' }"
            @click="layoutMode = 'vertical'"
          >
            网格
          </button>

        </div> -->

      </div>

      <!-- 结果统计 -->
      <p v-if="!loading && !errorMsg" class="lawyer-list__count">
        共找到 {{ filteredLawyers.length }} 位律师
      </p>

      <!-- 加载与错误状态 -->
      <div v-if="loading" class="lawyer-list__empty">加载中…</div>
      <div v-else-if="errorMsg" class="lawyer-list__empty error">{{ errorMsg }}</div>

      <!--
        律师卡片列表 / 网格
        关键：用同一个 LawyerCard 组件，传入不同的 lawyer 数据
        实现 "一个模板，多份数据" 的复用
      -->
      <div
        v-else
        class="lawyer-list__grid"
        :class="{
          'lawyer-list__grid--list': layoutMode === 'horizontal',
          'lawyer-list__grid--grid': layoutMode === 'vertical',
        }"
      >
        <LawyerCard
          v-for="lawyer in filteredLawyers"
          :key="lawyer.id"
          :lawyer="lawyer"
          :layout="layoutMode"
          @view-detail="onViewDetail"
          @send-email="onSendEmail"
        />
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && !errorMsg && filteredLawyers.length === 0" class="lawyer-list__empty">
        <p>没有找到符合条件的律师，请尝试调整筛选条件。</p>
      </div>
    </div>
  </section>
</template>

<style scoped src="./style.css"></style>
