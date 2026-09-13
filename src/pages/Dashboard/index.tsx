import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  RefreshCw,
  Target,
} from "lucide-react";
import ReactECharts from "echarts-for-react";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { getJobStatusLabel } from "@/i18n/jobLabels";
import { getDashboardAPI } from "@/api/dashboard";
import type { DashboardSummary } from "@/types/dashboard";
import type { JobStatus } from "@/types/jobs";

const panelClass = "border-t border-[#29232f] pt-5";
const eyebrowClass = "m-0 text-[10px] font-bold text-[#786f82]";
const statusColors: Record<JobStatus, string> = {
  WISHLIST: "#8b5cf6",
  APPLIED: "#5b7cfa",
  DOCUMENT_SCREENING: "#58a6dd",
  FIRST_INTERVIEW: "#2dd4bf",
  SECOND_INTERVIEW: "#3cb487",
  THIRD_INTERVIEW: "#a3c96f",
  FINAL_INTERVIEW: "#e3bb6d",
  OFFER: "#f0d587",
  REJECTED: "#d47b8c",
  WITHDRAWN: "#807787",
};
const percent = (value: number | null) => (value === null ? "—" : `${value}%`);

export function Dashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = dashboardCopy[language];
  const ja = language === "ja";
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    getDashboardAPI(controller.signal)
      .then((response) => {
        if (!controller.signal.aborted) setData(response.data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [refresh]);

  if (!data && loading)
    return (
      <div aria-label={text.loading} className="grid animate-pulse gap-6">
        <div className="h-32 bg-[#151318]" />
        <div className="h-80 bg-[#151318]" />
      </div>
    );
  if (!data)
    return (
      <div
        role="alert"
        className="grid min-h-72 place-content-center gap-4 text-center"
      >
        <p className="text-sm text-[#c1b9ca]">{text.error}</p>
        <Button
          variant="outline"
          onClick={() => setRefresh((value) => value + 1)}
        >
          <RefreshCw size={15} />
          {text.retry}
        </Button>
      </div>
    );

  const dateFormat = new Intl.DateTimeFormat(ja ? "ja-JP" : "zh-CN", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const { totals, conversion } = data;
  const stats = [
    {
      label: text.tracked,
      value: String(totals.tracked),
      detail: `${text.added} ${totals.addedThisMonth}`,
      icon: BriefcaseBusiness,
      tone: "bg-[#281d3e] text-[#b99afc]",
    },
    {
      label: text.inProgress,
      value: String(totals.inProgress),
      detail: `${text.upcoming} ${totals.upcomingInterviews}`,
      icon: CalendarClock,
      tone: "bg-[#19233f] text-[#91a7ff]",
    },
    {
      label: text.averageMatch,
      value: percent(totals.averageMatch),
      detail: `${text.scored} ${totals.scoredJobs}`,
      icon: Target,
      tone: "bg-[#142c29] text-[#68decf]",
    },
    {
      label: text.offers,
      value: String(totals.offers),
      detail: `${text.offerRate} ${percent(conversion.offerRate)}`,
      icon: CheckCircle2,
      tone: "bg-[#302616] text-[#f4ca78]",
    },
  ];
  const statusEntries = Object.entries(data.statusCounts) as [
    JobStatus,
    number,
  ][];
  const chartStyle = {
    backgroundColor: "transparent",
    animation: false,
    tooltip: {
      trigger: "item",
      renderMode: "richText",
      backgroundColor: "#17151d",
      borderColor: "#34303c",
      textStyle: { color: "#f6f4f8" },
    },
  };
  const chartOption = {
    ...chartStyle,
    legend: {
      type: "scroll",
      bottom: 0,
      textStyle: { color: "#a59bac" },
      pageTextStyle: { color: "#a59bac" },
      pageIconColor: "#b69bf2",
      itemWidth: 10,
      itemHeight: 10,
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "65%"],
        center: ["50%", "42%"],
        label: { show: false },
        itemStyle: { borderColor: "#111014", borderWidth: 3 },
        data: statusEntries
          .filter(([, count]) => count > 0)
          .map(([status, count]) => ({
            name: getJobStatusLabel(status, language),
            value: count,
            itemStyle: { color: statusColors[status] },
          })),
      },
    ],
  };
  const matchOption = {
    ...chartStyle,
    grid: { left: 36, right: 12, top: 20, bottom: 34 },
    xAxis: {
      type: "category",
      data: data.matchDistribution.map((item) => `${item.key}%`),
      axisLabel: { color: "#a59bac", fontSize: 10 },
      axisLine: { lineStyle: { color: "#302936" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: { color: "#a59bac", fontSize: 10 },
      splitLine: { lineStyle: { color: "#211e25" } },
    },
    series: [
      {
        type: "bar",
        barMaxWidth: 48,
        data: data.matchDistribution.map((item, index) => ({
          value: item.count,
          itemStyle: {
            color: ["#d47b8c", "#e3bb6d", "#58a6dd", "#2dd4bf"][index],
            borderRadius: [3, 3, 0, 0],
          },
        })),
      },
    ],
  };
  const conversions = [
    {
      label: text.applied,
      count: conversion.applied,
      rate: conversion.applied ? 100 : null,
    },
    {
      label: text.interviewed,
      count: conversion.interviewed,
      rate: conversion.interviewRate,
    },
    {
      label: text.offers,
      count: conversion.offers,
      rate: conversion.offerRate,
    },
  ];
  return (
    <div className="grid gap-7" aria-busy={loading}>
      <section className="flex items-end justify-between gap-4">
        <div>
          <p className={eyebrowClass}>
            {dateFormat.format(new Date(data.generatedAt))}
          </p>
          <h2 className="mb-1 mt-2 text-[27px] font-semibold max-[760px]:text-[23px]">
            {text.title}
          </h2>
          <p className="text-[13px] text-[#948e9d]">{text.subtitle}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title={text.refresh}
          aria-label={text.refresh}
          disabled={loading}
          onClick={() => setRefresh((value) => value + 1)}
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
        </Button>
      </section>
      {error && (
        <p role="alert" className="text-xs text-[#ef9aa8]">
          {text.error}
        </p>
      )}
      <section
        className="grid grid-cols-4 gap-3 max-[760px]:grid-cols-2 max-[460px]:grid-cols-1"
        aria-label={text.coreStats}
      >
        {stats.map(({ label, value, detail, icon: Icon, tone }) => (
          <article
            className="min-h-[142px] rounded-md border border-[#211e25] bg-[#151318] p-[18px]"
            key={label}
          >
            <span
              className={`grid size-[34px] place-items-center rounded-[5px] ${tone}`}
            >
              <Icon size={19} />
            </span>
            <p className="mb-1 mt-4 text-[11px] text-[#948e9d]">{label}</p>
            <strong className="text-[27px] font-semibold">{value}</strong>
            <small className="mt-1 block text-[10px] text-[#89818f]">
              {detail}
            </small>
          </article>
        ))}
      </section>
      <section className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)] gap-6 max-[1050px]:grid-cols-1">
        <div className={panelClass}>
          <PanelHeading eyebrow="PIPELINE" title={text.distribution}>
            <ViewAll onClick={() => navigate("/jobs")} label={text.viewAll} />
          </PanelHeading>
          {totals.tracked ? (
            <ReactECharts
              option={chartOption}
              style={{ height: 310 }}
              opts={{ renderer: "svg" }}
            />
          ) : (
            <Empty label={text.emptyJobs} />
          )}
        </div>
        <div className={panelClass}>
          <PanelHeading eyebrow="CONVERSION" title={text.conversionTitle} />
          <div className="mt-6 grid gap-6">
            {conversions.map(({ label, count, rate }) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                  <span className="text-[#a79daf]">{label}</span>
                  <span>
                    {count}
                    <span className="ml-3 text-[#b49be1]">{percent(rate)}</span>
                  </span>
                </div>
                <div className="h-1 bg-[#29252e]">
                  <span
                    className="block h-full bg-[#8b5cf6]"
                    style={{ width: `${rate ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <dl className="mt-7 grid grid-cols-2 gap-3 border-t border-[#211e25] pt-4 text-[10px]">
            <div>
              <dt className="text-[#948e9d]">{text.interviewRate}</dt>
              <dd className="mt-1 text-base text-[#68decf]">
                {percent(conversion.interviewRate)}
              </dd>
            </div>
            <div>
              <dt className="text-[#948e9d]">{text.offerRate}</dt>
              <dd className="mt-1 text-base text-[#f4ca78]">
                {percent(conversion.offerRate)}
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className={panelClass}>
        <PanelHeading eyebrow="SKILL FIT" title={text.matchDistribution}>
          <span className="text-[10px] text-[#948e9d]">
            {text.unscored} {data.unscoredJobs}
          </span>
        </PanelHeading>
        {totals.scoredJobs ? (
          <ReactECharts
            option={matchOption}
            style={{ height: 210 }}
            opts={{ renderer: "svg" }}
          />
        ) : (
          <Empty label={text.emptyMatch} />
        )}
      </section>
      <section className={panelClass}>
        <PanelHeading eyebrow="RECENT ACTIVITY" title={text.recent}>
          <ViewAll onClick={() => navigate("/jobs")} label={text.viewAll} />
        </PanelHeading>
        <div className="mt-4 border-t border-[#211e25]">
          {data.recentJobs.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="grid min-h-[70px] w-full grid-cols-[34px_minmax(0,1fr)_110px_65px_90px_16px] items-center gap-3 border-b border-[#211e25] bg-transparent py-3 text-left hover:bg-[#19171c] max-[760px]:grid-cols-[30px_minmax(0,1fr)_90px_16px]"
            >
              <span className="grid size-8 place-items-center rounded bg-[#241c31] text-xs text-[#c9b2ee]">
                {job.company.name.slice(0, 1)}
              </span>
              <span className="grid min-w-0 gap-1">
                <strong className="truncate text-xs">{job.company.name}</strong>
                <small className="truncate text-[10px] text-[#948e9d]">
                  {job.positionName}
                </small>
              </span>
              <span
                className="text-[10px]"
                style={{ color: statusColors[job.status] }}
              >
                {getJobStatusLabel(job.status, language)}
              </span>
              <span className="text-xs max-[760px]:hidden">
                {percent(job.matchScore)}
              </span>
              <time
                dateTime={job.updatedAt}
                className="text-[10px] text-[#948e9d] max-[760px]:hidden"
              >
                {dateFormat.format(new Date(job.updatedAt))}
              </time>
              <ArrowUpRight size={16} />
            </button>
          ))}
          {!data.recentJobs.length && <Empty label={text.emptyJobs} />}
        </div>
      </section>
    </div>
  );
}

const dashboardCopy = {
  ja: {
    title: "求職活動サマリー",
    subtitle: "応募状況、面接予定、求人とのマッチ度をまとめて確認できます。",
    loading: "ダッシュボードを読み込み中",
    error: "統計を取得できませんでした。もう一度お試しください。",
    retry: "再試行",
    refresh: "統計を更新",
    coreStats: "主要指標",
    tracked: "管理中の求人",
    added: "今月の追加",
    inProgress: "選考中",
    upcoming: "今後の面接",
    averageMatch: "平均マッチ度",
    scored: "スキル要件のある求人",
    offers: "内定",
    offerRate: "面接 → 内定",
    distribution: "求人ステータス分布",
    viewAll: "すべて表示",
    conversionTitle: "選考コンバージョン",
    applied: "応募した求人",
    interviewed: "面接に進んだ求人",
    interviewRate: "応募 → 面接",
    matchDistribution: "マッチ度の分布",
    unscored: "未算出",
    recent: "最近更新した求人",
    emptyJobs: "求人はまだ登録されていません。",
    emptyMatch: "スキル要件のある求人がありません。",
  },
  zh: {
    title: "求职进度一览",
    subtitle: "集中查看当前投递、面试安排与岗位匹配情况。",
    loading: "正在加载仪表盘",
    error: "统计加载失败，请重试。",
    retry: "重试",
    refresh: "刷新统计",
    coreStats: "核心统计",
    tracked: "追踪岗位",
    added: "本月新增",
    inProgress: "进行中",
    upcoming: "待进行面试",
    averageMatch: "平均匹配度",
    scored: "有技能要求的岗位",
    offers: "收到 Offer",
    offerRate: "面试 → Offer",
    distribution: "岗位状态分布",
    viewAll: "查看全部",
    conversionTitle: "阶段转化率",
    applied: "已投递的岗位",
    interviewed: "进入过面试的岗位",
    interviewRate: "投递 → 面试",
    matchDistribution: "匹配度分布",
    unscored: "未计算",
    recent: "最近更新的岗位",
    emptyJobs: "还没有记录岗位。",
    emptyMatch: "没有包含技能要求的岗位。",
  },
} as const;

function Empty({ label }: { label: string }) {
  return (
    <p className="grid min-h-40 place-items-center text-xs text-[#948e9d]">
      {label}
    </p>
  );
}
function ViewAll({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button
      type="button"
      className="h-auto shrink-0 p-0 text-[11px] text-[#a994df] hover:bg-transparent hover:text-[#d0c0f7]"
      variant="ghost"
      onClick={onClick}
    >
      {label}
      <ArrowUpRight size={15} />
    </Button>
  );
}
function PanelHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className={eyebrowClass}>{eyebrow}</p>
        <h3 className="mt-1 text-[15px] font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
