import { BriefcaseBusiness, ChevronRight, CircleUserRound, LayoutDashboard, LogOut, Menu, Plus, Search, UserRoundCog, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import './AppShell.css'

const navigation = [
  { to: '/', label: '仪表盘', icon: LayoutDashboard, end: true },
  { to: '/jobs', label: '岗位一览', icon: BriefcaseBusiness, end: true },
  { to: '/jobs/new', label: '新增岗位', icon: Plus },
  { to: '/profile', label: '技术栈档案', icon: UserRoundCog },
]

const titles: Record<string, string> = { '/': '仪表盘', '/jobs': '岗位一览', '/jobs/new': '新增岗位', '/profile': '技术栈档案' }

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const pageTitle = location.pathname.startsWith('/jobs/') && location.pathname !== '/jobs/new' ? '岗位详情' : titles[location.pathname] ?? 'OfferPath'

  return (
    <div className="app-frame">
      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
        <div className="brand-block">
          <div className="brand-mark" aria-hidden>OP</div>
          <div><strong>OfferPath</strong><span>CAREER WORKSPACE</span></div>
          <Button className="icon-button sidebar-close" variant="ghost" size="icon" type="button" onClick={() => setMenuOpen(false)} aria-label="关闭导航"><X size={18} /></Button>
        </div>
        <nav className="sidebar-nav" aria-label="主要导航">
          <p className="nav-label">WORKSPACE</p>
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span><ChevronRight className="nav-chevron" size={15} />
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="sidebar-profile"><span className="avatar"><CircleUserRound size={22} /></span><div><strong>Hachiya Saku</strong><small>Frontend learner</small></div></div>
          <Button className="icon-button" variant="ghost" size="icon" type="button" title="退出登录" onClick={() => navigate('/login')}><LogOut size={17} /></Button>
        </div>
      </aside>
      {menuOpen && <button className="sidebar-backdrop" aria-label="关闭导航" onClick={() => setMenuOpen(false)} />}
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-title">
            <Button className="icon-button menu-button" variant="ghost" size="icon" type="button" onClick={() => setMenuOpen(true)} aria-label="打开导航"><Menu size={20} /></Button>
            <div><span>WORKSPACE</span><h1>{pageTitle}</h1></div>
          </div>
          <div className="topbar-actions">
            <label className="quick-search"><Search size={16} /><input aria-label="快速搜索" placeholder="搜索岗位..." /><kbd>⌘ K</kbd></label>
            <Button className="primary-button" type="button" onClick={() => navigate('/jobs/new')}><Plus size={17} />新增岗位</Button>
          </div>
        </header>
        <main className="workspace-content"><Outlet /></main>
      </div>
    </div>
  )
}
