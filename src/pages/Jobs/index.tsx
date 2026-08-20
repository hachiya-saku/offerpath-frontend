import {
  ArrowDownUp,
  Banknote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { jobs, recruitmentPlatforms, statuses } from '@/data/mockData'
import './style.css'

const ALL_STATUSES = '全部状态'
const ALL_PLATFORMS = '全部平台'
const ALL_REQUIRED_SKILLS = '全部必须技能'
const ALL_BONUS_SKILLS = '全部加分技能'
const ALL_LOCATIONS = '全部地点'

type SortMode = 'newest' | 'oldest' | 'match' | 'salary'

const getSalaryRange = (salary: string) => {
  const values = salary.match(/\d+/g)?.map(Number) ?? []
  return { min: values[0] ?? 0, max: values[1] ?? values[0] ?? 0 }
}

export function Jobs() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState(ALL_STATUSES)
  const [platform, setPlatform] = useState(ALL_PLATFORMS)
  const [requiredSkill, setRequiredSkill] = useState(ALL_REQUIRED_SKILLS)
  const [bonusSkill, setBonusSkill] = useState(ALL_BONUS_SKILLS)
  const [location, setLocation] = useState(ALL_LOCATIONS)
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [minimumMatch, setMinimumMatch] = useState('0')
  const [sortMode, setSortMode] = useState<SortMode>('newest')

  const platformOptions = useMemo(
    () => [...new Set([...recruitmentPlatforms, ...jobs.map(job => job.platform)])],
    [],
  )
  const locations = useMemo(() => [...new Set(jobs.map(job => job.location))], [])
  const requiredSkills = useMemo(
    () => [...new Set(jobs.flatMap(job => job.requiredSkills))].sort(),
    [],
  )
  const bonusSkills = useMemo(
    () => [...new Set(jobs.flatMap(job => job.bonusSkills))].sort(),
    [],
  )

  const filtered = useMemo(() => jobs.filter(job => {
    const normalizedQuery = query.trim().toLowerCase()
    const salary = getSalaryRange(job.salary)
    const selectedSalaryMin = Number(salaryMin) || 0
    const selectedSalaryMax = Number(salaryMax) || Number.POSITIVE_INFINITY
    const matchesQuery = `${job.company} ${job.role}`.toLowerCase().includes(normalizedQuery)
    const matchesSalary = salary.max >= selectedSalaryMin && salary.min <= selectedSalaryMax

    return matchesQuery
      && (status === ALL_STATUSES || job.status === status)
      && (platform === ALL_PLATFORMS || job.platform === platform)
      && (requiredSkill === ALL_REQUIRED_SKILLS || job.requiredSkills.includes(requiredSkill))
      && (bonusSkill === ALL_BONUS_SKILLS || job.bonusSkills.includes(bonusSkill))
      && (location === ALL_LOCATIONS || job.location === location)
      && job.match >= Number(minimumMatch)
      && matchesSalary
  }).sort((first, second) => {
    if (sortMode === 'oldest') return second.id - first.id
    if (sortMode === 'match') return second.match - first.match
    if (sortMode === 'salary') return getSalaryRange(second.salary).max - getSalaryRange(first.salary).max
    return first.id - second.id
  }), [bonusSkill, location, minimumMatch, platform, query, requiredSkill, salaryMax, salaryMin, sortMode, status])

  const resetFilters = () => {
    setQuery('')
    setStatus(ALL_STATUSES)
    setPlatform(ALL_PLATFORMS)
    setRequiredSkill(ALL_REQUIRED_SKILLS)
    setBonusSkill(ALL_BONUS_SKILLS)
    setLocation(ALL_LOCATIONS)
    setSalaryMin('')
    setSalaryMax('')
    setMinimumMatch('0')
    setSortMode('newest')
  }

  return (
    <div className="grid gap-6">
      <section className="page-heading">
        <div><p className="eyebrow">JOB DATABASE</p><h2>所有岗位</h2><p>筛选、比较并持续维护你的求职机会。</p></div>
        <div className="result-count"><strong>{filtered.length}</strong><span>条结果</span></div>
      </section>

      <section className="filter-panel" aria-label="岗位筛选">
        <div className="filter-bar">
          <label className="filter-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索公司或岗位" /></label>
          <label><SlidersHorizontal size={16} /><select value={status} onChange={event => setStatus(event.target.value)}><option>{ALL_STATUSES}</option>{statuses.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><select value={platform} onChange={event => setPlatform(event.target.value)}><option>{ALL_PLATFORMS}</option>{platformOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><ArrowDownUp size={16} /><select value={sortMode} onChange={event => setSortMode(event.target.value as SortMode)}><option value="newest">最近更新</option><option value="oldest">最早更新</option><option value="match">匹配度最高</option><option value="salary">薪资最高</option></select></label>
        </div>
        <div className="advanced-filters">
          <label className="salary-filter"><Banknote size={16} /><span>年薪</span><input type="number" min="0" value={salaryMin} onChange={event => setSalaryMin(event.target.value)} placeholder="最低" /><i>至</i><input type="number" min="0" value={salaryMax} onChange={event => setSalaryMax(event.target.value)} placeholder="最高" /><em>万円</em></label>
          <label><span>必须技能</span><select value={requiredSkill} onChange={event => setRequiredSkill(event.target.value)}><option>{ALL_REQUIRED_SKILLS}</option>{requiredSkills.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span>加分技能</span><select value={bonusSkill} onChange={event => setBonusSkill(event.target.value)}><option>{ALL_BONUS_SKILLS}</option>{bonusSkills.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span>工作地点</span><select value={location} onChange={event => setLocation(event.target.value)}><option>{ALL_LOCATIONS}</option>{locations.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span>最低匹配度</span><select value={minimumMatch} onChange={event => setMinimumMatch(event.target.value)}><option value="0">不限</option><option value="60">60% 以上</option><option value="70">70% 以上</option><option value="80">80% 以上</option><option value="90">90% 以上</option></select></label>
          <Button className="filter-reset" variant="ghost" size="sm" type="button" onClick={resetFilters}><RotateCcw size={14} />重置</Button>
        </div>
      </section>

      <section className="jobs-list" aria-label="岗位列表">
        <div className="jobs-list-head"><span>公司 / 岗位</span><span>平台</span><span>状态</span><span>匹配度</span><span>更新时间</span><span /></div>
        {filtered.map(job => (
          <button className="job-row" type="button" key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
            <span className="job-company">
              <span className="company-monogram">{job.company.slice(0, 1)}</span>
              <span><strong>{job.company}</strong><small>{job.role}</small><em><span><MapPin size={12} />{job.location}</span><span><Banknote size={12} />{job.salary}</span></em></span>
            </span>
            <span className="platform-name">{job.platform}</span><span><span className={`status-badge status-${job.status}`}>{job.status}</span></span>
            <span className="match-cell"><strong>{job.match}%</strong><span className="mini-progress"><i style={{ width: `${job.match}%` }} /></span></span>
            <time>{job.updatedAt}</time><ChevronRight size={17} />
          </button>
        ))}
        {filtered.length === 0 && <div className="empty-state"><Search size={24} /><strong>没有符合条件的岗位</strong><span>尝试调整关键词或筛选条件。</span><Button className="filter-reset" variant="ghost" size="sm" type="button" onClick={resetFilters}><RotateCcw size={14} />清除全部筛选</Button></div>}
      </section>
      <div className="pagination"><span>第 1 页，共 1 页</span><div><Button className="icon-button" variant="ghost" size="icon" disabled><ChevronLeft size={17} /></Button><Button className="page-number" variant="outline" size="icon">1</Button><Button className="icon-button" variant="ghost" size="icon" disabled><ChevronRight size={17} /></Button></div></div>
    </div>
  )
}
