import { AlertTriangle, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { getInterviews } from "@/data/interviewStore";
import { statuses, type JobStatus } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getJobStatusLabel } from "@/i18n/jobLabels";

type Props = {
  jobId: number;
  currentStatus: JobStatus;
  onClose: () => void;
  onCorrect: (status: JobStatus, reason?: string) => void;
};

const fieldClass =
  "w-full rounded-[5px] border border-[#302b35] bg-[#0f0e11] px-3 text-xs text-[#f2eef5] outline-none focus:border-[#7957ba]";

export function StatusCorrectionDialog({
  jobId,
  currentStatus,
  onClose,
  onCorrect,
}: Props) {
  const { language } = useLanguage();
  const text = copy[language];
  const options = statuses.filter((status) => status !== currentStatus);
  const [selectedStatus, setSelectedStatus] = useState(options[0]);
  const laterInterviewCount = useMemo(() => {
    const targetIndex = statuses.indexOf(selectedStatus);
    return getInterviews().filter(
      (interview) =>
        interview.jobId === jobId &&
        statuses.indexOf(interview.round) > targetIndex,
    ).length;
  }, [jobId, selectedStatus]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reason = String(new FormData(event.currentTarget).get("reason") ?? "");
    onCorrect(selectedStatus, reason.trim() || undefined);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) =>
        event.target === event.currentTarget && onClose()
      }
    >
      <section
        className="w-full max-w-[500px] rounded-md border border-[#393140] bg-[#151318] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-correction-title"
      >
        <header className="flex items-start justify-between border-b border-[#28232d] px-6 py-5">
          <div>
            <p className="m-0 text-[10px] font-bold text-[#8d75bd]">
              STATUS CORRECTION
            </p>
            <h2
              id="status-correction-title"
              className="mb-0 mt-1.5 text-lg font-semibold"
            >
              {text.title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={onClose}
            aria-label={text.close}
          >
            <X size={18} />
          </Button>
        </header>
        <form className="grid gap-5 p-6" onSubmit={handleSubmit}>
          <p className="m-0 text-xs text-[#9b94a2]">
            {text.current}:{" "}
            <strong className="text-[#d6c9f4]">
              {getJobStatusLabel(currentStatus, language)}
            </strong>
          </p>
          <label className="grid gap-2 text-[10px] text-[#8f8998]">
            {text.correctTo}
            <select
              className={fieldClass + " h-[42px]"}
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(event.target.value as JobStatus)
              }
            >
              {options.map((status) => (
                <option key={status} value={status}>
                  {getJobStatusLabel(status, language)}
                </option>
              ))}
            </select>
          </label>
          {laterInterviewCount > 0 && (
            <div className="flex gap-2 rounded-[5px] border border-[#624a24] bg-[#271f12] p-3 text-[11px] leading-5 text-[#e6bd72]">
              <AlertTriangle className="mt-0.5 shrink-0" size={16} />
              {text.interviewWarning.replace(
                "{count}",
                String(laterInterviewCount),
              )}
            </div>
          )}
          <label className="grid gap-2 text-[10px] text-[#8f8998]">
            {text.reason}
            <textarea
              className={fieldClass + " min-h-24 resize-y py-3"}
              name="reason"
              placeholder={text.reasonPlaceholder}
            />
          </label>
          <footer className="flex justify-end gap-2 border-t border-[#28232d] pt-5">
            <Button type="button" variant="outline" onClick={onClose}>
              {text.cancel}
            </Button>
            <Button
              type="submit"
              className="bg-[#7c3aed] text-white hover:bg-[#8b4cf0]"
            >
              <RotateCcw size={16} />
              {text.save}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  );
}

const copy = {
  ja: {
    title: "ステータスを修正",
    close: "閉じる",
    current: "現在のステータス",
    correctTo: "修正後のステータス",
    reason: "修正理由（任意）",
    reasonPlaceholder: "例：誤って最終面接を選択した",
    interviewWarning:
      "修正後の段階より先の面接が {count} 件あります。面接記録は自動削除されません。",
    cancel: "キャンセル",
    save: "修正を保存",
  },
  zh: {
    title: "修正岗位状态",
    close: "关闭",
    current: "当前状态",
    correctTo: "修正后的状态",
    reason: "修正原因（选填）",
    reasonPlaceholder: "例如：刚才误选了终面",
    interviewWarning:
      "存在 {count} 条晚于修正目标的面试记录，这些记录不会被自动删除。",
    cancel: "取消",
    save: "保存修正",
  },
} as const;
