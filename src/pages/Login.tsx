import { ArrowRight, BriefcaseBusiness, ChartNoAxesCombined, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const submit = (event: FormEvent) => { event.preventDefault(); navigate('/') }
  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand"><span>OP</span><strong>OfferPath</strong></div>
        <div className="login-message"><p className="eyebrow">YOUR CAREER, ORGANIZED.</p><h1>把每一次机会，<br />变成清晰的路径。</h1><p>统一管理岗位、投递状态与技能匹配，把精力留给真正重要的准备。</p></div>
        <div className="login-preview"><div><BriefcaseBusiness size={19} /><span>追踪岗位</span><strong>24</strong></div><div><ChartNoAxesCombined size={19} /><span>平均匹配度</span><strong>78%</strong></div></div>
        <small>© 2026 OfferPath. Built for focused job searching.</small>
      </section>
      <section className="login-form-panel"><form onSubmit={submit}><div className="login-form-heading"><span className="login-mobile-mark">OP</span><p className="eyebrow">WELCOME BACK</p><h2>登录工作区</h2><p>继续管理你的求职进度。</p></div><label><span>用户名</span><div className="input-prefix"><UserRound size={16} /><input required defaultValue="hachiya-saku" placeholder="输入用户名" /></div></label><label><span>密码</span><div className="input-prefix"><LockKeyhole size={16} /><input required type={visible ? 'text' : 'password'} defaultValue="offerpath2026" placeholder="输入密码" /><button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? '隐藏密码' : '显示密码'}>{visible ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label><div className="login-options"><label><input type="checkbox" defaultChecked />保持登录</label><button type="button">忘记密码？</button></div><button className="login-submit" type="submit">进入 OfferPath<ArrowRight size={17} /></button><p className="demo-hint">演示账号已自动填入，直接登录即可查看静态页面。</p></form></section>
    </main>
  )
}
