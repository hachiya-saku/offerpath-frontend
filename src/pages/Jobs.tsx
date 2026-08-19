import { ArrowDownUp, ChevronLeft, ChevronRight, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobs, statuses } from '@/data/mockData'

export function Jobs() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('全部状态')
  const [platform, setPlatform] = useState('全部平台')
  const filtered = useMemo(() => jobs.filter(job => {
    const matchesQuery = `${job.company}${job.role}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (status === '全部状态' || job.status === status) && (platform === '全部平台' || job.platform === platform)
  }), [query, status, platform])

  return (
    <div className="page-stack">
      <section className="page-heading"><div><p className="eyebrow">JOB DATABASE</p><h2>所有岗位</h2><p>筛选、比较并持续维护你的求职机会。</p></div><div className="result-count"><strong>{filtered.length}</strong><span>条结果</span></div></section>
      <section className="filter-bar">
        <label className="filter-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索公司或岗位" /></label>
        <label><SlidersHorizontal size={16} /><select value={status} onChange={event => setStatus(event.target.value)}><option>全部状态</option>{statuses.map(item => <option key={item}>{item}</option>)}</select></label>
        <label><select value={platform} onChange={event => setPlatform(event.target.value)}><option>全部平台</option>{[...new Set(jobs.map(job => job.platform))].map(item => <option key={item}>{item}</option>)}</select></label>
        <button className="secondary-button" type="button"><ArrowDownUp size={16} />最近更新</button>
      </section>
      <section className="jobs-list" aria-label="岗位列表">
        <div className="jobs-list-head"><span>公司 / 岗位</span><span>平台</span><span>状态</span><span>匹配度</span><span>更新时间</span><span /></div>
        {filtered.map(job => (
          <button className="job-row" type="button" key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
            <span className="job-company"><span className="company-monogram">{job.company.slice(0, 1)}</span><span><strong>{job.company}</strong><small>{job.role}</small><em><MapPin size={12} />{job.location}</em></span></span>
            <span className="platform-name">{job.platform}</span><span><span className={`status-badge status-${job.status}`}>{job.status}</span></span>
            <span className="match-cell"><strong>{job.match}%</strong><span className="mini-progress"><i style={{ width: `${job.match}%` }} /></span></span>
            <time>{job.updatedAt}</time><ChevronRight size={17} />
          </button>
        ))}
        {filtered.length === 0 && <div className="empty-state"><Search size={24} /><strong>没有符合条件的岗位</strong><span>尝试调整关键词或筛选条件。</span></div>}
      </section>
      <div className="pagination"><span>第 1 页，共 1 页</span><div><button className="icon-button" disabled><ChevronLeft size={17} /></button><button className="page-number">1</button><button className="icon-button" disabled><ChevronRight size={17} /></button></div></div>
    </div>
  )
}
