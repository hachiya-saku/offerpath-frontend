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

export const statuses: JobStatus[] = ['想投', '已投', '书类选考', '一面', '二面', '三面', '终面', 'offer', '挂了']

export const jobs: Job[] = [
  { id: 1, company: 'Layer Nine株式会社', role: 'フロントエンドエンジニア', platform: 'Green', location: '東京都・ハイブリッド', salary: '500万〜750万円', status: '二面', match: 88, updatedAt: '今日 14:20', requiredSkills: ['React', 'TypeScript', 'REST API'], bonusSkills: ['Next.js', 'E2E', 'デザインシステム'], note: 'プロダクトチームとの二次面接。設計判断とチーム開発について準備する。', url: 'https://example.com/jobs/1' },
  { id: 2, company: 'Northstar Labs', role: 'Frontend Developer', platform: 'Wantedly', location: '東京・リモート可', salary: '550万〜800万円', status: '一面', match: 82, updatedAt: '昨日 18:40', requiredSkills: ['React', 'TypeScript', 'CSS'], bonusSkills: ['GraphQL', 'Storybook'], note: 'カジュアル面談済み。開発文化とコードレビューについて確認したい。', url: 'https://example.com/jobs/2' },
  { id: 3, company: '株式会社モノリス', role: 'Webアプリケーションエンジニア', platform: '企業サイト', location: '神奈川県', salary: '480万〜680万円', status: '书类选考', match: 76, updatedAt: '8月17日', requiredSkills: ['JavaScript', 'React', 'Git'], bonusSkills: ['Node.js', 'AWS'], note: 'ポートフォリオ提出済み。', url: 'https://example.com/jobs/3' },
  { id: 4, company: 'Orbit Works', role: 'UI Engineer', platform: 'LinkedIn', location: 'フルリモート', salary: '600万〜900万円', status: '想投', match: 91, updatedAt: '8月16日', requiredSkills: ['React', 'TypeScript', 'Accessibility'], bonusSkills: ['Figma', 'Design Tokens'], note: '英語の職務経歴書を整えてから応募する。', url: 'https://example.com/jobs/4' },
  { id: 5, company: 'Data Loom株式会社', role: 'プロダクトエンジニア', platform: 'Green', location: '東京都', salary: '500万〜700万円', status: '已投', match: 69, updatedAt: '8月14日', requiredSkills: ['React', 'SQL', 'API Design'], bonusSkills: ['Python', 'Data Visualization'], note: '応募完了。返信待ち。', url: 'https://example.com/jobs/5' },
  { id: 6, company: 'Cloud Harbor', role: 'Frontend Engineer', platform: 'Indeed', location: '大阪府', salary: '450万〜650万円', status: '挂了', match: 61, updatedAt: '8月10日', requiredSkills: ['Vue', 'JavaScript'], bonusSkills: ['React', 'Docker'], note: '書類選考で終了。Vueの実務経験が不足。', url: 'https://example.com/jobs/6' },
]

export const skills = [
  { name: 'React', level: '熟练', years: '2年', color: 'purple' },
  { name: 'TypeScript', level: '一般', years: '1年', color: 'blue' },
  { name: 'JavaScript', level: '熟练', years: '3年', color: 'green' },
  { name: 'CSS / Tailwind', level: '一般', years: '2年', color: 'pink' },
  { name: 'Node.js', level: '了解', years: '6个月', color: 'amber' },
  { name: 'PostgreSQL', level: '了解', years: '学习中', color: 'cyan' },
]
