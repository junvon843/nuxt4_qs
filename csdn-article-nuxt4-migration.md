# 从 Vue 3 SPA 到 Nuxt 4 SSR：律所官网全栈迁移实战与架构设计

> **摘要**：本文记录了北京青颂律师事务所官网从 Vue 3 + Vite SPA 迁移至 Nuxt 4 SSR 的完整过程。涵盖 `app/` 目录结构落地、纯 CSS 设计令牌体系、Hero 配置中心化架构、SEO 全自动方案等核心设计，并总结了 5 个真实踩坑点。项目已开源核心架构思路，适合正在评估 Nuxt 4 的企业前端团队参考。
>
> **技术栈**：Nuxt 4.4.4 + Vue 3.5 + Nitro 2.13 + Vite 7.3 + TypeScript

---

## 一、背景：为什么必须迁？

青颂律所官网最初是 **Vue 3 + Vite SPA** 架构，在开发体验上无可挑剔，但随着业务推进，三个痛点越来越明显：

| 痛点 | 具体表现 | 影响 |
|---|---|---|
| **SEO 盲区** | 百度/Google 收录的只有首页骨架，文章页、律师详情页无法被索引 | 品牌曝光依赖竞价，自然流量几乎为 0 |
| **首屏白屏** | 首屏需要加载 200KB+ JS 后才渲染，弱网环境 3s+ 白屏 | 跳出率极高，移动端体验差 |
| **多页面重复劳动** | 每个页面都要手动引入 Header/Footer/Hero，路由与组件耦合严重 | 新增页面成本高，样式不统一 |

我们评估了 Next.js、Astro、Nuxt 4 三个方案，最终选择 Nuxt 4 的原因很务实：

1. **团队 Vue 技术栈沉淀深厚**，迁移成本最低；
2. **Nuxt 4 的 `app/` 目录** 让项目结构更清晰，适合长期维护；
3. **Nitro 引擎** 自带 API 代理、边缘渲染能力，能与现有 Django 后端无缝衔接；
4. **@nuxtjs/seo 模块** 一键解决 sitemap、robots、OG 标签、Schema.org 等 SEO 需求。

---

## 二、架构总览：迁移后的项目结构

```
qsong_nuxt/
├── app/                          # Nuxt 4 应用核心（app/ 目录）
│   ├── assets/css/main.css       # 全局设计令牌 + 基础样式
│   ├── components/               # 自动注册的公共组件
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── PageHero.vue          # 纯背景层 Hero
│   │   ├── BreadcrumbBar.vue
│   │   └── LawyerCard.vue
│   ├── composables/              # 自动注册的全局组合式函数
│   │   └── useHero.ts            # Hero 配置读取逻辑
│   ├── config/
│   │   └── hero.config.json      # 路由级 Hero 配置中心
│   ├── layouts/
│   │   ├── default.vue           # 带 Hero 的默认布局
│   │   └── plain.vue             # 无 Hero 布局（首页/404）
│   ├── pages/                    # 文件系统路由
│   │   ├── index.vue
│   │   ├── aboutus/
│   │   ├── attorney/             # 列表 + 详情动态路由
│   │   ├── article/              # 文章列表 + slug 详情
│   │   ├── practice-areas/
│   │   └── [...slug].vue         # 404 catch-all
│   └── app.vue
├── public/                       # 静态资源（图片、字体）
├── nuxt.config.ts                # 全站配置（SEO、代理、Sitemap）
└── package.json
```

**关键设计原则**：
- 全局共享 → `components/`、`composables/`、`assets/css/`
- 页面专用 → `pages/<route>/` 下自包含（数据、样式、子组件）
- 配置中心 → `app/config/` 放路由级功能配置

---

## 三、核心改造详解

### 3.1 PageHero 纯背景化：让 Layout 接管视觉层

传统做法是每个页面自己引入 Hero 组件，传入标题、副标题、按钮，导致：
- 页面代码臃肿；
- 标题样式难以统一；
- 响应式断点散落各处。

我们的改造思路是：**Hero 只负责背景，内容完全由页面控制**。

```vue
<!-- app/components/PageHero.vue -->
<script setup lang="ts">
interface Props {
  image?: string
  height?: string
}
withDefaults(defineProps<Props>(), {
  image: '/attorneys/attorney-header.png',
  height: '55vh',
})
</script>

<template>
  <section
    class="page-hero"
    :style="{
      backgroundImage: image
        ? `linear-gradient(180deg, rgba(6,47,53,0.32), rgba(6,47,53,0.52)), url(${image})`
        : `linear-gradient(180deg, rgba(6,47,53,0.32), rgba(6,47,53,0.52))`,
      height,
    }"
  />
</template>

<style scoped>
.page-hero {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
}
</style>
```

**效果**：Hero 是 `absolute` 定位的纯背景层，`main` 内容自然叠放在上面，通过 `padding-top` 控制内容进入 Hero 的深度。

### 3.2 Hero 配置中心化：JSON 驱动路由视觉

所有路由的 Hero 背景统一收敛到一份 JSON：

