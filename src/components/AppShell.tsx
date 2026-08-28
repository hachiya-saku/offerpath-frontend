import { BriefcaseBusiness, Building2, ChevronRight, CircleUserRound, LayoutDashboard, LogOut, Menu, Plus, Search, UserRoundCog, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLanguage } from '@/i18n/LanguageContext'

const shellCopy = {
  ja: {
    dashboard: 'ダッシュボード', jobs: '求人一覧', companies: '企業一覧', companyDetail: '企業詳細', newJob: '求人登録', profile: 'スキルプロフィール', detail: '求人詳細', search: '求人を検索...', logout: 'ログアウト', openNav: 'ナビゲーションを開く', closeNav: 'ナビゲーションを閉じる',
  },
  zh: {
    dashboard: '仪表盘', jobs: '岗位一览', companies: '公司一览', companyDetail: '公司详情', newJob: '新增岗位', profile: '技术栈档案', detail: '岗位详情', search: '搜索岗位...', logout: '退出登录', openNav: '打开导航', closeNav: '关闭导航',
  },
} as const

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language } = useLanguage()
  const text = shellCopy[language]
  const location = useLocation()
  const navigate = useNavigate()
  const navigation = [
    { to: '/', label: text.dashboard, icon: LayoutDashboard, end: true },
    { to: '/jobs', label: text.jobs, icon: BriefcaseBusiness, end: true },
    { to: '/companies', label: text.companies, icon: Building2, end: true },
    { to: '/jobs/new', label: text.newJob, icon: Plus },
    { to: '/profile', label: text.profile, icon: UserRoundCog },
  ]
  const titles: Record<string, string> = { '/': text.dashboard, '/jobs': text.jobs, '/companies': text.companies, '/jobs/new': text.newJob, '/profile': text.profile }
  const pageTitle = location.pathname.startsWith('/jobs/') && location.pathname !== '/jobs/new' ? text.detail : location.pathname.startsWith('/companies/') ? text.companyDetail : titles[location.pathname] ?? 'OfferPath'

  return (
    <div className="grid min-h-screen w-full max-w-screen grid-cols-[252px_minmax(0,1fr)] bg-[#0c0b0e] max-[1050px]:grid-cols-1">
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-[252px] flex-col border-r border-[#211e25] bg-[#111014] px-4 pb-[18px] pt-6 transition-transform duration-200 max-[1050px]:-translate-x-full ${menuOpen ? 'max-[1050px]:translate-x-0' : ''}`}>
        <div className="flex items-center gap-3 px-2 pb-[30px]">
          <div className="grid size-[38px] place-items-center rounded-md border border-[#7853cc] bg-[#221a35] text-[13px] font-bold text-[#c4adff]" aria-hidden>OP</div>
          <div className="grid gap-px"><strong className="text-[17px]">OfferPath</strong><span className="text-[9px] font-bold text-[#6f6977]">CAREER WORKSPACE</span></div>
          <Button className="ml-auto hidden border-[#2c2831] text-[#a39ca9] max-[1050px]:inline-flex" variant="ghost" size="icon" type="button" onClick={() => setMenuOpen(false)} aria-label={text.closeNav}><X size={18} /></Button>
        </div>
        <nav className="grid gap-1" aria-label="主要导航">
          <p className="m-0 px-[11px] pb-2 text-[10px] font-bold text-[#786f82]">WORKSPACE</p>
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink className={({ isActive }) => `grid min-h-[43px] grid-cols-[20px_1fr_16px] items-center gap-2.5 rounded-md border px-[11px] text-sm no-underline transition-colors ${isActive ? 'border-[#34294b] bg-[#221a35] text-[#ddd3f8]' : 'border-transparent text-[#9992a2] hover:bg-[#18161b] hover:text-[#f5f2f7]'}`} key={to} to={to} end={end} onClick={() => setMenuOpen(false)}>
              {({ isActive }) => <><Icon size={18} strokeWidth={1.8} /><span>{label}</span><ChevronRight className={isActive ? 'opacity-100' : 'opacity-0'} size={15} /></>}
            </NavLink>
          ))}
        </nav>
        <div className="mt-5 hidden border-t border-[#211e25] pt-4 max-[1050px]:block">
          <LanguageToggle />
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-[#211e25] px-1.5 pt-3.5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5"><span className="grid size-[34px] shrink-0 place-items-center rounded-full border border-[#2c2831] bg-[#1c1822] text-[#b7a2ed]"><CircleUserRound size={22} /></span><div className="grid min-w-0"><strong className="truncate text-xs">Hachiya Saku</strong><small className="text-[10px] text-[#6f6977]">Frontend learner</small></div></div>
          <Button className="border-[#2c2831] text-[#a39ca9] hover:bg-[#1b181f] hover:text-white" variant="ghost" size="icon" type="button" title={text.logout} onClick={() => navigate('/login')}><LogOut size={17} /></Button>
        </div>
      </aside>
      {menuOpen && <button className="fixed inset-0 z-20 hidden border-0 bg-black/60 max-[1050px]:block" aria-label={text.closeNav} onClick={() => setMenuOpen(false)} />}
      <div className="col-start-2 min-w-0 overflow-x-hidden max-[1050px]:col-start-1">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#211e25] bg-[#0c0b0e]/90 px-8 backdrop-blur-2xl max-[760px]:h-16 max-[760px]:px-4">
          <div className="flex items-center gap-3">
            <Button className="hidden border-[#2c2831] text-[#a39ca9] max-[1050px]:inline-flex" variant="ghost" size="icon" type="button" onClick={() => setMenuOpen(true)} aria-label={text.openNav}><Menu size={20} /></Button>
            <div><span className="text-[9px] font-bold text-[#6f6977]">WORKSPACE</span><h1 className="mt-0.5 text-[17px] font-semibold">{pageTitle}</h1></div>
          </div>
          <div className="flex items-center gap-2.5 max-[460px]:absolute max-[460px]:right-4">
            <div className="max-[560px]:hidden"><LanguageToggle /></div>
            <label className="flex h-[38px] w-[245px] items-center gap-2 rounded-[5px] border border-[#2c2831] bg-[#111014] px-2.5 text-[#6f6977] max-[900px]:hidden"><Search size={16} /><input className="min-w-0 flex-1 border-0 bg-transparent text-xs text-[#f5f2f7] outline-none" aria-label={text.search} placeholder={text.search} /><kbd className="rounded border border-[#2c2831] px-1.5 py-0.5 text-[9px] text-[#77717f]">⌘ K</kbd></label>
            <Button className="h-[38px] rounded-[5px] bg-[#7c3aed] px-3.5 text-xs text-white hover:bg-[#8b4cf0] max-[560px]:hidden" type="button" onClick={() => navigate('/jobs/new')}><Plus size={17} />{text.newJob}</Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1380px] px-8 pb-[70px] pt-[34px] max-[760px]:px-4 max-[760px]:pb-[50px] max-[760px]:pt-6"><Outlet /></main>
      </div>
    </div>
  )
}
