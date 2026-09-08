import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CalendarPlus,
  ExternalLink,
  FileText,
  MapPin,
  Pencil,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { jobs, type JobStatus } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getJobStatusLabel } from "@/i18n/jobLabels";
import { InterviewScheduleDialog } from "./InterviewScheduleDialog";
import { DeleteJobDialog } from "./DeleteJobDialog";
import { type Job } from "@/types/jobs";
import { StatusCorrectionDialog } from "./StatusCorrectionDialog";
import { deleteJobAPI, getJobAPI } from "@/api/jobs";

import {
  correctJobStatus,
  getJobStatusHistory,
  getStoredJobStatus,
  undoInterview,
  type InterviewRecord,
} from "@/data/interviewStore";

const interviewStatuses: JobStatus[] = ["一面", "二面", "三面", "终面"];

function getAvailableInterviewStatuses(status: JobStatus) {
  if (status === "书类选考") return interviewStatuses;
  const currentIndex = interviewStatuses.indexOf(status);
  return currentIndex === -1 ? [] : interviewStatuses.slice(currentIndex + 1);
}

function formatSalaryRange(
  min: number | null,
  max: number | null,
  language: "ja" | "zh",
) {
  if (min === null && max === null) return "-";

  if (language === "zh") {
    if (min !== null && max !== null) return `${min}万至${max}万日元`;
    if (min !== null) return `${min}万日元起`;
    return `最高${max}万日元`;
  }

  if (min !== null && max !== null) return `${min}万〜${max}万円`;
  if (min !== null) return `${min}万円〜`;
  return `〜${max}万円`;
}

function formatFixedOvertime(job: Job, language: "ja" | "zh") {
  if (!job.includesFixedOvertime) {
    return language === "ja" ? "なし" : "不包含";
  }

  const details = [
    job.fixedOvertimeHours === null
      ? null
      : language === "ja"
        ? `${job.fixedOvertimeHours}時間 / 月`
        : `${job.fixedOvertimeHours}小时 / 月`,
    job.fixedOvertimeAmount === null
      ? null
      : language === "ja"
        ? `${job.fixedOvertimeAmount.toLocaleString("ja-JP")}円 / 月`
        : `${job.fixedOvertimeAmount.toLocaleString("zh-CN")}日元 / 月`,
  ].filter((value): value is string => value !== null);

  if (details.length === 0) {
    return language === "ja" ? "含む（詳細なし）" : "包含（无明细）";
  }

  return details.join(" · ");
}

const employmentTypeLabels = {
  FULL_TIME: { ja: "正社員", zh: "正式员工" },
  CONTRACT: { ja: "契約社員", zh: "合同员工" },
  DISPATCH: { ja: "派遣社員", zh: "派遣员工" },
  FREELANCE: { ja: "業務委託", zh: "业务委托" },
  PART_TIME: { ja: "パート・アルバイト", zh: "兼职" },
} as const;

const workModeLabels = {
  ONSITE: { ja: "出社", zh: "到岗" },
  HYBRID: { ja: "ハイブリッド", zh: "混合办公" },
  REMOTE: { ja: "フルリモート", zh: "全远程" },
  FLEXIBLE: { ja: "応相談", zh: "可商议" },
} as const;

const panelClass =
  "rounded-md border border-[#211e25] bg-[#151318] p-[21px] max-[460px]:p-[17px]";
const eyebrowClass = "m-0 text-[10px] font-bold text-[#786f82]";

