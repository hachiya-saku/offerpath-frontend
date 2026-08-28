import { BriefcaseBusiness, Building2, ChevronRight, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { companies, jobs } from "@/data/mockData";

const copy = {
  ja: {
    eyebrow: "COMPANY DIRECTORY",
    title: "企業一覧",
    subtitle: "登録済みの求人から企業情報をまとめて確認できます。",
    search: "企業名を検索",
    total: "登録企業",
    active: "選考中の企業",
    company: "企業",
    jobs: "求人",
    platforms: "求人媒体",
    updated: "最終更新",
    viewJobs: "詳細を見る",
    empty: "該当する企業がありません",
  },
  zh: {
    eyebrow: "COMPANY DIRECTORY",
    title: "公司一览",
    subtitle: "集中查看已记录岗位所关联的公司。",
    search: "搜索公司名称",
    total: "已记录公司",
    active: "选考中的公司",
    company: "公司",
    jobs: "岗位",
    platforms: "招聘平台",
    updated: "最近更新",
    viewJobs: "查看详情",
    empty: "没有符合条件的公司",
  },
} as const;

const finishedStatuses = new Set(["offer", "挂了"]);

export function Companies() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language];
  const [query, setQuery] = useState("");

  const companyRows = useMemo(() => companies.map((company) => {
    const companyJobs = jobs.filter((job) => job.company === company.name);
    return {
      ...company,
      jobs: companyJobs.length,
      activeJobs: companyJobs.filter((job) => !finishedStatuses.has(job.status)).length,
      platforms: [...new Set(companyJobs.map((job) => job.platform))],
      updatedAt: companyJobs[0]?.updatedAt ?? "-",
    };
  }), []);

  const filtered = companyRows.filter((company) =>
    company.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const activeCompanies = companyRows.filter((company) => company.activeJobs > 0).length;

  return (
    <div className="grid gap-6">
      <section className="flex items-end justify-between gap-6 max-[760px]:grid">
        <div>
          <p className="m-0 text-[10px] font-bold text-[#786f82]">{text.eyebrow}</p>
          <h2 className="mb-1 mt-2 text-[27px] font-semibold max-[760px]:text-[23px]">{text.title}</h2>
          <p className="text-[13px] text-[#948e9d]">{text.subtitle}</p>
        </div>
        <label className="flex h-[41px] w-[300px] items-center gap-2 rounded-[5px] border border-[#2c2831] bg-[#111014] px-3 text-[#6f6977] max-[760px]:w-full">
          <Search size={16} />
          <input className="min-w-0 flex-1 border-0 bg-transparent text-xs text-[#f5f2f7] outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} />
        </label>
      </section>

      <section className="grid grid-cols-2 overflow-hidden rounded-md border border-[#211e25] max-[560px]:grid-cols-1">
        <Stat icon={<Building2 size={18} />} label={text.total} value={companyRows.length} />
        <Stat icon={<BriefcaseBusiness size={18} />} label={text.active} value={activeCompanies} />
      </section>

      <section className="overflow-hidden rounded-md border border-[#211e25] bg-[#151318]">
        <div className="grid min-h-10 grid-cols-[minmax(220px,1.4fr)_100px_minmax(160px,.8fr)_120px_120px] items-center gap-4 border-b border-[#211e25] bg-[#111014] px-5 text-[9px] font-semibold text-[#6f6977] max-[900px]:hidden">
          <span>{text.company}</span><span>{text.jobs}</span><span>{text.platforms}</span><span>{text.updated}</span><span />
        </div>
        {filtered.map((company) => (
          <article className="grid min-h-[78px] grid-cols-[minmax(220px,1.4fr)_100px_minmax(160px,.8fr)_120px_120px] items-center gap-4 border-b border-[#211e25] px-5 last:border-b-0 max-[900px]:flex max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-3 max-[900px]:py-4" key={company.name}>
            <div className="flex min-w-0 items-center gap-3">
              <span className="company-monogram">{company.name.slice(0, 1).toUpperCase()}</span>
              <div className="min-w-0"><strong className="block truncate text-xs">{company.name}</strong><small className="mt-1 block text-[9px] text-[#6f6977]">{company.activeJobs} active</small></div>
            </div>
            <span className="text-xs text-[#c8c2cd]">{company.jobs} {text.jobs}</span>
            <div className="flex flex-wrap gap-1.5">
              {company.platforms.map((platform) => <span className="rounded-[3px] border border-[#2c2831] bg-[#111014] px-2 py-1 text-[9px] text-[#9c95a2]" key={platform}>{platform}</span>)}
            </div>
            <span className="text-[10px] text-[#77717f]">{company.updatedAt}</span>
            <Button className="h-8 justify-between rounded-[4px] border-[#34294b] bg-[#211a2e] px-2.5 text-[10px] text-[#c5b0f4] hover:bg-[#2a203b] max-[900px]:w-full" variant="outline" type="button" onClick={() => navigate(`/companies/${company.id}`)}>{text.viewJobs}<ChevronRight size={14} /></Button>
          </article>
        ))}
        {filtered.length === 0 && <div className="grid min-h-40 place-items-center text-xs text-[#77717f]">{text.empty}</div>}
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return <div className="flex items-center gap-3 border-r border-[#211e25] bg-[#151318] p-[18px] last:border-r-0 max-[560px]:border-b max-[560px]:border-r-0 max-[560px]:last:border-b-0"><span className="grid size-9 place-items-center rounded-[5px] bg-[#221a35] text-[#b9a2ed]">{icon}</span><div><span className="block text-[9px] text-[#77717f]">{label}</span><strong className="mt-1 block text-xl">{value}</strong></div></div>;
}