```json
{
  "attorney":       { "image": "/head/1.png", "height": "52vh" },
  "attorney-id":    { "image": "/head/2.png", "height": "60vh" },
  "article":        { "image": "/head/4.png", "height": "45vh" },
  "article-slug":   { "image": "/head/5.png", "height": "30vh" },
  "practice-areas": { "image": "/head/7.png", "height": "25vh" }
}
```

配合 `useHero` composable，Layout 自动感知当前路由该渲染什么 Hero：

```ts
// app/composables/useHero.ts
import heroConfig from '~/config/hero.config.json'

export function useHero() {
  const route = useRoute()

  const hero = computed(() => {
    const config = heroConfig[route.name as string]
    if (!config) return { show: false }

    return {
      show: true,
      image: config.image,
      height: config.height,
    }
  })

  return { hero }
}
```

```vue
<!-- app/layouts/default.vue -->
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
```

**收益**：
- 新增页面无需关心 Hero，专注写内容；
- 运营/设计同学可以直接改 JSON 调整背景图和高度，无需动代码；
- 路由名不在配置中 → 自动不显示 Hero（如首页、404）。

### 3.3 页面无感知原则

迁移后，页面组件极其干净：

- **不需要** `definePageMeta({ layout: ... })` —— 默认自动用 `default.vue`；
- **不需要** import PageHero —— Layout 自动渲染；
- **不需要** import `useRoute` / `useRouter` / `useHead` —— Nuxt 自动导入；
- 标题、副标题由页面自己控制，白色文字叠在暗色 Hero 渐变上。

```vue
<!-- app/pages/attorney/index.vue（节选） -->
<script setup lang="ts">
useSeoMeta({
  title: '专业人员 - 北京青颂律师事务所',
  description: '青颂律师事务所专业律师团队...',
  ogImage: 'https://qs-legal.com/head/1.png',
})

const lawyers = ref<Lawyer[]>([])
// ... 筛选逻辑
</script>

<template>
  <div class="attorney-page">
    <BreadcrumbBar :items="[...]" />
    <section class="lawyer-list">
      <div class="qs-container">
        <h1 class="lawyer-list__title">专业人员</h1>
        <!-- 内容自然叠放在 Hero 背景上 -->
      </div>
    </section>
  </div>
</template>

<style scoped src="./style.css"></style>
```

### 3.4 纯 CSS 设计令牌：零 UI 框架依赖

律所官网对视觉一致性要求极高，但我们**拒绝引入 Element Plus / Ant Design** 等 UI 框架——官网不是后台系统，每个按钮、卡片、间距都需要定制。

我们在 `:root` 中定义了完整的 `--qs-*` 设计令牌：

```css
/* assets/css/main.css */
:root {
  --qs-color-bg: #ffffff;
  --qs-color-text: #0b0f14;
  --qs-color-brand: #b6c800;
  --qs-color-teal-900: #0b3e46;
  --qs-color-teal-950: #062f35;
  --qs-color-card: rgba(255, 255, 255, 0.06);
  --qs-radius: 8px;
  --qs-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  --qs-container: 1200px;
  --qs-nav-height: 72px;
  --qs-font-sans: ui-sans-serif, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.qs-container {
  width: min(var(--qs-container), calc(100% - 48px));
  margin: 0 auto;
}
```

页面局部变量再基于令牌派生，例如 `pages/aboutus/style.css` 中定义 `--about-*` 系列变量。**全程未引入任何 UI 框架，打包体积减少约 180KB（gzip）**。

### 3.5 SEO 全自动：从 0 到索引全覆盖

Nuxt 4 + `@nuxtjs/seo` 让 SEO 配置从"体力活"变成"声明式"：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],

  site: {
    url: 'https://qs-legal.com',
    name: '北京青颂律师事务所',
    description: '青颂律师事务所 - 专业商事争议解决法律服务',
    defaultLocale: 'zh-CN',
  },

  sitemap: {
    urls: async () => {
      // 1. 静态文章页
      const urls = articlesData.map(a => ({
        loc: `/article/${a.slug}`,
        lastmod: a.meta?.date,
        priority: 0.7,
      }))

      // 2. 动态律师详情页（从 Django API 拉取）
      try {
        const lawyers = await $fetch('http://localhost:8000/api/firm/attorneys/')
        lawyers.forEach(l => {
          urls.push({ loc: `/attorney/${l.id}`, priority: 0.7 })
        })
      } catch {
        // 后端未启动时静默忽略，不影响构建
      }

      return urls
    },
  },

  robots: {
    disallow: ['/api/', '/_nuxt/', '/__nuxt_devtools__'],
  },

  ogImage: {
    defaults: {
      component: 'NuxtSeo',
      props: {
        title: '北京青颂律师事务所',
        description: '...',
        image: '/about/about_us/heading.png',
      },
    },
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: '北京青颂律师事务所',
      url: 'https://qs-legal.com',
      logo: 'https://qs-legal.com/favicon.ico',
    },
  },
})
```

**效果**：
- `sitemap.xml` 自动生成，包含 30+ 文章页和 20+ 律师详情页；
- 每个页面自动注入 OG 标签和 Schema.org 结构化数据；
- 百度站长工具提交 sitemap 后，文章页 3 天内完成收录。

### 3.6 后端 API 代理：Nitro 一行配置解决跨域

律所后端是 Django DRF，Nuxt 4 的 Nitro 配置代理即可：

```ts
nitro: {
  routeRules: {
    '/api/**': { proxy: 'http://localhost:8000/api/**' },
  },
}
```

前端代码中直接 `$fetch('/api/firm/attorneys/')`，既享受 SSR 时的服务端直调（无跨域），又保持客户端水合后的同构体验。

---

## 四、真实踩坑记录（5 个必看）

### 坑 1：`useAsyncData` 在组件间共享数据的副作用

Nuxt 4 优化了同 key 的 `useAsyncData` 共享数据，但我们有多个页面用相同的 key 拉取律师列表，导致路由切换时**旧数据瞬间闪现**。

**解决**：为每个页面级请求显式声明唯一 key，或改用 `$fetch`（非响应式但无缓存副作用）。

```ts
// 错误
const { data } = await useAsyncData('lawyers', () => $fetch('/api/lawyers'))

