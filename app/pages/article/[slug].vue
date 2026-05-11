<script setup lang="ts">
// 统一使用 default layout，Hero 背景由 config 控制
import { ref, computed } from 'vue'
import { articlesData } from './data'
import ArticleRenderer from '~/components/ArticleRenderer.vue'
import type { Article } from './data'

const route = useRoute()
const articles = ref<Article[]>(articlesData as Article[])

const article = computed(() => {
  const slug = route.params.slug as string
  return articles.value.find((a) => a.slug === slug) || null
})

useHead({
  title: computed(() =>
    article.value?.title
      ? article.value.title + ' - 北京青颂律师事务所'
      : '文章详情',
  ),
})
</script>

<template>
  <div v-if="article">
    <header class="article-header">
      <div class="qs-container">
        <h1 class="article-header__title">{{ article.title }}</h1>
        <p v-if="article.meta?.date || article.meta?.author" class="article-header__meta">
          <span v-if="article.meta?.date">{{ article.meta.date }}</span>
          <span v-if="article.meta?.author"> · {{ article.meta.author }}</span>
        </p>
      </div>
    </header>
    <ArticleRenderer :article="article" />
  </div>
  <div v-else class="article-notfound">
    <div class="qs-container">
      <p>文章不存在或已被删除</p>
      <NuxtLink to="/article">返回文章列表</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.article-header {
  padding: 40px 0 24px;
  text-align: center;
}
.article-header__title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.3;
}
.article-header__meta {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}
.article-notfound {
  text-align: center;
  padding: 120px 0;
  color: var(--qs-color-text-secondary);
}
.article-notfound a {
  color: var(--qs-color-brand);
  text-decoration: none;
}
</style>