export function JobDetail() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = detailCopy[language];
  const { id } = useParams();
  const job = jobs.find((item) => item.id === Number(id)) ?? jobs[0];
  const [currentStatus, setCurrentStatus] = useState<JobStatus>(() =>
    getStoredJobStatus(job.id, job.status),
  );
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [lastChange, setLastChange] = useState<{
    interview: InterviewRecord;
    previousStatus: JobStatus;
  } | null>(null);
  const [statusHistory, setStatusHistory] = useState(() =>
    getJobStatusHistory(job.id),
  );
  const availableStatuses = getAvailableInterviewStatuses(currentStatus);
  const [apiJob, setApiJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!id) {
      setError(
        language === "ja"
          ? "求人IDを確認できません。"
          : "无法确认岗位 ID。",
      );
      return;
    }

    let cancelled = false;

    const fetchJob = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getJobAPI(id);

        if (!cancelled) {
          setApiJob(response.data);
        }
      } catch {
        if (!cancelled) {
          setError(
            language === "ja"
              ? "求人情報の取得に失敗しました。"
              : "获取岗位信息失败。",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchJob();

    return () => {
      cancelled = true;
    };
  }, [id, language]);

  const handleDelete = async () => {
    if (!id) {
      setDeleteError(text.deleteError);
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteJobAPI(id);
      navigate("/jobs", { replace: true });
    } catch {
      setDeleteError(text.deleteError);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!apiJob) {
    return null;
  }

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
            {apiJob.company.name.slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[11px] text-[#948e9d]">{apiJob.company.name}</p>
            <h2 className="mb-1.5 mt-1 text-[27px] font-semibold">
              {apiJob.positionName}
            </h2>
            <span className="flex items-center gap-1 text-[10px] text-[#948e9d]">
              <MapPin size={14} />
              {apiJob.location ?? "-"} · {apiJob.platform}
            </span>
          </div>
          <div className="flex gap-2 max-[760px]:w-full">
            <Button
              className="h-[38px] rounded-[5px] border-[#2c2831] bg-[#17151a] px-3.5 text-xs text-[#c5bfca] hover:border-[#46404e] hover:bg-[#17151a] hover:text-white"
              variant="outline"
              type="button"
              onClick={() => navigate(`/jobs/${apiJob.id}/edit`)}
            >
              <Pencil size={16} />
              {text.edit}
            </Button>
            <Button
              className="size-9 border-[#2c2831] text-[#a39ca9] hover:bg-[#1b181f] hover:text-white"
              variant="ghost"
              size="icon"
              type="button"
              title={text.correctStatus}
              onClick={() => setCorrectionOpen(true)}
            >
              <RotateCcw size={17} />
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-px bg-[#211e25] max-[760px]:grid-cols-2">
          <div className="grid gap-2 bg-[#0c0b0e] p-[15px]">
            <span className="text-[9px] text-[#6f6977]">
              {text.currentStatus}
            </span>
            <strong className={`status-badge status-${currentStatus}`}>
              {getJobStatusLabel(currentStatus, language)}
            </strong>
            {availableStatuses.length > 0 && (
              <button
                type="button"
                className="mt-1 flex w-fit items-center gap-1 border-0 bg-transparent p-0 text-[9px] text-[#b69bf2] hover:text-[#d6c9f4]"
                onClick={() => setScheduleOpen(true)}
              >
                <CalendarPlus size={13} />
                {text.schedule}
              </button>
            )}
          </div>
          <div className="grid gap-2 bg-[#0c0b0e] p-[15px]">
            <span className="text-[9px] text-[#6f6977]">{text.skillMatch}</span>
            <strong className="text-[17px] text-[#2dd4bf]">{apiJob.matchScore ?? 0}%</strong>
          </div>
          <div className="grid gap-2 bg-[#0c0b0e] p-[15px]">
            <span className="text-[9px] text-[#6f6977]">{text.salary}</span>
            <strong className="text-xs">
              {formatSalaryRange(
                apiJob.annualSalaryMin,
                apiJob.annualSalaryMax,
                language,
              )}
            </strong>
          </div>
          <div className="grid gap-2 bg-[#0c0b0e] p-[15px]">
            <span className="text-[9px] text-[#6f6977]">{text.updatedAt}</span>
            <strong className="text-xs">
              {new Intl.DateTimeFormat(
                language === "ja" ? "ja-JP" : "zh-CN",
              ).format(new Date(apiJob.updatedAt))}
            </strong>
          </div>
        </div>
      </section>
      {lastChange && (
        <div className="flex items-center justify-between gap-4 rounded-[5px] border border-[#49386b] bg-[#1d1729] px-4 py-3 text-xs text-[#cdbdf0]">
          <span>{text.statusAdvanced}</span>
          <Button
            type="button"
            variant="ghost"
            className="h-7 text-[#b99bea] hover:bg-[#2a203b] hover:text-white"
            onClick={() => {
              if (
                undoInterview(
                  lastChange.interview.id,
                  job.id,
                  lastChange.previousStatus,
                )
              ) {
                setCurrentStatus(lastChange.previousStatus);
                setStatusHistory(getJobStatusHistory(job.id));
              }
              setLastChange(null);
            }}
          >
            <RotateCcw size={14} />
            {text.undo}
          </Button>
        </div>
      )}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-[18px] max-[1050px]:grid-cols-1">
        <div className="grid gap-[18px]">
          <section className={panelClass}>
            <div className="flex items-center gap-[11px] border-b border-[#211e25] pb-5">
              <span className="grid size-[34px] place-items-center rounded-[5px] bg-[#221a35] text-[#b9a2ed]">
                <FileText size={18} />
              </span>
              <div>
                <p className={eyebrowClass}>JOB DESCRIPTION</p>
                <h3 className="mt-1 text-[15px] font-semibold">
                  {text.requirements}
                </h3>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-[5px] border border-[#211e25] bg-[#211e25] max-[760px]:grid-cols-1">
              <SummaryItem
                label={text.employmentType}
                value={employmentTypeLabels[apiJob.employmentType][language]}
              />
              <SummaryItem
                label={text.workMode}
                value={workModeLabels[apiJob.workMode][language]}
              />
              <SummaryItem
                label={text.hiringCount}
                value={
                  apiJob.hiringCount === null
                    ? "-"
                    : `${apiJob.hiringCount}${language === "ja" ? "名" : "人"}`
                }
              />
            </div>
            <div className="mt-6 border-l-2 border-[#7654ae] pl-4">
              <h4 className="text-[10px] font-medium text-[#bcb6c2]">
                {text.description}
              </h4>
              <p className="mt-2 text-xs leading-7 text-[#aaa4ae]">
                {apiJob.description ?? "-"}
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-2 border-t border-[#211e25] max-[760px]:grid-cols-1">
              <DetailItem
                label={text.monthlySalary}
                value={formatSalaryRange(
                  apiJob.monthlySalaryMin,
                  apiJob.monthlySalaryMax,
                  language,
                )}
              />
              <DetailItem
                label={text.fixedOvertime}
                value={formatFixedOvertime(apiJob, language)}
              />
              <DetailItem
                label={text.applicationRequirements}
                value={apiJob.applicationRequirements ?? "-"}
              />
              <DetailItem
                label={text.preferredQualifications}
                value={apiJob.preferredQualifications ?? "-"}
              />
              <DetailItem
                label={text.selectionProcess}
                value={apiJob.selectionProcess ?? "-"}
              />
              <DetailItem
                label={text.workLocationDetails}
                value={apiJob.workLocationDetails ?? "-"}
              />
              <DetailItem
                label={text.workingHours}
                value={apiJob.workingHours ?? "-"}
              />
              <DetailItem label={text.benefits} value={apiJob.benefits ?? "-"} />
              <DetailItem label={text.holidays} value={apiJob.holidays ?? "-"} />
              <DetailItem
                label={text.teamEnvironment}
                value={apiJob.teamEnvironment ?? "-"}
              />
            </dl>
          </section>
          <section className={panelClass}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className={eyebrowClass}>SKILL MATCH</p>
                <h3 className="mt-1 text-[15px] font-semibold">
                  {text.analysis}
                </h3>
              </div>
              <span className="grid size-[43px] place-items-center rounded-full border-[3px] border-[#2dd4bf] text-xs font-bold text-[#70ddcf]">
                {apiJob.matchScore ?? 0}%
              </span>
            </div>
            <div className="mt-[22px]">
              <h4 className="mb-2 text-[10px] font-normal text-[#948e9d]">
                {text.requiredSkills}
              </h4>
              <div className="flex flex-wrap gap-[7px]">
                {apiJob.requiredSkills.map((skill) => (
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
                {apiJob.bonusSkills.map((skill, index) => (
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
                onClick={() => navigate(`/jobs/${apiJob.id}/edit`)}
              >
                <Pencil size={14} />
                {text.edit}
              </Button>
            </div>
            <p className="mt-5 text-xs leading-7 text-[#aaa4ae]">
              {apiJob.notes ?? "-"}
            </p>
          </section>
          <section className={panelClass}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className={eyebrowClass}>SOURCE</p>
                <h3 className="mt-1 text-[15px] font-semibold">
                  {text.source}
                </h3>
              </div>
            </div>
            {apiJob.url ? (
              <a
                className="mt-[18px] flex justify-between gap-2.5 rounded border border-[#2c2831] p-3 text-[10px] text-[#a994df] no-underline"
                href={apiJob.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="truncate">{apiJob.url}</span>
                <ExternalLink size={16} />
              </a>
            ) : (
              <p className="mt-[18px] text-[10px] text-[#6f6977]">-</p>
            )}
          </section>
        </div>
        <aside className="grid gap-[18px] max-[1050px]:grid-cols-2 max-[760px]:grid-cols-1">
          <section className={panelClass}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className={eyebrowClass}>TIMELINE</p>
                <h3 className="mt-1 text-[15px] font-semibold">
                  {text.timeline}
                </h3>
              </div>
              <CalendarDays size={18} />
            </div>
            <div className="mt-5">
              {(statusHistory.length > 0
                ? statusHistory
                : [
                    {
                      id: "current",
                      toStatus: currentStatus,
                      changeType: "ADVANCE" as const,
                      createdAt: new Date().toISOString(),
                    },
                  ]
              ).map((history, index) => (
                <div
                  className="relative flex min-h-[54px] gap-[11px] after:absolute after:bottom-0 after:left-1 after:top-[11px] after:w-px after:bg-[#2c2831] after:content-[''] last:after:hidden"
                  key={history.id}
                >
                  <i
                    className={`z-10 size-[9px] rounded-full border-2 not-italic ${index === 0 ? "border-[#8b5cf6] bg-[#8b5cf6]" : "border-[#4c4652] bg-[#151318]"}`}
                  />
                  <p className="-mt-1 grid gap-[3px]">
                    <strong className="text-[11px]">
                      {getJobStatusLabel(history.toStatus, language)}
                    </strong>
                    <span className="text-[9px] text-[#6f6977]">
                      {history.changeType === "CORRECTION"
                        ? text.corrected
                        : history.changeType === "UNDO"
                          ? text.undone
                          : text.advanced}
                      {" · "}
                      {new Intl.DateTimeFormat(
                        language === "ja" ? "ja-JP" : "zh-CN",
                        { dateStyle: "short", timeStyle: "short" },
                      ).format(new Date(history.createdAt))}
                    </span>
                    {"reason" in history && history.reason && (
                      <span className="text-[9px] text-[#827a89]">
                        {history.reason}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <Button
            className="h-[38px] w-full rounded-[5px] border border-[#4c252d] bg-[#211419] text-xs text-[#f08c94] hover:bg-[#2a171d]"
            variant="destructive"
            type="button"
            onClick={() => {
              setDeleteError("");
              setDeleteOpen(true);
            }}
          >
            <Trash2 size={16} />
            {text.deleteJob}
          </Button>
        </aside>
      </div>
      {scheduleOpen && availableStatuses.length > 0 && (
        <InterviewScheduleDialog
          job={job}
          previousStatus={currentStatus}
          availableStatuses={availableStatuses}
          onClose={() => setScheduleOpen(false)}
          onSaved={(interview) => {
            setLastChange({ interview, previousStatus: currentStatus });
            setCurrentStatus(interview.round);
            setStatusHistory(getJobStatusHistory(job.id));
            setScheduleOpen(false);
          }}
        />
      )}
      {correctionOpen && (
        <StatusCorrectionDialog
          jobId={job.id}
          currentStatus={currentStatus}
          onClose={() => setCorrectionOpen(false)}
          onCorrect={(status, reason) => {
            correctJobStatus(job.id, currentStatus, status, reason);
            setCurrentStatus(status);
            setStatusHistory(getJobStatusHistory(job.id));
            setLastChange(null);
            setCorrectionOpen(false);
          }}
        />
      )}
      <DeleteJobDialog
        error={deleteError}
        isDeleting={isDeleting}
        jobName={`${apiJob.company.name} / ${apiJob.positionName}`}
        language={language}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => void handleDelete()}
        open={deleteOpen}
      />
    </div>
  );
}

const detailCopy = {
  ja: {
    jobs: "求人一覧",
    edit: "編集",
    correctStatus: "ステータスを修正",
    currentStatus: "現在のステータス",
    schedule: "面接を設定",
    skillMatch: "スキルマッチ度",
    salary: "給与範囲",
    updatedAt: "最終更新",
    requirements: "募集要項",
    employmentType: "雇用形態",
    workMode: "勤務形態",
    hiringCount: "採用予定人数",
    monthlySalary: "月給",
    fixedOvertime: "固定残業代",
    description: "仕事内容",
    applicationRequirements: "応募資格",
    preferredQualifications: "歓迎条件",
    selectionProcess: "選考プロセス",
    workLocationDetails: "勤務地詳細",
    workingHours: "勤務時間",
    benefits: "待遇・福利厚生",
    holidays: "休日・休暇",
    teamEnvironment: "チーム・開発環境",
    analysis: "スキルマッチ分析",
    requiredSkills: "必須スキル",
    bonusSkills: "歓迎スキル",
    notes: "求人メモ",
    source: "求人情報元",
    timeline: "ステータス履歴",
    statusAdvanced:
      "ステータスを更新しました。選択を間違えた場合は取り消せます。",
    undo: "取り消す",
    advanced: "進行",
    corrected: "修正",
    undone: "取り消し",
    deleteJob: "この求人を削除",
    deleteError: "求人を削除できませんでした。もう一度お試しください。",
  },
  zh: {
    jobs: "岗位一览",
    edit: "编辑",
    correctStatus: "修正岗位状态",
    currentStatus: "当前状态",
    schedule: "安排面试",
    skillMatch: "技能匹配度",
    salary: "薪资范围",
    updatedAt: "最后更新",
    requirements: "招聘详情",
    employmentType: "雇佣类型",
    workMode: "工作方式",
    hiringCount: "招聘人数",
    monthlySalary: "月薪",
    fixedOvertime: "固定加班费",
    description: "工作内容",
    applicationRequirements: "应聘资格",
    preferredQualifications: "加分条件",
    selectionProcess: "选考流程",
    workLocationDetails: "工作地点详情",
    workingHours: "工作时间",
    benefits: "待遇与福利",
    holidays: "休息日与休假",
    teamEnvironment: "团队与开发环境",
    analysis: "技能匹配分析",
    requiredSkills: "必须技能",
    bonusSkills: "加分技能",
    notes: "岗位备注",
    source: "岗位来源",
    timeline: "状态记录",
    statusAdvanced: "岗位状态已推进，如果刚才选错可以立即撤销。",
    undo: "撤销",
    advanced: "推进",
    corrected: "修正",
    undone: "撤销",
    deleteJob: "删除这个岗位",
    deleteError: "岗位删除失败，请重试。",
  },
} as const;

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-h-[72px] content-center gap-1.5 bg-[#111014] px-4 py-3">
      <span className="text-[9px] text-[#6f6977]">{label}</span>
      <strong className="flex items-center gap-1.5 text-xs font-medium text-[#d4ced8]">
        <BriefcaseBusiness size={13} className="text-[#8f76c7]" />
        {value}
      </strong>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#211e25] py-5 odd:pr-6 even:border-l even:pl-6 max-[760px]:px-0 max-[760px]:even:border-l-0 max-[760px]:even:pl-0">
      <dt className="text-[10px] font-medium text-[#b9a2ed]">{label}</dt>
      <dd className="m-0 mt-2 whitespace-pre-line text-[11px] leading-6 text-[#9f99a4]">
        {value}
      </dd>
    </div>
  );
}
