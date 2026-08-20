import { AtSign, CircleUserRound, Code2, MapPin, Pencil, Plus } from 'lucide-react'
import { skills } from '@/data/mockData'
import './style.css'

export function Profile() {
  return (
    <div className="page-stack">
      <section className="profile-banner"><div className="profile-avatar-large">HS</div><div><p className="eyebrow">PERSONAL PROFILE</p><h2>Hachiya Saku</h2><p>前端工程师志望。React / TypeScript を中心に学習しています。</p><div className="profile-meta"><span><MapPin size={14} />Tokyo, Japan</span><span><AtSign size={14} />hachiya@example.com</span></div></div><button className="secondary-button" type="button"><Pencil size={16} />编辑资料</button></section>
      <section className="profile-summary"><div><span>技能数量</span><strong>6</strong></div><div><span>熟练技能</span><strong>2</strong></div><div><span>岗位平均匹配</span><strong>78%</strong></div><div><span>档案完整度</span><strong>86%</strong></div></section>
      <section className="panel skills-panel"><div className="panel-heading"><div><p className="eyebrow">SKILL INVENTORY</p><h3>我的技术栈</h3><p>匹配度计算将以此处记录的技能为基础。</p></div><button className="primary-button" type="button"><Plus size={16} />添加技能</button></div><div className="skill-table"><div className="skill-table-head"><span>技能</span><span>掌握程度</span><span>学习时间</span><span>权重</span><span /></div>{skills.map(skill => <div className="skill-table-row" key={skill.name}><span className="skill-name"><i className={skill.color}><Code2 size={17} /></i><strong>{skill.name}</strong></span><span><span className={`level-badge level-${skill.level}`}>{skill.level}</span></span><span>{skill.years}</span><span className="weight"><span><i style={{ width: skill.level === '熟练' ? '100%' : skill.level === '一般' ? '60%' : '30%' }} /></span><strong>{skill.level === '熟练' ? '1.0' : skill.level === '一般' ? '0.6' : '0.3'}</strong></span><button className="icon-button" type="button" aria-label={`编辑 ${skill.name}`}><Pencil size={15} /></button></div>)}</div></section>
      <section className="profile-note"><CircleUserRound size={22} /><div><strong>为什么需要维护技术栈？</strong><p>OfferPath 会根据掌握程度和岗位技能要求计算匹配度，帮助你快速判断准备重点。</p></div></section>
    </div>
  )
}
