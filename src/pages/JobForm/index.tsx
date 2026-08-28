import {
  ArrowLeft,
  Banknote,
  BriefcaseBusiness,
  FileText,
  Link2,
  Plus,
  Save,
  Sparkles,
  X,
} from "lucide-react";
import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { recruitmentPlatforms } from "@/data/mockData";

const sectionClass = "rounded-md border border-[#211e25] bg-[#151318] p-6 max-[460px]:p-[17px]";
const sectionTitleClass = "flex items-center gap-[11px] border-b border-[#211e25] pb-5";
const labelClass = "grid gap-[7px] text-[10px] text-[#bcb6c2]";
const fieldClass = "h-[41px] w-full rounded-[5px] border border-[#2c2831] bg-[#100f12] px-[11px] text-xs text-[#f5f2f7] outline-none transition-colors focus:border-[#674a98]";
const textareaClass = "w-full resize-y rounded-[5px] border border-[#2c2831] bg-[#100f12] p-[11px] text-xs leading-6 text-[#f5f2f7] outline-none transition-colors focus:border-[#674a98]";

const copy = {
  ja: {
    back: "戻る", title: "求人を登録", subtitle: "応募判断と進捗管理に必要な情報をまとめます。", cancel: "キャンセル", save: "求人を保存",
    basic: "基本情報", basicHint: "求人と企業を識別するための基本項目", companyName: "企業名", companyPlaceholder: "例：株式会社サンプル", positionName: "職種名", positionPlaceholder: "例：フロントエンドエンジニア", employmentType: "雇用形態", hiringCount: "採用予定人数", hiringCountSuffix: "名", platform: "求人媒体", workMode: "勤務形態", location: "勤務地", locationPlaceholder: "例：東京都 / フルリモート",
    salary: "給与条件", salaryHint: "年収・月給・時給と固定残業代を分けて記録", annualSalary: "年収", monthlySalary: "月給", hourlySalary: "時給", salaryMin: "下限", salaryMax: "上限", currency: "通貨", fixedOvertime: "固定残業代を含む", overtimeHours: "固定残業時間", overtimeHoursSuffix: "時間 / 月", overtimeAmount: "固定残業代", overtimeAmountSuffix: "円 / 月", sourceUrl: "求人URL",
    descriptions: "募集要項", descriptionsHint: "求人票の内容を項目ごとに整理", jobDescription: "仕事内容", jobDescriptionPlaceholder: "担当業務、プロダクト、役割、期待される成果など", applicationRequirements: "応募資格", preferredQualifications: "歓迎条件", selectionProcess: "選考プロセス", workLocationDetails: "勤務地詳細", workingHours: "勤務時間", benefits: "待遇・福利厚生", holidays: "休日・休暇", teamEnvironment: "チーム・開発環境",
    skills: "スキル要件", skillsHint: "マッチ度計算に使用する技術要件", requiredSkills: "必須スキル", bonusSkills: "歓迎スキル", tagPlaceholder: "入力後 Enter",
    notes: "個人メモ", notesHint: "応募準備や面接で確認したい内容", notesPlaceholder: "確認事項、面接準備、担当者情報など", tracking: "応募状況", currentStatus: "現在のステータス", savedDates: "作成日時・更新日時", savedDatesValue: "保存後に記録",
  },
  zh: {
    back: "返回", title: "记录新岗位", subtitle: "集中记录判断是否投递和跟踪进度所需的信息。", cancel: "取消", save: "保存岗位",
    basic: "基本信息", basicHint: "用于识别岗位和公司的基本字段", companyName: "公司名称", companyPlaceholder: "例如：株式会社サンプル", positionName: "岗位名称", positionPlaceholder: "例如：前端工程师", employmentType: "雇佣类型", hiringCount: "采用人数", hiringCountSuffix: "人", platform: "招聘平台", workMode: "工作方式", location: "工作地点", locationPlaceholder: "例如：东京 / 全远程",
    salary: "薪资条件", salaryHint: "分别记录年薪、月薪、时薪和固定加班费", annualSalary: "年薪", monthlySalary: "月薪", hourlySalary: "时薪", salaryMin: "最低", salaryMax: "最高", currency: "货币", fixedOvertime: "包含固定加班费", overtimeHours: "包含加班时长", overtimeHoursSuffix: "小时 / 月", overtimeAmount: "固定加班金额", overtimeAmountSuffix: "日元 / 月", sourceUrl: "岗位链接",
    descriptions: "岗位描述", descriptionsHint: "将招聘信息按实际用途拆分记录", jobDescription: "工作内容", jobDescriptionPlaceholder: "负责的业务、产品、角色和预期成果等", applicationRequirements: "应聘资格", preferredQualifications: "加分条件", selectionProcess: "选考流程", workLocationDetails: "工作地点详情", workingHours: "工作时间", benefits: "待遇与福利", holidays: "休息日与休假", teamEnvironment: "团队与开发环境",
    skills: "技能要求", skillsHint: "用于计算匹配度的技术要求", requiredSkills: "必须技能", bonusSkills: "加分技能", tagPlaceholder: "输入后按 Enter",
    notes: "个人备注", notesHint: "记录应聘准备和面试中需要确认的内容", notesPlaceholder: "确认事项、面试准备、联系人信息等", tracking: "投递状态", currentStatus: "当前状态", savedDates: "创建时间与更新时间", savedDatesValue: "保存后记录",
  },
} as const;

