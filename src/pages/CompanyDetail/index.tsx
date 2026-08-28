import { ArrowLeft, Building2, ExternalLink, MapPin, UsersRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { companies, jobs, type JobStatus } from "@/data/mockData";

const copy = {
  ja: {
    back: "企業一覧",
    directory: "COMPANY PROFILE",
    industry: "業界",
    size: "従業員規模",
    location: "所在地",
    website: "Webサイト",
    notes: "企業メモ",
    relatedJobs: "登録求人",
    relatedHint: "この企業に関連付けられた求人",
    jobs: "件",
    emptyJobs: "この企業の求人はまだありません",
    notFound: "企業が見つかりません",
  },
  zh: {
    back: "公司一览",
    directory: "COMPANY PROFILE",
    industry: "所属行业",
    size: "员工规模",
    location: "所在地",
    website: "公司网站",
    notes: "公司备注",
    relatedJobs: "关联岗位",
    relatedHint: "已关联到这家公司的岗位",
    jobs: "个",
    emptyJobs: "这家公司还没有关联岗位",
    notFound: "没有找到公司",
  },
} as const;

const statusJa: Record<JobStatus, string> = {
  想投: "応募検討",
  已投: "応募済み",
  书类选考: "書類選考",
  一面: "一次面接",
  二面: "二次面接",
  三面: "三次面接",
  终面: "最終面接",
  offer: "内定",
  挂了: "不採用",
};

export function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language];
  const company = companies.find((item) => item.id === id);

  if (!company) {
    return <div className="grid min-h-[45vh] place-items-center text-sm text-[#77717f]">{text.notFound}</div>;
  }

  const companyJobs = jobs.filter((job) => job.company === company.name);

  return (
    <div className="grid gap-6">
      <section className="border-b border-[#211e25] pb-6">
        <Button className="h-auto p-0 text-[11px] text-[#a994df] hover:bg-transparent hover:text-[#d0c0f7]" variant="ghost" type="button" onClick={() => navigate("/companies")}>
          <ArrowLeft size={16} />{text.back}
        </Button>
        <div className="mt-6 flex items-start gap-4 max-[620px]:flex-wrap">
          <span className="grid size-[58px] shrink-0 place-items-center rounded-md border border-[#4d3c6b] bg-[#221a35] text-xl font-bold text-[#c8b0fc]">{company.name.slice(0, 1).toUpperCase()}</span>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[10px] font-bold text-[#786f82]">{text.directory}</p>
            <h2 className="mb-2 mt-1.5 text-[27px] font-semibold max-[620px]:text-[23px]">{company.name}</h2>
            <p className="max-w-[760px] break-words text-xs leading-6 text-[#948e9d] [overflow-wrap:anywhere]">{company.description}</p>
          </div>
          {company.website && (
            <Button className="h-[38px] rounded-[5px] border-[#34294b] bg-[#211a2e] px-3 text-[11px] text-[#c5b0f4] hover:bg-[#2a203b] max-[620px]:w-full" variant="outline" type="button" onClick={() => window.open(company.website, "_blank", "noopener,noreferrer")}>
              <ExternalLink size={15} />{text.website}
            </Button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-4 overflow-hidden rounded-md border border-[#211e25] max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
        <Info icon={<Building2 size={16} />} label={text.industry} value={company.industry ?? "-"} />
        <Info icon={<UsersRound size={16} />} label={text.size} value={company.size ?? "-"} />
        <Info icon={<MapPin size={16} />} label={text.location} value={company.location ?? "-"} />
        <Info icon={<ExternalLink size={16} />} label={text.website} value={company.website ?? "-"} />
      </section>

      {company.notes && (
        <section className="rounded-md border border-[#211e25] bg-[#151318] p-[21px]">
          <p className="m-0 text-[10px] font-bold text-[#786f82]">NOTES</p>
          <h3 className="mt-1 text-[15px] font-semibold">{text.notes}</h3>
          <p className="mt-4 text-xs leading-7 text-[#aaa4ae]">{company.notes}</p>
        </section>
      )}

      <section className="overflow-hidden rounded-md border border-[#211e25] bg-[#151318]">
        <header className="flex items-end justify-between gap-4 border-b border-[#211e25] p-5">
          <div><p className="m-0 text-[10px] font-bold text-[#786f82]">JOBS</p><h3 className="mt-1 text-[15px] font-semibold">{text.relatedJobs}</h3><p className="mt-1 text-[10px] text-[#77717f]">{text.relatedHint}</p></div>
          <strong className="text-sm text-[#b9a2ed]">{companyJobs.length} {text.jobs}</strong>
        </header>
        {companyJobs.map((job) => (
          <button className="grid min-h-[72px] w-full grid-cols-[minmax(0,1.3fr)_120px_150px_110px_20px] items-center gap-4 border-0 border-b border-[#211e25] bg-transparent px-5 text-left last:border-b-0 hover:bg-[#19161d] max-[760px]:grid-cols-[minmax(0,1fr)_auto_18px] max-[760px]:gap-y-1 max-[760px]:py-4" key={job.id} type="button" onClick={() => navigate(`/jobs/${job.id}`)}>
            <div className="min-w-0"><strong className="block truncate text-xs">{job.role}</strong><small className="mt-1 block text-[9px] text-[#77717f]">{job.platform}</small></div>
            <span className={`status-badge status-${job.status}`}>{language === "ja" ? statusJa[job.status] : job.status}</span>
            <span className="text-[10px] text-[#aaa4ae] max-[760px]:col-span-2">{job.salary}</span>
            <span className="text-[9px] text-[#77717f] max-[760px]:col-span-2">{job.updatedAt}</span>
            <span className="text-[#77717f]">›</span>
          </button>
        ))}
        {companyJobs.length === 0 && <div className="grid min-h-40 place-items-center text-xs text-[#77717f]">{text.emptyJobs}</div>}
      </section>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="min-w-0 border-r border-[#211e25] bg-[#151318] p-[18px] last:border-r-0 max-[900px]:border-b max-[520px]:border-r-0"><span className="flex items-center gap-2 text-[9px] text-[#77717f]">{icon}{label}</span><strong className="mt-2 block truncate text-xs text-[#d2ccd6]">{value}</strong></div>;
}
