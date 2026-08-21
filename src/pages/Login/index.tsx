import {
  ArrowRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "./style.css";

const inputClass =
  "h-11 w-full rounded-[5px] border border-[#2c2831] bg-[#100f12] px-[38px] text-xs text-[#f5f2f7] outline-none transition-colors focus:border-[#674a98]";

export function Login() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <main className="grid min-h-screen grid-cols-[minmax(420px,1.05fr)_minmax(440px,.95fr)] bg-[#0c0b0e] max-[1050px]:grid-cols-1">
      <section className="login-brand-panel relative flex min-h-screen flex-col justify-between overflow-hidden border-r border-[#211e25] bg-[#111014] px-14 py-10 max-[1050px]:hidden">
        <div className="z-10 flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-[5px] border border-[#684a96] bg-[#221a35] text-[11px] font-bold text-[#c5aafa]">
            OP
          </span>
          <strong className="text-[17px]">OfferPath</strong>
        </div>
        <div className="z-10 max-w-[580px]">
          <p className="m-0 text-[10px] font-bold text-[#786f82]">
            YOUR CAREER, ORGANIZED.
          </p>
          <h1 className="my-4 text-[clamp(34px,4vw,58px)] font-medium leading-[1.12]">
            把每一次机会，
            <br />
            变成清晰的路径。
          </h1>
          <p className="max-w-[480px] text-sm leading-7 text-[#948e9d]">
            统一管理岗位、投递状态与技能匹配，把精力留给真正重要的准备。
          </p>
        </div>
        <div className="z-10 grid max-w-[500px] grid-cols-2 rounded-md border border-[#2c2831] bg-[#151319]">
          <div className="grid grid-cols-[28px_1fr] gap-1 border-r border-[#2c2831] p-[18px]">
            <BriefcaseBusiness
              className="row-span-2 text-[#a486e5]"
              size={19}
            />
            <span className="text-[10px] text-[#948e9d]">追踪岗位</span>
            <strong className="text-lg">24</strong>
          </div>
          <div className="grid grid-cols-[28px_1fr] gap-1 p-[18px]">
            <ChartNoAxesCombined
              className="row-span-2 text-[#a486e5]"
              size={19}
            />
            <span className="text-[10px] text-[#948e9d]">平均匹配度</span>
            <strong className="text-lg">78%</strong>
          </div>
        </div>
        <small className="z-10 text-[9px] text-[#625c69]">
          © 2026 OfferPath. Built for focused job searching.
        </small>
      </section>

      <section className="grid place-items-center p-8 max-[760px]:px-5 max-[760px]:py-7">
        <form
          className="grid w-full max-w-[380px] gap-[19px]"
          onSubmit={submit}
        >
          <div className="mb-[15px]">
            <span className="mb-5 hidden size-9 place-items-center rounded-[5px] border border-[#684a96] bg-[#221a35] text-[11px] font-bold text-[#c5aafa] max-[1050px]:grid">
              OP
            </span>
            <p className="m-0 text-[10px] font-bold text-[#786f82]">
              WELCOME BACK
            </p>
            <h2 className="mb-1 mt-2 text-[27px]">登录工作区</h2>
            <p className="text-xs text-[#948e9d]">继续管理你的求职进度。</p>
          </div>
          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>用户名</span>
            <div className="relative flex items-center">
              <UserRound className="absolute left-3 text-[#6f6977]" size={16} />
              <input
                className={inputClass}
                required
                defaultValue="hachiya-saku"
                placeholder="输入用户名"
              />
            </div>
          </label>
          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>密码</span>
            <div className="relative flex items-center">
              <LockKeyhole
                className="absolute left-3 text-[#6f6977]"
                size={16}
              />
              <input
                className={inputClass}
                required
                type={visible ? "text" : "password"}
                defaultValue="offerpath2026"
                placeholder="输入密码"
              />
              <button
                className="absolute right-2 grid p-1 text-[#948e9d]"
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "隐藏密码" : "显示密码"}
              >
                {visible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[10px] text-[#bcb6c2]">
              <input
                className="size-3.5 accent-[#8b5cf6]"
                type="checkbox"
                defaultChecked
              />
              保持登录
            </label>
            <button className="text-[10px] text-[#a994df]" type="button">
              忘记密码？
            </button>
          </div>
          <Button
            className="h-[45px] rounded-[5px] bg-[#7c3aed] text-white hover:bg-[#8b4cf0]"
            type="submit"
          >
            进入 OfferPath
            <ArrowRight size={17} />
          </Button>
          <p className="m-0 text-center text-[9px] text-[#6f6977]">
            演示账号已自动填入，直接登录即可查看静态页面。
          </p>
        </form>
      </section>
    </main>
  );
}