const optionCopy = {
  ja: {
    employmentTypes: [["FULL_TIME", "正社員"], ["CONTRACT", "契約社員"], ["DISPATCH", "派遣社員"], ["FREELANCE", "業務委託"], ["PART_TIME", "パート・アルバイト"]],
    workModes: [["ONSITE", "出社"], ["HYBRID", "ハイブリッド"], ["REMOTE", "フルリモート"], ["FLEXIBLE", "応相談"]],
    statuses: [["WISHLIST", "応募検討"], ["APPLIED", "応募済み"], ["DOCUMENT_SCREENING", "書類選考"], ["FIRST_INTERVIEW", "一次面接"], ["SECOND_INTERVIEW", "二次面接"], ["THIRD_INTERVIEW", "三次面接"], ["FINAL_INTERVIEW", "最終面接"], ["OFFER", "内定"], ["REJECTED", "不採用"], ["WITHDRAWN", "辞退"]],
  },
  zh: {
    employmentTypes: [["FULL_TIME", "正式员工"], ["CONTRACT", "合同员工"], ["DISPATCH", "派遣员工"], ["FREELANCE", "业务委托"], ["PART_TIME", "兼职"]],
    workModes: [["ONSITE", "到岗"], ["HYBRID", "混合办公"], ["REMOTE", "全远程"], ["FLEXIBLE", "可商议"]],
    statuses: [["WISHLIST", "想投"], ["APPLIED", "已投"], ["DOCUMENT_SCREENING", "书类筛选"], ["FIRST_INTERVIEW", "一面"], ["SECOND_INTERVIEW", "二面"], ["THIRD_INTERVIEW", "三面"], ["FINAL_INTERVIEW", "终面"], ["OFFER", "Offer"], ["REJECTED", "已拒绝"], ["WITHDRAWN", "已放弃"]],
  },
} as const;

