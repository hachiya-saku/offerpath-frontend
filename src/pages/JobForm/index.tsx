import {
  ArrowLeft,
  BriefcaseBusiness,
  Link2,
  Plus,
  Save,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { recruitmentPlatforms, statuses } from "@/data/mockData";

const sectionClass =
  "rounded-md border border-[#211e25] bg-[#151318] p-6 max-[460px]:p-[17px]";
const sectionTitleClass =
  "flex items-center gap-[11px] border-b border-[#211e25] pb-5";
const labelClass = "grid gap-[7px] text-[10px] text-[#bcb6c2]";
const fieldClass =
  "h-[41px] w-full rounded-[5px] border border-[#2c2831] bg-[#100f12] px-[11px] text-xs text-[#f5f2f7] outline-none transition-colors focus:border-[#674a98]";

export function JobForm() {
  const navigate = useNavigate();
  const [required, setRequired] = useState(["React", "TypeScript"]);
  const [bonus, setBonus] = useState(["Next.js"]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/jobs");
  };
  return (
    <form className="job-form grid gap-6" onSubmit={submit}>
      <section className="flex items-end justify-between gap-7 pb-1 max-[760px]:grid max-[760px]:items-start">
        <div>
          <Button
            className="mb-3.5 h-auto p-0 text-[11px] text-[#a994df] no-underline hover:text-[#d0c0f7]"
            variant="link"
            size="sm"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            返回
          </Button>
          <p className="m-0 text-[10px] font-bold text-[#786f82]">
            NEW OPPORTUNITY
          </p>
          <h2 className="mb-1 mt-2 text-[27px] font-semibold max-[760px]:text-[23px]">
            记录新岗位
          </h2>
          <p className="text-[13px] text-[#948e9d]">
            先保存核心信息，后续可以随时补充和调整。
          </p>
        </div>
        <div className="flex gap-2 max-[760px]:w-full max-[760px]:[&>button]:flex-1">
          <Button
            className="h-[38px] rounded-[5px] border-[#2c2831] bg-[#17151a] px-3.5 text-xs text-[#c5bfca] hover:border-[#46404e] hover:bg-[#17151a] hover:text-white"
            variant="outline"
            type="button"
            onClick={() => navigate("/jobs")}
          >
            取消
          </Button>
          <Button
            className="h-[38px] rounded-[5px] bg-[#7c3aed] px-3.5 text-xs text-white hover:bg-[#8b4cf0]"
            type="submit"
          >
            <Save size={17} />
            保存岗位
          </Button>
        </div>
      </section>
      <div className="grid grid-cols-[minmax(0,1fr)_290px] items-start gap-[18px] max-[1050px]:grid-cols-1">
        <div className="grid gap-[18px]">
          <section className={sectionClass}>
            <div className={sectionTitleClass}>
              <span className="grid size-[34px] place-items-center rounded-[5px] bg-[#221a35] text-[#b9a2ed]">
                <BriefcaseBusiness size={18} />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold">基本信息</h3>
                <p className="mt-1 text-[10px] text-[#948e9d]">
                  岗位与公司的主要识别信息
                </p>
              </div>
            </div>
            <div className="mt-[21px] grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
              <label className={labelClass}>
                <span>公司名称 *</span>
                <input
                  className={fieldClass}
                  required
                  placeholder="例如：株式会社サンプル"
                />
              </label>
              <label className={labelClass}>
                <span>岗位名称 *</span>
                <input
                  className={fieldClass}
                  required
                  placeholder="例如：Frontend Engineer"
                />
              </label>
              <label className={labelClass}>
                <span>招聘平台</span>
                <select className={fieldClass} defaultValue="Green">
                  {recruitmentPlatforms.map((platform) => (
                    <option key={platform}>{platform}</option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                <span>工作地点</span>
                <input
                  className={fieldClass}
                  placeholder="例如：东京 / Remote"
                />
              </label>
              <label className={labelClass}>
                <span>最低薪资</span>
                <div className="relative flex items-center">
                  <input
                    className={fieldClass}
                    type="number"
                    placeholder="500"
                  />
                  <span className="absolute right-[11px] text-[10px] text-[#948e9d]">
                    万円
                  </span>
                </div>
              </label>
              <label className={labelClass}>
                <span>最高薪资</span>
                <div className="relative flex items-center">
                  <input
                    className={fieldClass}
                    type="number"
                    placeholder="750"
                  />
                  <span className="absolute right-[11px] text-[10px] text-[#948e9d]">
                    万円
                  </span>
                </div>
              </label>
              <label
                className={`${labelClass} col-span-full max-[760px]:col-auto`}
              >
                <span>岗位链接</span>
                <div className="relative flex items-center">
                  <Link2
                    className="absolute left-[11px] text-[#6f6977]"
                    size={16}
                  />
                  <input
                    className={`${fieldClass} pl-9`}
                    type="url"
                    placeholder="https://..."
                  />
                </div>
              </label>
            </div>
          </section>
          <section className={sectionClass}>
            <div className={sectionTitleClass}>
              <span className="grid size-[34px] place-items-center rounded-[5px] bg-[#221a35] text-[#b9a2ed]">
                <Sparkles size={18} />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold">技能要求</h3>
                <p className="mt-1 text-[10px] text-[#948e9d]">
                  用于计算与个人技术栈的匹配度
                </p>
              </div>
            </div>
            <TagEditor label="必须技能" tags={required} setTags={setRequired} />
            <TagEditor label="加分技能" tags={bonus} setTags={setBonus} />
          </section>
          <section className={sectionClass}>
            <div className={sectionTitleClass}>
              <span className="grid size-[34px] place-items-center rounded-[5px] bg-[#221a35] text-[#b9a2ed]">
                <Plus size={18} />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold">备注</h3>
                <p className="mt-1 text-[10px] text-[#948e9d]">
                  记录面试准备、联系人或其他信息
                </p>
              </div>
            </div>
            <label className={`${labelClass} mt-5`}>
              <span>备注内容</span>
              <textarea
                className="w-full resize-y rounded-[5px] border border-[#2c2831] bg-[#100f12] p-[11px] text-xs text-[#f5f2f7] outline-none transition-colors focus:border-[#674a98]"
                rows={6}
                placeholder="补充关于这个岗位的信息..."
              />
            </label>
          </section>
        </div>
        <aside>
          <div className="sticky top-[100px] rounded-md border border-[#211e25] bg-[#151318] p-[21px] max-[1050px]:static">
            <p className="m-0 text-[10px] font-bold text-[#786f82]">TRACKING</p>
            <h3 className="mt-1 text-[15px] font-semibold">投递状态</h3>
            <label className={`${labelClass} mt-5`}>
              <span>当前状态</span>
              <select className={fieldClass} defaultValue="想投">
                {statuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <div className="mt-[18px] flex items-start gap-[11px] rounded-[5px] border border-[#2d2840] bg-[#1b1725] p-3.5 text-[#b69bf2]">
              <Sparkles size={17} />
              <p className="m-0 grid gap-0.5">
                <strong className="text-[11px]">匹配度将在保存后计算</strong>
                <span className="text-[10px] text-[#948e9d]">
                  系统会比较岗位技能与个人技术栈。
                </span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}

function TagEditor({
  label,
  tags,
  setTags,
}: {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
}) {
  const [value, setValue] = useState("");
  const add = () => {
    const next = value.trim();
    if (next && !tags.includes(next)) setTags([...tags, next]);
    setValue("");
  };
  return (
    <div className="mt-5 grid gap-[7px]">
      <span className="text-[10px] text-[#bcb6c2]">{label}</span>
      <div className="flex min-h-[45px] flex-wrap gap-1.5 rounded-[5px] border border-[#2c2831] bg-[#100f12] p-[7px]">
        {tags.map((tag) => (
          <span
            className="inline-flex items-center gap-1 rounded-[3px] border border-[#40325b] bg-[#221a31] px-2 text-[10px] text-[#c8b4f2]"
            key={tag}
          >
            {tag}
            <button
              className="grid border-0 bg-transparent p-0 text-[#927fac]"
              type="button"
              onClick={() => setTags(tags.filter((item) => item !== tag))}
              aria-label={`删除 ${tag}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          className="h-7 min-w-[150px] flex-1 border-0 bg-transparent text-xs text-[#f5f2f7] outline-none"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder="输入技能后按 Enter"
        />
      </div>
    </div>
  );
}
