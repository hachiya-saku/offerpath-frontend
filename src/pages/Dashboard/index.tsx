import { ArrowUpRight, BriefcaseBusiness, CalendarClock, CheckCircle2, Target } from 'lucide-react'
import ReactECharts from 'echarts-for-react'
import { useNavigate } from 'react-router-dom'
import { jobs } from '@/data/mockData'
import './style.css'

const stats = [
  { label: '追踪岗位', value: '24', detail: '本月新增 6 个', icon: BriefcaseBusiness, tone: 'purple' },
  { label: '进行中', value: '8', detail: '3 个等待面试', icon: CalendarClock, tone: 'blue' },
  { label: '平均匹配度', value: '78%', detail: '较上周 +4%', icon: Target, tone: 'green' },
  { label: '收到 Offer', value: '2', detail: '转化率 8.3%', icon: CheckCircle2, tone: 'amber' },
]

const chartOption = {
  animation: false,
  backgroundColor: 'transparent',
  tooltip: { trigger: 'item', backgroundColor: '#17151d', borderColor: '#34303c', textStyle: { color: '#f6f4f8' } },
  legend: { bottom: 0, left: 'center', textStyle: { color: '#8f8998' }, itemWidth: 10, itemHeight: 10 },
  series: [{
    type: 'pie', radius: ['48%', '72%'], center: ['50%', '42%'], avoidLabelOverlap: true,
    itemStyle: { borderColor: '#111014', borderWidth: 4, borderRadius: 3 }, label: { show: false },
    data: [
      { value: 7, name: '计划投递', itemStyle: { color: '#8b5cf6' } },
      { value: 9, name: '选考中', itemStyle: { color: '#5b7cfa' } },
      { value: 5, name: '面试中', itemStyle: { color: '#2dd4bf' } },
      { value: 3, name: '已结束', itemStyle: { color: '#44404b' } },
    ],
  }],
}

export function Dashboard() {
  const navigate = useNavigate()
  return (
    <div className="page-stack">
      <section className="page-heading">
        <div><p className="eyebrow">2026 / AUGUST</p><h2>求职进度一览</h2><p>集中查看当前投递、面试安排与岗位匹配情况。</p></div>
        <div className="date-chip"><span>距离十月末</span><strong>73 天</strong></div>
      </section>

      <section className="stats-grid" aria-label="核心统计">
        {stats.map(({ label, value, detail, icon: Icon, tone }) => (
          <article className="stat-card" key={label}>
            <span className={`stat-icon ${tone}`}><Icon size={19} /></span>
            <p>{label}</p><strong>{value}</strong><small>{detail}</small>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="panel chart-panel">
          <div className="panel-heading"><div><p className="eyebrow">PIPELINE</p><h3>岗位状态分布</h3></div><button className="text-button" type="button" onClick={() => navigate('/jobs')}>查看全部<ArrowUpRight size={15} /></button></div>
          <ReactECharts option={chartOption} style={{ height: 310 }} opts={{ renderer: 'svg' }} />
        </div>
        <div className="panel conversion-panel">
          <div className="panel-heading"><div><p className="eyebrow">CONVERSION</p><h3>阶段转化率</h3></div><span className="live-dot">实时</span></div>
          <div className="conversion-row"><div><span>已投递</span><strong>18</strong></div><div className="progress-track"><span style={{ width: '100%' }} /></div><small>100%</small></div>
          <div className="conversion-row"><div><span>进入面试</span><strong>8</strong></div><div className="progress-track"><span style={{ width: '44%' }} /></div><small>44%</small></div>
          <div className="conversion-row"><div><span>终面通过</span><strong>3</strong></div><div className="progress-track"><span style={{ width: '17%' }} /></div><small>17%</small></div>
          <div className="conversion-row"><div><span>收到 Offer</span><strong>2</strong></div><div className="progress-track"><span style={{ width: '11%' }} /></div><small>11%</small></div>
          <div className="conversion-note"><Target size={18} /><p><strong>本月目标</strong><span>保持 40% 以上的面试转化率</span></p></div>
        </div>
      </section>

      <section className="panel recent-panel">
        <div className="panel-heading"><div><p className="eyebrow">RECENT ACTIVITY</p><h3>最近更新的岗位</h3></div><button className="text-button" type="button" onClick={() => navigate('/jobs')}>岗位一览<ArrowUpRight size={15} /></button></div>
        <div className="compact-table">
          {jobs.slice(0, 4).map(job => (
            <button type="button" className="compact-row" key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
              <span className="company-monogram">{job.company.slice(0, 1)}</span>
              <span className="job-primary"><strong>{job.company}</strong><small>{job.role}</small></span>
              <span className={`status-badge status-${job.status}`}>{job.status}</span>
              <span className="match-value"><strong>{job.match}%</strong><small>匹配度</small></span>
              <time>{job.updatedAt}</time><ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
