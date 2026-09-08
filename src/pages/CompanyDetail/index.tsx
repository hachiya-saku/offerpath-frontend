import { ArrowLeft, Building2, ExternalLink, MapPin, Pencil, UsersRound } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyAPI, updateCompanyAPI } from "@/api/companies";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { getJobStatusLabel } from "@/i18n/jobLabels";
import type { Company } from "@/types/companies";
import type { UpdateCompanyRequest } from "@/types/companies";
import { EditCompanyDialog } from "./EditCompanyDialog";

export function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language];
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoadError(true);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const loadCompany = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        const response = await getCompanyAPI(id);
        if (!cancelled) setCompany(response.data);
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadCompany();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSave = async (data: UpdateCompanyRequest) => {
    if (!id) return;
    setIsSaving(true);
    setSaveError("");

    try {
      const response = await updateCompanyAPI(id, data);
      setCompany(response.data);
      setEditOpen(false);
    } catch {
      setSaveError(text.saveError);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <PageMessage>{text.loading}</PageMessage>;
  if (loadError || !company) return <PageMessage error>{text.notFound}</PageMessage>;

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
            <p className="max-w-[760px] break-words text-xs leading-6 text-[#948e9d] [overflow-wrap:anywhere]">{company.description ?? text.noDescription}</p>
          </div>
          <div className="flex gap-2 max-[620px]:w-full max-[620px]:flex-wrap">
            <Button className="h-[38px] rounded-[5px] border-[#34294b] bg-[#211a2e] px-3 text-[11px] text-[#c5b0f4] hover:bg-[#2a203b] max-[620px]:flex-1" variant="outline" type="button" onClick={() => { setSaveError(""); setEditOpen(true); }}>
              <Pencil size={15} />{text.edit}
            </Button>
            {company.website && (
              <Button className="h-[38px] rounded-[5px] border-[#34294b] bg-[#211a2e] px-3 text-[11px] text-[#c5b0f4] hover:bg-[#2a203b] max-[620px]:flex-1" variant="outline" type="button" onClick={() => window.open(company.website!, "_blank", "noopener,noreferrer")}>
                <ExternalLink size={15} />{text.website}
              </Button>
            )}
          </div>
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
          <p className="mt-4 whitespace-pre-wrap text-xs leading-7 text-[#aaa4ae]">{company.notes}</p>
        </section>
      )}

      <section className="overflow-hidden rounded-md border border-[#211e25] bg-[#151318]">
        <header className="flex items-end justify-between gap-4 border-b border-[#211e25] p-5">
          <div><p className="m-0 text-[10px] font-bold text-[#786f82]">JOBS</p><h3 className="mt-1 text-[15px] font-semibold">{text.relatedJobs}</h3><p className="mt-1 text-[10px] text-[#77717f]">{text.relatedHint}</p></div>
          <strong className="text-sm text-[#b9a2ed]">{company.jobs.length} {text.jobs}</strong>
        </header>
        {company.jobs.map((job) => (
          <button className="grid min-h-[72px] w-full grid-cols-[minmax(0,1.3fr)_120px_150px_110px_20px] items-center gap-4 border-0 border-b border-[#211e25] bg-transparent px-5 text-left last:border-b-0 hover:bg-[#19161d] max-[760px]:grid-cols-[minmax(0,1fr)_auto_18px] max-[760px]:gap-y-1 max-[760px]:py-4" key={job.id} type="button" onClick={() => navigate(`/jobs/${job.id}`)}>
            <div className="min-w-0"><strong className="block truncate text-xs">{job.positionName}</strong><small className="mt-1 block text-[9px] text-[#77717f]">{job.platform}</small></div>
            <span className={`status-badge status-${job.status}`}>{getJobStatusLabel(job.status, language)}</span>
            <span className="text-[10px] text-[#aaa4ae] max-[760px]:col-span-2">{formatSalary(job.annualSalaryMin, job.annualSalaryMax, language)}</span>
            <span className="text-[9px] text-[#77717f] max-[760px]:col-span-2">{formatDate(job.updatedAt, language)}</span>
            <span className="text-[#77717f]">›</span>
          </button>
        ))}
        {company.jobs.length === 0 && <div className="grid min-h-40 place-items-center text-xs text-[#77717f]">{text.emptyJobs}</div>}
      </section>
      <EditCompanyDialog
        company={company}
        isSaving={isSaving}
        language={language}
        onClose={() => setEditOpen(false)}
        onSave={(data) => void handleSave(data)}
        open={editOpen}
        saveError={saveError}
      />
    </div>
  );
}

function formatSalary(min: number | null, max: number | null, language: "ja" | "zh") {
  if (min === null && max === null) return "-";
  const suffix = language === "ja" ? "万円" : " 万日元";
  if (min !== null && max !== null) return `${min}〜${max}${suffix}`;
  if (min !== null) return `${min}${suffix}〜`;
  return `〜${max}${suffix}`;
}

function formatDate(value: string, language: "ja" | "zh") {
  return new Intl.DateTimeFormat(language === "ja" ? "ja-JP" : "zh-CN").format(new Date(value));
}

function PageMessage({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <div className={`grid min-h-[45vh] place-items-center text-sm ${error ? "text-[#d9878e]" : "text-[#77717f]"}`} role={error ? "alert" : undefined}>{children}</div>;
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="min-w-0 border-r border-[#211e25] bg-[#151318] p-[18px] last:border-r-0 max-[900px]:border-b max-[520px]:border-r-0"><span className="flex items-center gap-2 text-[9px] text-[#77717f]">{icon}{label}</span><strong className="mt-2 block truncate text-xs text-[#d2ccd6]">{value}</strong></div>;
}

const copy = {
  ja: { back: "企業一覧", directory: "COMPANY PROFILE", edit: "企業情報を編集", industry: "業界", size: "従業員規模", location: "所在地", website: "Webサイト", notes: "企業メモ", relatedJobs: "登録求人", relatedHint: "この企業に関連付けられた求人", jobs: "件", emptyJobs: "この企業の求人はまだありません", notFound: "企業情報を取得できませんでした", loading: "企業情報を読み込んでいます...", noDescription: "企業説明はまだ登録されていません。", saveError: "企業情報を更新できませんでした。入力内容を確認してください。" },
  zh: { back: "公司一览", directory: "COMPANY PROFILE", edit: "编辑公司资料", industry: "所属行业", size: "员工规模", location: "所在地", website: "公司网站", notes: "公司备注", relatedJobs: "关联岗位", relatedHint: "已关联到这家公司的岗位", jobs: "个", emptyJobs: "这家公司还没有关联岗位", notFound: "公司信息获取失败", loading: "正在读取公司信息...", noDescription: "暂未记录公司介绍。", saveError: "公司资料更新失败，请检查输入内容。" },
} as const;
