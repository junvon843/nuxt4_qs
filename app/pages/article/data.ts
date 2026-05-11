export interface ArticleBlock {
  type: 'h2' | 'h3' | 'h4' | 'p' | 'law' | 'case' | 'viewpoint' | 'list-item'
  text?: string
  title?: string
  content?: string
  badge?: string
  caseId?: string
}

export interface Article {
  id: number
  slug: string
  title: string
  subtitle?: string
  lead: string
  tags: string[]
  meta: Record<string, string>
  blocks: ArticleBlock[]
  conclusion?: string
  references: string[]
}

export { default as articlesData } from './articles.json'
