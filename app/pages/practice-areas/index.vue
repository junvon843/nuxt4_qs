<script setup lang="ts">
// 统一使用 default layout，Hero 背景由 config 控制
import { ref } from 'vue'
import { practicesData } from './data'
import type { Practice } from './data'

const practices = ref<Practice[]>(practicesData as Practice[])

function goDetail(slug: string) {
  navigateTo('/practice-areas/' + slug)
}

useSeoMeta({
  title: '专业领域 - 北京青颂律师事务所',
  description: '青颂律师事务所专注商事法律领域，涵盖涉外法律咨询、争议解决、执行领域及体育法律服务。',
  ogTitle: '专业领域 - 北京青颂律师事务所',
  ogDescription: '青颂律师事务所专注商事法律领域，涵盖涉外法律咨询、争议解决、执行领域及体育法律服务。',
  ogImage: 'https://qs-legal.com/head/7.png',
  ogUrl: 'https://qs-legal.com/practice-areas',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <section class="pa-list">
    <div class="qs-container">
      <BreadcrumbNav :items="[{ label: '首页', href: '/' }, { label: '专业领域' }]" />
      <header class="pa-list__header">
        <h1 class="pa-list__title">专业领域</h1>
        <p class="pa-list__subtitle">
          青颂专注商事法律领域，为客户提供专业、务实的法律服务
        </p>
      </header>

      <div class="pa-cards">
        <article
          v-for="p in practices"
          :key="p.slug"
          class="pa-card"
          @click="goDetail(p.slug)"
        >
          <h3 class="pa-card__title">{{ p.name }}</h3>
          <p class="pa-card__lead">{{ p.overview[0]?.slice(0, 100) }}...</p>
          <span class="pa-card__more">了解详情 →</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="./style.css"></style>