export function JobForm() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language];
  const options = optionCopy[language];
  const [required, setRequired] = useState(["React", "TypeScript"]);
  const [bonus, setBonus] = useState(["Next.js"]);
  const [includesFixedOvertime, setIncludesFixedOvertime] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/jobs");
  };

  return (
    <form className="grid gap-6" onSubmit={submit}>
      <section className="flex items-end justify-between gap-7 pb-1 max-[760px]:grid max-[760px]:items-start">
        <div>
          <Button className="mb-3.5 h-auto p-0 text-[11px] text-[#a994df] no-underline hover:text-[#d0c0f7]" variant="link" size="sm" type="button" onClick={() => navigate(-1)}><ArrowLeft size={16} />{text.back}</Button>
          <p className="m-0 text-[10px] font-bold text-[#786f82]">NEW OPPORTUNITY</p>
          <h2 className="mb-1 mt-2 text-[27px] font-semibold max-[760px]:text-[23px]">{text.title}</h2>
          <p className="text-[13px] text-[#948e9d]">{text.subtitle}</p>
        </div>
        <div className="flex gap-2 max-[760px]:w-full max-[760px]:[&>button]:flex-1">
          <Button className="h-[38px] rounded-[5px] border-[#2c2831] bg-[#17151a] px-3.5 text-xs text-[#c5bfca] hover:border-[#46404e] hover:bg-[#17151a] hover:text-white" variant="outline" type="button" onClick={() => navigate("/jobs")}>{text.cancel}</Button>
          <Button className="h-[38px] rounded-[5px] bg-[#7c3aed] px-3.5 text-xs text-white hover:bg-[#8b4cf0]" type="submit"><Save size={17} />{text.save}</Button>
        </div>
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)_300px] items-start gap-[18px] max-[1050px]:grid-cols-1">
        <div className="grid gap-[18px]">
          <FormSection icon={<BriefcaseBusiness size={18} />} title={text.basic} hint={text.basicHint}>
            <div className="mt-[21px] grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
              <Field label={`${text.companyName} *`}><input className={fieldClass} name="companyName" required placeholder={text.companyPlaceholder} /></Field>
              <Field label={`${text.positionName} *`}><input className={fieldClass} name="positionName" required placeholder={text.positionPlaceholder} /></Field>
              <Field label={`${text.employmentType} *`}><OptionSelect name="employmentType" options={options.employmentTypes} /></Field>
              <Field label={text.hiringCount}><InputWithSuffix name="hiringCount" type="number" min="1" placeholder="1" suffix={text.hiringCountSuffix} /></Field>
              <Field label={`${text.platform} *`}><select className={fieldClass} name="platform" defaultValue="Green" required>{recruitmentPlatforms.map((platform) => <option key={platform}>{platform}</option>)}</select></Field>
              <Field label={`${text.workMode} *`}><OptionSelect name="workMode" options={options.workModes} /></Field>
              <div className="col-span-full max-[760px]:col-auto"><Field label={text.location}><input className={fieldClass} name="location" placeholder={text.locationPlaceholder} /></Field></div>
            </div>
          </FormSection>

          <FormSection icon={<Banknote size={18} />} title={text.salary} hint={text.salaryHint}>
            <div className="mt-[21px] flex justify-end">
              <div className="w-[180px] max-[560px]:w-full"><Field label={text.currency}><select className={fieldClass} name="salaryCurrency" defaultValue="JPY"><option value="JPY">JPY</option><option value="USD">USD</option><option value="CNY">CNY</option></select></Field></div>
            </div>
            <div className="mt-4 grid gap-3">
              <SalaryRange label={text.annualSalary} minLabel={text.salaryMin} maxLabel={text.salaryMax} minName="annualSalaryMin" maxName="annualSalaryMax" minPlaceholder="500" maxPlaceholder="750" suffix={language === "ja" ? "万円" : "万日元"} />
              <SalaryRange label={text.monthlySalary} minLabel={text.salaryMin} maxLabel={text.salaryMax} minName="monthlySalaryMin" maxName="monthlySalaryMax" minPlaceholder="30" maxPlaceholder="45" suffix={language === "ja" ? "万円" : "万日元"} />
              <SalaryRange label={text.hourlySalary} minLabel={text.salaryMin} maxLabel={text.salaryMax} minName="hourlySalaryMin" maxName="hourlySalaryMax" minPlaceholder="1500" maxPlaceholder="2500" suffix={language === "ja" ? "円 / 時" : "日元 / 时"} />
            </div>
            <label className="mt-5 flex w-fit items-center gap-2.5 text-[11px] text-[#c8c2cd]"><input className="size-4 accent-[#8b5cf6]" type="checkbox" name="includesFixedOvertime" checked={includesFixedOvertime} onChange={(event) => setIncludesFixedOvertime(event.target.checked)} />{text.fixedOvertime}</label>
            {includesFixedOvertime && <div className="mt-4 grid grid-cols-2 gap-[18px] max-[560px]:grid-cols-1"><Field label={text.overtimeHours}><InputWithSuffix name="fixedOvertimeHours" type="number" min="0" placeholder="20" suffix={text.overtimeHoursSuffix} /></Field><Field label={text.overtimeAmount}><InputWithSuffix name="fixedOvertimeAmount" type="number" min="0" placeholder="50000" suffix={text.overtimeAmountSuffix} /></Field></div>}
          </FormSection>

          <FormSection icon={<FileText size={18} />} title={text.descriptions} hint={text.descriptionsHint}>
            <div className="mt-5 grid gap-[18px]">
              <Field label={text.jobDescription}><textarea className={textareaClass} name="description" rows={9} placeholder={text.jobDescriptionPlaceholder} /></Field>
              <div className="grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
                <DescriptionField name="applicationRequirements" label={text.applicationRequirements} />
                <DescriptionField name="preferredQualifications" label={text.preferredQualifications} />
                <DescriptionField name="selectionProcess" label={text.selectionProcess} />
                <DescriptionField name="workLocationDetails" label={text.workLocationDetails} />
                <DescriptionField name="workingHours" label={text.workingHours} />
                <DescriptionField name="benefits" label={text.benefits} />
                <DescriptionField name="holidays" label={text.holidays} />
                <DescriptionField name="teamEnvironment" label={text.teamEnvironment} />
              </div>
            </div>
          </FormSection>

          <FormSection icon={<Sparkles size={18} />} title={text.skills} hint={text.skillsHint}>
            <TagEditor label={text.requiredSkills} placeholder={text.tagPlaceholder} tags={required} setTags={setRequired} />
            <TagEditor label={text.bonusSkills} placeholder={text.tagPlaceholder} tags={bonus} setTags={setBonus} />
          </FormSection>

          <FormSection icon={<Plus size={18} />} title={text.notes} hint={text.notesHint}>
            <div className="mt-5"><Field label={text.notes}><textarea className={textareaClass} name="notes" rows={6} placeholder={text.notesPlaceholder} /></Field></div>
          </FormSection>
        </div>

        <aside><div className="sticky top-[100px] rounded-md border border-[#211e25] bg-[#151318] p-[21px] max-[1050px]:static">
          <p className="m-0 text-[10px] font-bold text-[#786f82]">TRACKING</p><h3 className="mt-1 text-[15px] font-semibold">{text.tracking}</h3>
          <div className="mt-5"><Field label={text.currentStatus}><OptionSelect name="status" options={options.statuses} /></Field></div>
          <div className="mt-[18px] rounded-[5px] border border-[#2d2840] bg-[#1b1725] p-3.5"><span className="text-[9px] text-[#77717f]">{text.savedDates}</span><strong className="mt-1 block text-[11px] text-[#b69bf2]">{text.savedDatesValue}</strong></div>
          <div className="mt-[18px]"><Field label={text.sourceUrl}><div className="relative flex items-center"><Link2 className="absolute left-[11px] text-[#6f6977]" size={16} /><input className={`${fieldClass} pl-9`} name="url" type="url" placeholder="https://..." /></div></Field></div>
        </div></aside>
      </div>
    </form>
  );
}

