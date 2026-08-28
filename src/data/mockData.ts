export type JobStatus = '想投' | '已投' | '书类选考' | '一面' | '二面' | '三面' | '终面' | 'offer' | '挂了'

export type Job = {
  id: number
  company: string
  role: string
  platform: string
  location: string
  salary: string
  status: JobStatus
  match: number
  updatedAt: string
  requiredSkills: string[]
  bonusSkills: string[]
  note: string
  url: string
}

export type Company = {
  id: string
  name: string
  website?: string
  industry?: string
  size?: string
  location?: string
  description?: string
  notes?: string
}

export const statuses: JobStatus[] = ['想投', '已投', '书类选考', '一面', '二面', '三面', '终面', 'offer', '挂了']

export const recruitmentPlatforms = [
  'Green',
  'Wantedly',
  'LinkedIn',
  'Indeed',
  '企业官网',
  'doda',
  'マイナビ転職',
  'リクナビNEXT',
  'エン転職',
  '求人ボックス',
] as const

export const jobs: Job[] = [
  { id: 1, company: 'Layer Nine株式会社', role: 'フロントエンドエンジニア', platform: 'Green', location: '東京都・ハイブリッド', salary: '500万〜750万円', status: '二面', match: 88, updatedAt: '今日 14:20', requiredSkills: ['React', 'TypeScript', 'REST API'], bonusSkills: ['Next.js', 'E2E', 'デザインシステム'], note: 'プロダクトチームとの二次面接。設計判断とチーム開発について準備する。', url: 'https://example.com/jobs/1' },
  { id: 2, company: 'Northstar Labs', role: 'Frontend Developer', platform: 'Wantedly', location: '東京・リモート可', salary: '550万〜800万円', status: '一面', match: 82, updatedAt: '昨日 18:40', requiredSkills: ['React', 'TypeScript', 'CSS'], bonusSkills: ['GraphQL', 'Storybook'], note: 'カジュアル面談済み。開発文化とコードレビューについて確認したい。', url: 'https://example.com/jobs/2' },
  { id: 3, company: '株式会社モノリス', role: 'Webアプリケーションエンジニア', platform: '企業サイト', location: '神奈川県', salary: '480万〜680万円', status: '书类选考', match: 76, updatedAt: '8月17日', requiredSkills: ['JavaScript', 'React', 'Git'], bonusSkills: ['Node.js', 'AWS'], note: 'ポートフォリオ提出済み。', url: 'https://example.com/jobs/3' },
  { id: 4, company: 'Orbit Works', role: 'UI Engineer', platform: 'LinkedIn', location: 'フルリモート', salary: '600万〜900万円', status: '想投', match: 91, updatedAt: '8月16日', requiredSkills: ['React', 'TypeScript', 'Accessibility'], bonusSkills: ['Figma', 'Design Tokens'], note: '英語の職務経歴書を整えてから応募する。', url: 'https://example.com/jobs/4' },
  { id: 5, company: 'Data Loom株式会社', role: 'プロダクトエンジニア', platform: 'Green', location: '東京都', salary: '500万〜700万円', status: '已投', match: 69, updatedAt: '8月14日', requiredSkills: ['React', 'SQL', 'API Design'], bonusSkills: ['Python', 'Data Visualization'], note: '応募完了。返信待ち。', url: 'https://example.com/jobs/5' },
  { id: 6, company: 'Cloud Harbor', role: 'Frontend Engineer', platform: 'Indeed', location: '大阪府', salary: '450万〜650万円', status: '挂了', match: 61, updatedAt: '8月10日', requiredSkills: ['Vue', 'JavaScript'], bonusSkills: ['React', 'Docker'], note: '書類選考で終了。Vueの実務経験が不足。', url: 'https://example.com/jobs/6' },
]

export const companies: Company[] = [
  { id: 'company-1', name: 'Layer Nine株式会社', website: 'https://example.com', industry: 'SaaS / HR Tech', size: '51〜100名', location: '東京都渋谷区', description: '採用業務と人材配置を支援するB2B SaaSを開発するプロダクト企業。', notes: '技術面接では設計判断とチーム開発の経験を重点的に確認する。' },
  { id: 'company-2', name: 'Northstar Labs', website: 'https://example.com', industry: 'Software / AI', size: '11〜50名', location: '東京都港区', description: 'AIを活用した業務支援プロダクトを開発するスタートアップ。', notes: '英語を使用する機会あり。リモート勤務制度を確認する。' },
  { id: 'company-3', name: '株式会社モノリス', industry: 'Webサービス', size: '101〜300名', location: '神奈川県横浜市', description: '企業向けWebサービスの企画・開発・運用を行う。' },
  { id: 'company-4', name: 'Orbit Works', website: 'https://example.com', industry: 'Design Technology', size: '11〜50名', location: 'フルリモート', description: 'デザインシステムとアクセシビリティを重視した開発組織。' },
  { id: 'company-5', name: 'Data Loom株式会社', industry: 'Data Platform', size: '51〜100名', location: '東京都千代田区', description: 'データ活用基盤と可視化プロダクトを提供する企業。' },
  { id: 'company-6', name: 'Cloud Harbor', industry: 'Cloud Services', size: '101〜300名', location: '大阪府大阪市', description: 'クラウド導入と業務システム開発を支援するIT企業。' },
]

export const skills = [
  { name: 'React', level: '熟练', years: '2年', color: 'purple' },
  { name: 'TypeScript', level: '一般', years: '1年', color: 'blue' },
  { name: 'JavaScript', level: '熟练', years: '3年', color: 'green' },
  { name: 'CSS / Tailwind', level: '一般', years: '2年', color: 'pink' },
  { name: 'Node.js', level: '了解', years: '6个月', color: 'amber' },
  { name: 'PostgreSQL', level: '了解', years: '学习中', color: 'cyan' },
]
