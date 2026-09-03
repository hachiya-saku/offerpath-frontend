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
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";
import { loginAPI } from "@/api/auth";
import "./style.css";

const inputClass =
  "h-11 w-full rounded-[5px] border border-[#2c2831] bg-[#100f12] px-[38px] text-xs text-[#f5f2f7] outline-none transition-colors focus:border-[#674a98]";

export function Login() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const text =
    language === "ja"
      ? {
          headline: "一つひとつの機会を、\n次の一歩につなげる。",
          description:
            "求人、応募状況、スキルマッチを一元管理し、選考準備に集中できる環境をつくります。",
          tracked: "管理中の求人",
          average: "平均マッチ度",
          welcome: "おかえりなさい",
          loginHint: "求職活動の続きを始めましょう。",
          account: "メールアドレス",
          accountPlaceholder: "メールアドレスを入力",
          password: "パスワード",
          passwordPlaceholder: "パスワードを入力",
          keep: "ログイン状態を保持",
          forgot: "パスワードを忘れた場合",
          submit: "OfferPath を開く",
          demo: "デモアカウントで静的画面を確認できます。",
          show: "パスワードを表示",
          hide: "パスワードを隠す",
        }
      : {
          headline: "把每一次机会，\n变成清晰的路径。",
          description:
            "统一管理岗位、投递状态与技能匹配，把精力留给真正重要的准备。",
          tracked: "追踪岗位",
          average: "平均匹配度",
          welcome: "登录工作区",
          loginHint: "继续管理你的求职进度。",
          account: "邮箱",
          accountPlaceholder: "输入邮箱",
          password: "密码",
          passwordPlaceholder: "输入密码",
          keep: "保持登录",
          forgot: "忘记密码？",
          submit: "进入 OfferPath",
          demo: "可使用演示账号查看静态页面。",
          show: "显示密码",
          hide: "隐藏密码",
        };
  const navigate = useNavigate();
  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const response = await loginAPI({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    console.log("Login response:", response.data);

    if (response.status === 200) {
      navigate("/");
    } else {
      console.error("Login failed:", response.statusText);
    }
  };

  return (
    <main className="relative grid min-h-screen grid-cols-[minmax(420px,1.05fr)_minmax(440px,.95fr)] bg-[#0c0b0e] max-[1050px]:grid-cols-1">
      <div className="absolute right-6 top-6 z-20">
        <LanguageToggle />
      </div>
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
          <h1 className="my-4 whitespace-pre-line text-[clamp(34px,4vw,58px)] font-medium leading-[1.12]">
            {text.headline}
          </h1>
          <p className="max-w-[480px] text-sm leading-7 text-[#948e9d]">
            {text.description}
          </p>
        </div>
        <div className="z-10 grid max-w-[500px] grid-cols-2 rounded-md border border-[#2c2831] bg-[#151319]">
          <div className="grid grid-cols-[28px_1fr] gap-1 border-r border-[#2c2831] p-[18px]">
            <BriefcaseBusiness
              className="row-span-2 text-[#a486e5]"
              size={19}
            />
            <span className="text-[10px] text-[#948e9d]">{text.tracked}</span>
            <strong className="text-lg">24</strong>
          </div>
          <div className="grid grid-cols-[28px_1fr] gap-1 p-[18px]">
            <ChartNoAxesCombined
              className="row-span-2 text-[#a486e5]"
              size={19}
            />
            <span className="text-[10px] text-[#948e9d]">{text.average}</span>
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
            <h2 className="mb-1 mt-2 text-[27px]">{text.welcome}</h2>
            <p className="text-xs text-[#948e9d]">{text.loginHint}</p>
          </div>
          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.account}</span>
            <div className="relative flex items-center">
              <UserRound className="absolute left-3 text-[#6f6977]" size={16} />
              <input
                name="email"
                type="email"
                className={inputClass}
                required
                defaultValue="demo@offerpath.local"
                placeholder={text.accountPlaceholder}
              />
            </div>
          </label>
          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.password}</span>
            <div className="relative flex items-center">
              <LockKeyhole
                className="absolute left-3 text-[#6f6977]"
                size={16}
              />
              <input
                className={inputClass}
                name="password"
                required
                type={visible ? "text" : "password"}
                defaultValue="offerpath2026"
                placeholder={text.passwordPlaceholder}
              />
              <button
                className="absolute right-2 grid p-1 text-[#948e9d]"
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? text.hide : text.show}
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
              {text.keep}
            </label>
            <button className="text-[10px] text-[#a994df]" type="button">
              {text.forgot}
            </button>
          </div>
          <Button
            className="h-[45px] rounded-[5px] bg-[#7c3aed] text-white hover:bg-[#8b4cf0]"
            type="submit"
          >
            {text.submit}
            <ArrowRight size={17} />
          </Button>
          <p className="m-0 text-center text-[9px] text-[#6f6977]">
            {text.demo}
          </p>
        </form>
      </section>
    </main>
  );
}
