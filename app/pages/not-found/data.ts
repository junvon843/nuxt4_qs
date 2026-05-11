/**
 * 404 页面 —— 推荐链接数据
 * 纯前端阶段，后续可对接后端 CMS 配置
 */

export interface QuickLink {
  label: string
  path: string
  description?: string
}

export const quickLinks: QuickLink[] = [
  {
    label: '首页',
    path: '/',
    description: '了解青颂律师事务所',
  },
  {
    label: '专业人员',
    path: '/attorney',
    description: '浏览我们的律师团队',
  },
  {
    label: '关于我们',
    path: '#',
    description: '律所简介与文化',
  },
  {
    label: '联系我们',
    path: '#',
    description: '获取法律咨询',
  },
]

/** 生成律师搜索跳转链接 */
export function buildAttorneySearchUrl(query: string): string {
  const q = query.trim()
  if (!q) return '/attorney'
  return `/attorney?search=${encodeURIComponent(q)}`
}