// 正确
const { data } = await useAsyncData(`lawyers-${route.path}`, () => $fetch('/api/lawyers'))
```

### 坑 2：SSR 环境下 `window` / `document` 报错

SPA 时代习惯于在 `<script setup>` 顶层访问 `document`，迁移后构建直接报错 `window is not defined`。

**解决**：所有 DOM 操作必须包裹在 `onMounted` 中，或封装为客户端插件：

```ts
onMounted(() => {
  // 初始化 Swiper、AOS 动画等
})
```

### 坑 3：TypeScript 项目引用导致类型推断延迟

Nuxt 4 默认使用多项目引用（project references），IDE 偶尔出现类型推断失效。

**解决**：重启 TS Server，或在 `tsconfig.json` 中显式加入 `"types": ["@nuxt/types"]`。

### 坑 4：Sitemap 构建时后端未启动导致失败

`sitemap.urls` 中调用后端 API 生成动态路由，但 CI 构建时 Django 服务没起。

**解决**：`try/catch` 静默忽略，保证构建不中断；动态路由的 sitemap 在部署后通过 nightly job 更新。

### 坑 5：纯 CSS 方案下的深色 Hero + 白色标题

Hero 有暗色渐变遮罩，标题用 `#fff`，但离开 Hero 区域后的正文标题如果也是白色会看不见。

**解决**：正文卡片统一使用白色背景（`--qs-color-surface: #ffffff`），自然过渡；只有叠放在 Hero 上的标题用白色。

---

## 五、迁移收益复盘

| 指标 | 迁移前（SPA） | 迁移后（Nuxt 4 SSR） | 变化 |
|---|---|---|---|
| **首屏渲染方式** | 客户端渲染（CSR） | 服务端渲染（SSR）+ 水合 | 白屏消失 |
| **SEO 收录页** | 仅首页 | 首页 + 文章 + 律师 + 业务领域 | 收录量 10x+ |
| **JS 首包体积** | ~210KB（含 UI 框架） | ~65KB（纯业务逻辑） | **减少 69%** |
| **Lighthouse 性能** | 52（移动） | 89（移动） | **+37 分** |
| **Lighthouse SEO** | 62 | 100 | **+38 分** |
| **新增页面成本** | 30min（配置路由+Layout+Hero） | 5min（写页面内容即可） | **效率 6x** |

> *注：Lighthouse 数据为 Chrome 无痕模式 4G 节流 3 次取平均值。*

---

## 六、写给想迁移的同学

如果你也在维护一个 Vue 3 SPA 项目，正在纠结要不要上 Nuxt 4，我的建议是：

1. **如果 SEO 是自然流量的核心渠道** → 必须迁，SSR 不是可选项；
2. **如果团队只有 1-2 个前端** → Nuxt 4 的约定优于配置能大幅减少样板代码；
3. **如果后端是独立 API 服务** → Nitro 的代理和缓存策略让前后端协作成本极低；
4. **如果担心迁移风险** → Nuxt 4 对旧结构兼容很好，可以渐进式迁移，先迁一个页面验证。

Nuxt 4 不是炫技，它是**让企业级前端开发回归简单**的一次进化。

---

## 七、附录：关键文件速查

| 文件 | 作用 |
|---|---|
| `nuxt.config.ts` | 全站 SEO、代理、Sitemap、OG 配置 |
| `app/layouts/default.vue` | 统一布局：Header + Hero(条件) + Footer |
| `app/components/PageHero.vue` | 纯背景层，接收 image + height |
| `app/composables/useHero.ts` | 读取当前路由的 Hero 配置 |
| `app/config/hero.config.json` | 路由级 Hero 背景配置中心 |
| `app/assets/css/main.css` | `--qs-*` 设计令牌与基础样式 |

---

> **关于作者**：青颂律所前端负责人，专注 Vue/Nuxt 生态与企业级工程化。如有问题欢迎在评论区交流。
>
> **版权声明**：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