function FormSection({ icon, title, hint, children }: { icon: ReactNode; title: string; hint: string; children: ReactNode }) {
  return <section className={sectionClass}><div className={sectionTitleClass}><span className="grid size-[34px] place-items-center rounded-[5px] bg-[#221a35] text-[#b9a2ed]">{icon}</span><div><h3 className="text-[15px] font-semibold">{title}</h3><p className="mt-1 text-[10px] text-[#948e9d]">{hint}</p></div></div>{children}</section>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className={labelClass}><span>{label}</span>{children}</label>;
}

function DescriptionField({ name, label }: { name: string; label: string }) {
  return <Field label={label}><textarea className={textareaClass} name={name} rows={5} /></Field>;
}

function InputWithSuffix({ suffix, ...props }: InputHTMLAttributes<HTMLInputElement> & { suffix: string }) {
  return <div className="relative flex items-center"><input className={`${fieldClass} pr-[88px]`} {...props} /><span className="pointer-events-none absolute right-[11px] text-[9px] text-[#948e9d]">{suffix}</span></div>;
}

function OptionSelect({ options, value, onChange, name }: { options: ReadonlyArray<readonly [string, string]>; value?: string; onChange?: (value: string) => void; name: string }) {
  return <select className={fieldClass} name={name} value={value} defaultValue={value === undefined ? options[0][0] : undefined} onChange={onChange ? (event) => onChange(event.target.value) : undefined}>{options.map(([optionValue, label]) => <option key={optionValue} value={optionValue}>{label}</option>)}</select>;
}

function TagEditor({ label, placeholder, tags, setTags }: { label: string; placeholder: string; tags: string[]; setTags: (tags: string[]) => void }) {
  const [value, setValue] = useState("");
  const add = () => { const next = value.trim(); if (next && !tags.includes(next)) setTags([...tags, next]); setValue(""); };
  return <div className="mt-5 grid gap-[7px]"><span className="text-[10px] text-[#bcb6c2]">{label}</span><div className="flex min-h-[45px] flex-wrap gap-1.5 rounded-[5px] border border-[#2c2831] bg-[#100f12] p-[7px]">{tags.map((tag) => <span className="inline-flex items-center gap-1 rounded-[3px] border border-[#40325b] bg-[#221a31] px-2 text-[10px] text-[#c8b4f2]" key={tag}>{tag}<button className="grid border-0 bg-transparent p-0 text-[#927fac]" type="button" onClick={() => setTags(tags.filter((item) => item !== tag))} aria-label={`Delete ${tag}`}><X size={12} /></button></span>)}<input className="h-7 min-w-[150px] flex-1 border-0 bg-transparent text-xs text-[#f5f2f7] outline-none" value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); add(); } }} placeholder={placeholder} /></div></div>;
}

function SalaryRange({ label, minLabel, maxLabel, minName, maxName, minPlaceholder, maxPlaceholder, suffix }: { label: string; minLabel: string; maxLabel: string; minName: string; maxName: string; minPlaceholder: string; maxPlaceholder: string; suffix: string }) {
  return <div className="grid grid-cols-[110px_minmax(0,1fr)_minmax(0,1fr)] items-end gap-3 rounded-[5px] border border-[#211e25] bg-[#111014] p-3 max-[620px]:grid-cols-1"><strong className="self-center text-xs text-[#d3cdd7]">{label}</strong><Field label={minLabel}><InputWithSuffix name={minName} type="number" min="0" placeholder={minPlaceholder} suffix={suffix} /></Field><Field label={maxLabel}><InputWithSuffix name={maxName} type="number" min="0" placeholder={maxPlaceholder} suffix={suffix} /></Field></div>;
}
