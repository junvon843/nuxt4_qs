# 北京青颂律师事务所 — 官网前端

青颂律所官方网站，基于 **Nuxt 4** 构建的 SSR 前端应用。

- **线上地址**: https://www.qsonglaw.com
- **后端 API**: Django DRF (端口 8000)

---

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Nuxt | 4.4.5 | 全栈 Vue 框架 |
| Vue | 3.5.34 | 前端框架 |
| Nitro | 2.13.4 | 服务端引擎 |
| Vite | 7.3.3 | 构建工具 |
| TypeScript | 5.x | 类型系统 |

- 纯 CSS（无 UI 框架），基于 `--qs-*` 设计令牌体系
- SSR 默认启用，客户端交互在 `onMounted` 中初始化

---

## 开发环境

### 1. 安装依赖

```bash
npm install
```

### 2. 启动后端 API（另开终端）

后端 Django DRF 运行在 `http://localhost:8000`：

```bash
# 在 backend 目录下
python manage.py runserver 0.0.0.0:8000
```

### 3. 启动前端开发服务器

```bash
npm run dev
# 或指定端口（默认 3000 被占用时用 3001）
npx nuxt dev --port 3001
```

前端运行在 `http://localhost:3001`，API 请求通过 Nitro proxy 自动转发到 `localhost:8000`。

---

## 常用命令

```bash
# 开发
npm run dev              # 默认端口 3000
npx nuxt dev --port 3001 # 指定端口

# 构建
npm run build            # 生产构建
npm run preview          # 预览生产构建

# 类型检查
npx nuxt typecheck       # Vue/TS 类型检查
```

---

## 目录结构

```
app/
  assets/css/
    main.css              # 全局样式入口（设计令牌 + 基础样式）
  components/             # 全局共享组件（Nuxt 自动注册）
    AppHeader.vue         # 顶部导航栏
    AppFooter.vue         # 页脚
    PageHero.vue          # 页面背景 Hero（纯背景层）
    MegaMenu.vue          # 导航下拉菜单
    LawyerCard.vue        # 律师卡片
    ArticleRenderer.vue   # 文章渲染组件
  composables/            # 全局 Composables（自动注册）
    useHero.ts            # 读取当前路由的 Hero 配置
  config/
    hero.config.json      # Hero 背景配置中心
  layouts/
    default.vue           # 默认布局（自动渲染 Hero 背景）
    plain.vue             # 无 Hero 布局（首页、404）
  pages/                  # 文件系统路由
    index.vue             # 首页
    aboutus/              # 关于我们
    attorney/             # 律师列表 / 详情
    article/              # 文章列表 / 详情
    practice-areas/       # 专业领域列表 / 详情
    [...slug].vue         # 404
public/                   # 静态资源（图片、图标）
```

---

## 关键架构

### Hero 背景层

每页（除首页）都有一个由 `hero.config.json` 控制的背景头图：

- **纯背景**：`PageHero.vue` 只渲染 `absolute` 定位的背景图 + 暗色渐变遮罩
- **高度控制**：Config 中的 `height` 决定内容"进入"多少（高 Hero → 内容大量叠放；矮 Hero → 很快离开）
- **页面无感知**：页面正常写内容，白色标题叠在暗色 Hero 上，正文卡片自然过渡到白色背景

### Layout 体系

| Layout | 用途 |
|--------|------|
| `default` | 所有非首页页面（自动渲染 Hero 背景） |
| `plain` | 首页、404（无 Hero 背景） |

### API 代理

后端 API 通过 Nitro `routeRules` 代理：

```ts
// nuxt.config.ts
nitro: {
  routeRules: {
    '/api/**': { proxy: 'http://localhost:8000/api/**' },
  },
}
```

前端使用 `$fetch('/api/firm/attorneys/')` 调用，Nitro 自动代理到 Django DRF。

---

## 路由表

| 路由 | 页面 |
|------|------|
| `/` | 首页 |
| `/aboutus` | 关于我们 |
| `/attorney` | 律师列表 |
| `/attorney/:id` | 律师详情 |
| `/article` | 文章列表 |
| `/article/:slug` | 文章详情 |
| `/practice-areas` | 专业领域列表 |
| `/practice-areas/:slug` | 专业领域详情 |
| `/*` | 404 |

---

## 编码规范

详见 [`AGENTS.md`](./AGENTS.md)。

---

## 许可证

内部项目，版权所有 © 北京青颂律师事务所
