import { CalendarClock, ExternalLink, KeyRound, MapPin, Monitor, Video } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getInterviews, type InterviewRecord } from "@/data/interviewStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { getJobStatusLabel } from "@/i18n/jobLabels";

export function Interviews() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = interviewCopy[language];
  const interviews = useMemo(
    () => getInterviews().sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt)),
    [],
  );
  const now = Date.now();
  const upcoming = interviews.filter((item) => new Date(item.scheduledAt).getTime() >= now);
  const past = interviews.filter((item) => new Date(item.scheduledAt).getTime() < now).reverse();

  return (
    <div className="grid gap-7">
      <header className="flex items-end justify-between gap-5 max-[640px]:items-start">
        <div>
          <p className="m-0 text-[10px] font-bold text-[#786f82]">INTERVIEW DESK</p>
          <h2 className="mb-1 mt-2 text-[27px] font-semibold max-[760px]:text-[23px]">{text.title}</h2>
          <p className="text-[13px] text-[#948e9d]">{text.subtitle}</p>
        </div>
        <div className="border-l-2 border-[#8b5cf6] bg-[#131116] px-4 py-2.5 max-[640px]:hidden"><strong className="text-xl text-[#c9b6ff]">{upcoming.length}</strong><span className="ml-2 text-[10px] text-[#948e9d]">{text.upcomingCount}</span></div>
      </header>

      {interviews.length === 0 ? (
        <section className="grid min-h-[340px] place-items-center rounded-md border border-dashed border-[#302b35] bg-[#121014] p-8 text-center">
          <div><span className="mx-auto grid size-12 place-items-center rounded-md bg-[#211a2f] text-[#b79bf2]"><CalendarClock size={23} /></span><h3 className="mb-1 mt-4 text-sm">{text.empty}</h3><p className="m-0 text-[11px] text-[#77717f]">{text.emptyHint}</p><Button className="mt-5 bg-[#7c3aed] text-white hover:bg-[#8b4cf0]" onClick={() => navigate("/jobs")}>{text.viewJobs}</Button></div>
        </section>
      ) : (
        <>
          <InterviewSection title={text.upcoming} items={upcoming} language={language} emptyText={text.noUpcoming} />
          {past.length > 0 && <InterviewSection title={text.past} items={past} language={language} emptyText="" muted />}
        </>
      )}
    </div>
  );
}

function InterviewSection({ title, items, language, emptyText, muted = false }: { title: string; items: InterviewRecord[]; language: "ja" | "zh"; emptyText: string; muted?: boolean }) {
  const text = interviewCopy[language];
  return (
    <section className="grid gap-3">
      <div className="flex items-center gap-3"><h3 className="m-0 text-sm font-semibold">{title}</h3><span className="h-px flex-1 bg-[#211e25]" /><small className="text-[10px] text-[#6f6977]">{items.length}</small></div>
      {items.length === 0 ? <p className="rounded-md border border-[#211e25] bg-[#151318] p-5 text-xs text-[#77717f]">{emptyText}</p> : (
        <div className="grid gap-3">
          {items.map((item) => {
            const date = new Intl.DateTimeFormat(language === "ja" ? "ja-JP" : "zh-CN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.scheduledAt));
            const mapsUrl = item.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}` : "";
            return (
              <article key={item.id} className={`grid grid-cols-[150px_minmax(0,1fr)_auto] items-center gap-5 rounded-md border border-[#27232c] bg-[#151318] p-5 max-[760px]:grid-cols-1 ${muted ? "opacity-65" : ""}`}>
                <div className="grid gap-2 border-r border-[#29252e] pr-5 max-[760px]:border-b max-[760px]:border-r-0 max-[760px]:pb-4 max-[760px]:pr-0"><span className="text-[10px] text-[#8d75bd]">{getJobStatusLabel(item.round, language)}</span><strong className="text-sm">{date}</strong><span className="flex items-center gap-1 text-[10px] text-[#77717f]">{item.mode === "ONLINE" ? <Monitor size={13} /> : <MapPin size={13} />}{item.mode === "ONLINE" ? text.online : text.offline}</span></div>
                <div className="min-w-0"><p className="m-0 text-[11px] text-[#948e9d]">{item.company}</p><h4 className="mb-3 mt-1 text-[15px]">{item.role}</h4>{item.mode === "ONLINE" ? <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-[#aaa4ae]"><span className="flex items-center gap-1.5"><Video size={14} />{item.platform}</span>{item.meetingId && <span>ID: {item.meetingId}</span>}{item.meetingPassword && <span className="flex items-center gap-1"><KeyRound size={13} />{item.meetingPassword}</span>}</div> : <p className="m-0 flex items-center gap-1.5 text-[10px] text-[#aaa4ae]"><MapPin size={14} />{item.location}</p>}{item.notes && <p className="mb-0 mt-3 text-[10px] text-[#77717f]">{item.notes}</p>}</div>
                <div className="flex gap-2 max-[760px]:justify-end">{item.mode === "ONLINE" && item.meetingUrl && <a className="inline-flex h-8 items-center gap-1.5 rounded-[5px] bg-[#7c3aed] px-2.5 text-xs text-white no-underline hover:bg-[#8b4cf0]" href={item.meetingUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} />{text.join}</a>}{item.mode === "OFFLINE" && <a className="inline-flex h-8 items-center gap-1.5 rounded-[5px] border border-[#3a3340] bg-[#111014] px-2.5 text-xs text-[#c6bdcb] no-underline hover:bg-[#211d25]" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={15} />{text.map}</a>}</div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

const interviewCopy = {
  ja: { title: "面接管理", subtitle: "面接日時、参加情報、会場を一か所で確認できます。", upcomingCount: "件の予定", upcoming: "今後の面接", past: "終了した面接", noUpcoming: "予定されている面接はありません。", empty: "面接予定はまだありません", emptyHint: "求人詳細から次の面接を設定すると、ここに表示されます。", viewJobs: "求人一覧を見る", online: "オンライン", offline: "対面", join: "参加する", map: "地図で確認" },
  zh: { title: "面试管理", subtitle: "集中查看面试时间、参会信息和线下面试地点。", upcomingCount: "场待面试", upcoming: "即将进行", past: "已结束", noUpcoming: "当前没有待进行的面试。", empty: "还没有面试安排", emptyHint: "在岗位详情中安排下一轮面试后，会显示在这里。", viewJobs: "查看岗位", online: "线上", offline: "线下", join: "进入会议", map: "查看地点" },
} as const;
