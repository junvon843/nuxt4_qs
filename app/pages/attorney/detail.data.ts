/**
 * 律师详情页数据类型
 */

import type { Lawyer } from './data'

/** 律师详细资料（一对一扩展） */
export interface AttorneyProfile {
  resume: string
  representative_cases: string
  education: string
  qualifications: string
  work_experience: string
  awards: string
  other: string
}

/** 律师详情 = 基础信息 + 详细资料 */
export type LawyerDetail = Lawyer & {
  profile?: AttorneyProfile
}

/** 详情页侧边栏导航项 */
export interface DetailNavItem {
  key: string
  label: string
}

export const detailNavItems: DetailNavItem[] = [
  { key: 'resume', label: '简介' },
  { key: 'representative_cases', label: '代表性案例' },
  { key: 'education', label: '教育背景' },
  { key: 'qualifications', label: '职业资格' },
  { key: 'work_experience', label: '工作经历' },
  { key: 'awards', label: '奖项及社会职务' },
]

export function render_markdown(content: string | undefined | null): string {
  if (!content) return ''
  // Simple fallback: convert newlines to <br> and wrap in <p>
  return '<p>' + content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') + '</p>'
}
