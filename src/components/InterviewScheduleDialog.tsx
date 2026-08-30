import { CalendarClock, MapPin, Monitor, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { Job, JobStatus } from "@/data/mockData";
import { saveInterview, type InterviewMode } from "@/data/interviewStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { getJobStatusLabel } from "@/i18n/jobLabels";

type Props = {
  job: Job;
  availableStatuses: JobStatus[];
  onClose: () => void;
  onSaved: (status: JobStatus) => void;
};

const inputClass =
  "h-[42px] w-full rounded-[5px] border border-[#302b35] bg-[#0f0e11] px-3 text-xs text-[#f2eef5] outline-none transition-colors focus:border-[#7957ba]";

export function InterviewScheduleDialog({ job, availableStatuses, onClose, onSaved }: Props) {
  const { language } = useLanguage();
  const text = dialogCopy[language];
  const [mode, setMode] = useState<InterviewMode>("ONLINE");
  const [selectedStatus, setSelectedStatus] = useState(availableStatuses[0]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    saveInterview({
      id: crypto.randomUUID(),
      jobId: job.id,
      company: job.company,
      role: job.role,
      round: selectedStatus,
      mode,
      scheduledAt: String(data.get("scheduledAt")),
      platform: mode === "ONLINE" ? String(data.get("platform") ?? "") : undefined,
      meetingUrl: mode === "ONLINE" ? String(data.get("meetingUrl") ?? "") : undefined,
      meetingId: mode === "ONLINE" ? String(data.get("meetingId") ?? "") : undefined,
      meetingPassword: mode === "ONLINE" ? String(data.get("meetingPassword") ?? "") : undefined,
      location: mode === "OFFLINE" ? String(data.get("location") ?? "") : undefined,
      notes: String(data.get("notes") ?? ""),
    });
    onSaved(selectedStatus);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="my-auto w-full max-w-[620px] overflow-hidden rounded-md border border-[#393140] bg-[#151318] shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="interview-dialog-title">
        <header className="flex items-start justify-between border-b border-[#28232d] px-6 py-5">
          <div>
            <p className="m-0 text-[10px] font-bold text-[#8d75bd]">INTERVIEW SCHEDULE</p>
            <h2 id="interview-dialog-title" className="mb-0 mt-1.5 text-lg font-semibold">{text.title}</h2>
            <p className="mb-0 mt-1 text-[11px] text-[#8f8998]">{job.company} · {getJobStatusLabel(selectedStatus, language)}</p>
          </div>
          <Button variant="ghost" size="icon" type="button" className="text-[#8f8998] hover:bg-[#211d25] hover:text-white" onClick={onClose} aria-label={text.close}><X size={18} /></Button>
        </header>
        <form className="grid gap-5 p-6" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-[10px] text-[#8f8998]">
            {text.round}
            <select
              className={inputClass}
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value as JobStatus)}
            >
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {getJobStatusLabel(status, language)}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="grid gap-2 border-0 p-0">
            <legend className="mb-2 text-[10px] text-[#8f8998]">{text.mode}</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["ONLINE", "OFFLINE"] as const).map((item) => (
                <button key={item} type="button" className={`flex h-12 items-center justify-center gap-2 rounded-[5px] border text-xs transition-colors ${mode === item ? "border-[#7553b5] bg-[#251d34] text-[#d3c3f7]" : "border-[#302b35] bg-[#100f12] text-[#8f8998] hover:border-[#4b4253]"}`} onClick={() => setMode(item)}>
                  {item === "ONLINE" ? <Monitor size={17} /> : <MapPin size={17} />}
                  {item === "ONLINE" ? text.online : text.offline}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="grid gap-2 text-[10px] text-[#8f8998]">{text.dateTime}<span className="relative"><CalendarClock className="absolute left-3 top-3 text-[#6f6977]" size={17} /><input className={`${inputClass} pl-10`} name="scheduledAt" type="datetime-local" required /></span></label>
          {mode === "ONLINE" ? (
            <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
              <label className="grid gap-2 text-[10px] text-[#8f8998]">{text.platform}<input className={inputClass} name="platform" placeholder="Zoom / Google Meet" required /></label>
              <label className="grid gap-2 text-[10px] text-[#8f8998]">{text.meetingUrl}<input className={inputClass} name="meetingUrl" type="url" placeholder="https://..." /></label>
              <label className="grid gap-2 text-[10px] text-[#8f8998]">{text.meetingId}<input className={inputClass} name="meetingId" /></label>
              <label className="grid gap-2 text-[10px] text-[#8f8998]">{text.password}<input className={inputClass} name="meetingPassword" /></label>
            </div>
          ) : (
            <label className="grid gap-2 text-[10px] text-[#8f8998]">{text.location}<input className={inputClass} name="location" placeholder={text.locationPlaceholder} required /></label>
          )}
          <label className="grid gap-2 text-[10px] text-[#8f8998]">{text.notes}<textarea className="min-h-24 w-full resize-y rounded-[5px] border border-[#302b35] bg-[#0f0e11] p-3 text-xs text-[#f2eef5] outline-none focus:border-[#7957ba]" name="notes" /></label>
          <footer className="flex justify-end gap-2 border-t border-[#28232d] pt-5">
            <Button type="button" variant="outline" className="border-[#35303a] bg-transparent text-[#aaa4ae] hover:bg-[#211d25]" onClick={onClose}>{text.cancel}</Button>
            <Button type="submit" className="bg-[#7c3aed] text-white hover:bg-[#8b4cf0]"><CalendarClock size={16} />{text.save}</Button>
          </footer>
        </form>
      </section>
    </div>
  );
}

const dialogCopy = {
  ja: { title: "次の面接を設定", close: "閉じる", round: "面接段階", mode: "面接形式", online: "オンライン", offline: "対面", dateTime: "日時 *", platform: "利用ツール *", meetingUrl: "参加リンク", meetingId: "ミーティング ID", password: "パスコード", location: "会場・住所 *", locationPlaceholder: "東京都千代田区...", notes: "メモ", cancel: "キャンセル", save: "保存してステータスを進める" },
  zh: { title: "安排下一轮面试", close: "关闭", round: "面试阶段", mode: "面试形式", online: "线上", offline: "线下", dateTime: "日期与时间 *", platform: "会议平台 *", meetingUrl: "会议链接", meetingId: "会议 ID", password: "会议密码", location: "地点与地址 *", locationPlaceholder: "请输入完整地址", notes: "备注", cancel: "取消", save: "保存并推进状态" },
} as const;
