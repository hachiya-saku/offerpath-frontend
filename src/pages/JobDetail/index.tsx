import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { jobs, statuses } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getJobStatusLabel } from "@/i18n/jobLabels";

const panelClass =
  "rounded-md border border-[#211e25] bg-[#151318] p-[21px] max-[460px]:p-[17px]";
const eyebrowClass = "m-0 text-[10px] font-bold text-[#786f82]";

export function JobDetail() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = detailCopy[language];
  const { id } = useParams();
  const job = jobs.find((item) => item.id === Number(id)) ?? jobs[0];
  return (
    <div className="grid gap-6">
      <section className="border-b border-[#211e25] pb-[22px] pt-1">
        <Button
          className="h-auto p-0 text-[11px] text-[#a994df] hover:bg-transparent hover:text-[#d0c0f7]"
          variant="ghost"
          type="button"
          onClick={() => navigate("/jobs")}
        >
          <ArrowLeft size={16} />
          {text.jobs}
        </Button>
        <div className="mt-6 flex items-center gap-[15px] max-[760px]:flex-wrap max-[760px]:items-start">
          <span className="company-monogram large">
            {job.company.slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[11px] text-[#948e9d]">{job.company}</p>
            <h2 className="mb-1.5 mt-1 text-[27px] font-semibold">
              {job.role}
            </h2>
            <span className="flex items-center gap-1 text-[10px] text-[#948e9d]">
              <MapPin size={14} />
              {job.location} · {job.platform}
            </span>
          </div>
          <div className="flex gap-2 max-[760px]:w-full">
            <Button
              className="h-[38px] rounded-[5px] border-[#2c2831] bg-[#17151a] px-3.5 text-xs text-[#c5bfca] hover:border-[#46404e] hover:bg-[#17151a] hover:text-white"
              variant="outline"
              type="button"
            >
              <Pencil size={16} />
              {text.edit}
            </Button>
            <Button
              className="size-9 border-[#2c2831] text-[#a39ca9] hover:bg-[#1b181f] hover:text-white"
              variant="ghost"
              size="icon"
              type="button"
              title={text.more}
            >
              <MoreHorizontal size={18} />
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-px bg-[#211e25] max-[760px]:grid-cols-2">
          <div className="grid gap-2 bg-[#0c0b0e] p-[15px]">
            <span className="text-[9px] text-[#6f6977]">{text.currentStatus}</span>
            <strong className={`status-badge status-${job.status}`}>
              {getJobStatusLabel(job.status, language)}
            </strong>
          </div>
          <div className="grid gap-2 bg-[#0c0b0e] p-[15px]">
            <span className="text-[9px] text-[#6f6977]">{text.skillMatch}</span>
            <strong className="text-[17px] text-[#2dd4bf]">{job.match}%</strong>
          </div>
          <div className="grid gap-2 bg-[#0c0b0e] p-[15px]">
            <span className="text-[9px] text-[#6f6977]">{text.salary}</span>
            <strong className="text-xs">{job.salary}</strong>
          </div>
          <div className="grid gap-2 bg-[#0c0b0e] p-[15px]">
            <span className="text-[9px] text-[#6f6977]">{text.updatedAt}</span>
            <strong className="text-xs">{job.updatedAt}</strong>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-[18px] max-[1050px]:grid-cols-1">
        <div className="grid gap-[18px]">
          <section className={panelClass}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className={eyebrowClass}>SKILL MATCH</p>
                <h3 className="mt-1 text-[15px] font-semibold">{text.analysis}</h3>
              </div>
              <span className="grid size-[43px] place-items-center rounded-full border-[3px] border-[#2dd4bf] text-xs font-bold text-[#70ddcf]">
                {job.match}
              </span>
            </div>
            <div className="mt-[22px]">
              <h4 className="mb-2 text-[10px] font-normal text-[#948e9d]">
                {text.requiredSkills}
              </h4>
              <div className="flex flex-wrap gap-[7px]">
                {job.requiredSkills.map((skill) => (
                  <span
                    className="rounded-[3px] border border-[#265048] bg-[#142923] px-[9px] py-1.5 text-[10px] text-[#68d8c2]"
                    key={skill}
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-[22px]">
              <h4 className="mb-2 text-[10px] font-normal text-[#948e9d]">
                {text.bonusSkills}
              </h4>
              <div className="flex flex-wrap gap-[7px]">
                {job.bonusSkills.map((skill, index) => (
                  <span
                    className={`rounded-[3px] border px-[9px] py-1.5 text-[10px] ${index === 0 ? "border-[#265048] bg-[#142923] text-[#68d8c2]" : "border-[#2c2831] bg-[#19171c] text-[#8c8692]"}`}
                    key={skill}
                  >
                    {index === 0 ? "✓" : "−"} {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section className={panelClass}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className={eyebrowClass}>NOTES</p>
                <h3 className="mt-1 text-[15px] font-semibold">{text.notes}</h3>
              </div>
              <Button
                className="h-auto p-0 text-[11px] text-[#a994df] hover:bg-transparent hover:text-[#d0c0f7]"
                variant="ghost"
                type="button"
              >
                <Pencil size={14} />
                {text.edit}
              </Button>
            </div>
            <p className="mt-5 text-xs leading-7 text-[#aaa4ae]">{job.note}</p>
          </section>
          <section className={panelClass}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className={eyebrowClass}>SOURCE</p>
                <h3 className="mt-1 text-[15px] font-semibold">{text.source}</h3>
              </div>
            </div>
            <a
              className="mt-[18px] flex justify-between gap-2.5 rounded border border-[#2c2831] p-3 text-[10px] text-[#a994df] no-underline"
              href={job.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="truncate">{job.url}</span>
              <ExternalLink size={16} />
            </a>
          </section>
        </div>
        <aside className="grid gap-[18px] max-[1050px]:grid-cols-2 max-[760px]:grid-cols-1">
          <section className={panelClass}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className={eyebrowClass}>TIMELINE</p>
                <h3 className="mt-1 text-[15px] font-semibold">{text.timeline}</h3>
              </div>
              <CalendarDays size={18} />
            </div>
            <div className="mt-5">
              {statuses
                .slice(0, 5)
                .reverse()
                .map((status, index) => (
                  <div
                    className="relative flex min-h-[54px] gap-[11px] after:absolute after:bottom-0 after:left-1 after:top-[11px] after:w-px after:bg-[#2c2831] after:content-[''] last:after:hidden"
                    key={status}
                  >
                    <i
                      className={`z-10 size-[9px] rounded-full border-2 not-italic ${index < 3 ? "border-[#8b5cf6] bg-[#8b5cf6]" : "border-[#4c4652] bg-[#151318]"}`}
                    />
                    <p className="-mt-1 grid gap-[3px]">
                      <strong className="text-[11px]">{getJobStatusLabel(status, language)}</strong>
                      <span className="text-[9px] text-[#6f6977]">
                        {index < 3 ? `${8 + index}${text.month}${12 + index}${text.day}` : text.waiting}
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          </section>
          <Button
            className="h-[38px] w-full rounded-[5px] border border-[#4c252d] bg-[#211419] text-xs text-[#f08c94] hover:bg-[#2a171d]"
            variant="destructive"
            type="button"
          >
            <Trash2 size={16} />
            {text.deleteJob}
          </Button>
        </aside>
      </div>
    </div>
  );
}

const detailCopy = {
  ja: { jobs: "求人一覧", edit: "編集", more: "その他の操作", currentStatus: "現在のステータス", skillMatch: "スキルマッチ度", salary: "給与範囲", updatedAt: "最終更新", analysis: "スキルマッチ分析", requiredSkills: "必須スキル", bonusSkills: "歓迎スキル", notes: "求人メモ", source: "求人情報元", timeline: "ステータス履歴", waiting: "待機中", deleteJob: "この求人を削除", month: "月", day: "日" },
  zh: { jobs: "岗位一览", edit: "编辑", more: "更多操作", currentStatus: "当前状态", skillMatch: "技能匹配度", salary: "薪资范围", updatedAt: "最后更新", analysis: "技能匹配分析", requiredSkills: "必须技能", bonusSkills: "加分技能", notes: "岗位备注", source: "岗位来源", timeline: "状态记录", waiting: "等待中", deleteJob: "删除这个岗位", month: "月", day: "日" },
} as const;
