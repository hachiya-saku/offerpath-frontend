import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";
import { registerAPI } from "@/api/auth";
import axios from "axios";
import "./style.css";

const inputClass =
  "h-11 w-full rounded-[5px] border border-[#2c2831] bg-[#100f12] px-[38px] text-xs text-[#f5f2f7] outline-none transition-colors placeholder:text-[#5f5966] focus:border-[#674a98]";

export function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const data = {
        displayName: formData.get("displayName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const passwordConfirmation = formData.get(
        "passwordConfirmation",
      ) as string;

      if (data.password !== passwordConfirmation) {
        setError(
          language === "ja"
            ? "パスワードと確認用パスワードが一致しません。"
            : "密码和确认密码不匹配。",
        );
        return;
      }

      const response = await registerAPI(data);
      console.log("Registration successful:", response.data);
      navigate("/login", {
        replace: true,
        state: {
          registrationSucceeded: true,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setError(
          language === "ja"
            ? "このメールアドレスは既に使用されています。"
            : "该邮箱地址已被使用。",
        );
      } else {
        setError(
          language === "ja"
            ? "登録中にエラーが発生しました。もう一度お試しください。"
            : "注册过程中发生错误，请重试。",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const text =
    language === "ja"
      ? {
          headline: "次の機会に向けて、\n記録を始める。",
          description:
            "応募の一つひとつを整理し、自分らしいキャリアの道筋をつくりましょう。",
          statusLabel: "CAREER PATH",
          status: ["検討中", "書類選考", "面接", "Offer"],
          eyebrow: "CREATE YOUR WORKSPACE",
          title: "アカウントを作成",
          subtitle: "OfferPath で求職活動の記録を始めましょう。",
          name: "表示名",
          namePlaceholder: "表示名を入力",
          email: "メールアドレス",
          emailPlaceholder: "メールアドレスを入力",
          password: "パスワード",
          passwordPlaceholder: "8文字以上で入力",
          confirmation: "パスワード（確認）",
          confirmationPlaceholder: "パスワードを再入力",
          passwordHint: "8〜72文字で設定してください。",
          submit: "アカウントを作成",
          account: "すでにアカウントをお持ちですか？",
          login: "ログイン",
          show: "パスワードを表示",
          hide: "パスワードを隠す",
        }
      : {
          headline: "从下一次机会开始，\n留下清晰的记录。",
          description: "整理每一次申请，逐步建立属于自己的职业路径。",
          statusLabel: "CAREER PATH",
          status: ["考虑中", "书类选考", "面试", "Offer"],
          eyebrow: "CREATE YOUR WORKSPACE",
          title: "创建账号",
          subtitle: "开始使用 OfferPath 记录你的求职进度。",
          name: "显示名称",
          namePlaceholder: "输入显示名称",
          email: "邮箱",
          emailPlaceholder: "输入邮箱",
          password: "密码",
          passwordPlaceholder: "至少输入 8 个字符",
          confirmation: "确认密码",
          confirmationPlaceholder: "再次输入密码",
          passwordHint: "密码长度需要在 8～72 个字符之间。",
          submit: "创建账号",
          account: "已经有账号了？",
          login: "返回登录",
          show: "显示密码",
          hide: "隐藏密码",
        };

  return (
    <main className="relative grid min-h-screen grid-cols-[minmax(420px,1.05fr)_minmax(460px,.95fr)] bg-[#0c0b0e] text-[#f5f2f7] max-[1050px]:grid-cols-1">
      <div className="absolute right-6 top-6 z-20">
        <LanguageToggle />
      </div>

      <section className="register-brand-panel relative flex min-h-screen flex-col justify-between overflow-hidden border-r border-[#211e25] bg-[#111014] px-14 py-10 max-[1050px]:hidden">
        <div className="z-10 flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-[5px] border border-[#684a96] bg-[#221a35] text-[11px] font-bold text-[#c5aafa]">
            OP
          </span>
          <strong className="text-[17px]">OfferPath</strong>
        </div>

        <div className="z-10 max-w-[590px]">
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

        <div className="z-10 max-w-[540px] border-y border-[#29252e] py-5">
          <p className="mb-4 text-[9px] font-bold text-[#6f6877]">
            {text.statusLabel}
          </p>
          <div className="grid grid-cols-4">
            {text.status.map((status, index) => (
              <div className="relative grid gap-2" key={status}>
                <div className="flex items-center">
                  <span
                    className={`grid size-5 place-items-center rounded-full border text-[9px] ${
                      index === 0
                        ? "border-[#7954b2] bg-[#281d3b] text-[#cbb5f5]"
                        : "border-[#343039] bg-[#171519] text-[#77717e]"
                    }`}
                  >
                    {index === 0 ? <Check size={11} /> : index + 1}
                  </span>
                  {index < text.status.length - 1 && (
                    <span className="h-px flex-1 bg-[#302b34]" />
                  )}
                </div>
                <span className="text-[9px] text-[#817a88]">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <small className="z-10 text-[9px] text-[#625c69]">
          © 2026 OfferPath. Built for focused job searching.
        </small>
      </section>

      <section className="grid place-items-center px-8 py-16 max-[760px]:px-5 max-[760px]:py-20">
        <form
          className="grid w-full max-w-[400px] gap-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <span className="mb-5 hidden size-9 place-items-center rounded-[5px] border border-[#684a96] bg-[#221a35] text-[11px] font-bold text-[#c5aafa] max-[1050px]:grid">
              OP
            </span>
            <p className="m-0 text-[10px] font-bold text-[#786f82]">
              {text.eyebrow}
            </p>
            <h2 className="mb-1 mt-2 text-[27px]">{text.title}</h2>
            <p className="text-xs leading-6 text-[#948e9d]">{text.subtitle}</p>
          </div>

          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.name}</span>
            <div className="relative flex items-center">
              <UserRound className="absolute left-3 text-[#6f6977]" size={16} />
              <input
                autoComplete="name"
                className={inputClass}
                maxLength={80}
                name="displayName"
                placeholder={text.namePlaceholder}
                required
                type="text"
              />
            </div>
          </label>

          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.email}</span>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-[#6f6977]" size={16} />
              <input
                autoComplete="email"
                className={inputClass}
                maxLength={254}
                name="email"
                placeholder={text.emailPlaceholder}
                required
                type="email"
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
                autoComplete="new-password"
                className={`${inputClass} pr-10`}
                maxLength={72}
                minLength={8}
                name="password"
                placeholder={text.passwordPlaceholder}
                required
                type={passwordVisible ? "text" : "password"}
              />
              <button
                aria-label={passwordVisible ? text.hide : text.show}
                className="absolute right-2 grid p-1 text-[#948e9d] transition-colors hover:text-[#d6cbe9]"
                onClick={() => setPasswordVisible(!passwordVisible)}
                type="button"
              >
                {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.confirmation}</span>
            <div className="relative flex items-center">
              <LockKeyhole
                className="absolute left-3 text-[#6f6977]"
                size={16}
              />
              <input
                autoComplete="new-password"
                className={`${inputClass} pr-10`}
                maxLength={72}
                minLength={8}
                name="passwordConfirmation"
                placeholder={text.confirmationPlaceholder}
                required
                type={confirmationVisible ? "text" : "password"}
              />
              <button
                aria-label={confirmationVisible ? text.hide : text.show}
                className="absolute right-2 grid p-1 text-[#948e9d] transition-colors hover:text-[#d6cbe9]"
                onClick={() => setConfirmationVisible(!confirmationVisible)}
                type="button"
              >
                {confirmationVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <p className="m-0 text-[9px] text-[#716a78]">{text.passwordHint}</p>

          <Button
            className="mt-1 h-[45px] rounded-[5px] bg-[#7c3aed] text-white hover:bg-[#8b4cf0]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? language === "ja"
                ? "登録中..."
                : "注册中..."
              : text.submit}
            <ArrowRight size={17} />
          </Button>
          {error && <p className="text-xs text-red-400">{error}</p>}

          <p className="mt-2 text-center text-[10px] text-[#77717e]">
            {text.account}{" "}
            <Link
              className="font-medium text-[#b9a2e8] transition-colors hover:text-[#d5c4f5]"
              to="/login"
            >
              {text.login}
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
