import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Target,
} from "lucide-react";
import ReactECharts from "echarts-for-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { jobs } from "@/data/mockData";

const stats = [
  {
    label: "追踪岗位",
    value: "24",
    detail: "本月新增 6 个",
    icon: BriefcaseBusiness,
    tone: "bg-[#281d3e] text-[#b99afc]",
  },
  {
    label: "进行中",
    value: "8",
    detail: "3 个等待面试",
    icon: CalendarClock,
    tone: "bg-[#19233f] text-[#91a7ff]",
  },
  {
    label: "平均匹配度",
    value: "78%",
    detail: "较上周 +4%",
    icon: Target,
    tone: "bg-[#142c29] text-[#68decf]",
  },
  {
    label: "收到 Offer",
    value: "2",
    detail: "转化率 8.3%",
    icon: CheckCircle2,
    tone: "bg-[#302616] text-[#f4ca78]",
  },
];

const conversions = [
  ["已投递", "18", "100%"],
  ["进入面试", "8", "44%"],
  ["终面通过", "3", "17%"],
  ["收到 Offer", "2", "11%"],
];
const panelClass =
  "rounded-md border border-[#211e25] bg-[#151318] p-[21px] max-[460px]:p-[17px]";
const eyebrowClass = "m-0 text-[10px] font-bold text-[#786f82]";

const chartOption = {
  animation: false,
  backgroundColor: "transparent",
  tooltip: {
    trigger: "item",
    backgroundColor: "#17151d",
    borderColor: "#34303c",
    textStyle: { color: "#f6f4f8" },
  },
  legend: {
    bottom: 0,
    left: "center",
    textStyle: { color: "#8f8998" },
    itemWidth: 10,
    itemHeight: 10,
  },
  series: [
    {
      type: "pie",
      radius: ["48%", "72%"],
      center: ["50%", "42%"],
      avoidLabelOverlap: true,
      itemStyle: { borderColor: "#111014", borderWidth: 4, borderRadius: 3 },
      label: { show: false },
      data: [
        { value: 7, name: "计划投递", itemStyle: { color: "#8b5cf6" } },
        { value: 9, name: "选考中", itemStyle: { color: "#5b7cfa" } },
        { value: 5, name: "面试中", itemStyle: { color: "#2dd4bf" } },
        { value: 3, name: "已结束", itemStyle: { color: "#44404b" } },
      ],
    },
  ],
};

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6">
      <section className="flex items-end justify-between gap-7 pb-1 max-[760px]:items-start">
        <div>
          <p className={eyebrowClass}>2026 / AUGUST</p>
          <h2 className="mb-1 mt-2 text-[27px] font-semibold max-[760px]:text-[23px]">
            求职进度一览
          </h2>
          <p className="text-[13px] text-[#948e9d]">
            集中查看当前投递、面试安排与岗位匹配情况。
          </p>
        </div>
        <div className="flex items-baseline gap-2 border-l-2 border-[#8b5cf6] bg-[#131116] px-3.5 py-2.5 max-[760px]:hidden">
          <span className="text-[11px] text-[#948e9d]">距离十月末</span>
          <strong className="text-[17px]">73 天</strong>
        </div>
      </section>

      <section
        className="grid grid-cols-4 gap-3 max-[760px]:grid-cols-2 max-[460px]:grid-cols-1"
        aria-label="核心统计"
      >
        {stats.map(({ label, value, detail, icon: Icon, tone }) => (
          <article
            className="relative min-h-[142px] overflow-hidden rounded-md border border-[#211e25] bg-[#151318] p-[18px] after:absolute after:-bottom-12 after:-right-9 after:size-[100px] after:rotate-[26deg] after:border after:border-[#2a2530] after:content-[''] max-[460px]:min-h-[125px]"
            key={label}
          >
            <span
              className={`grid size-[34px] place-items-center rounded-[5px] ${tone}`}
            >
              <Icon size={19} />
            </span>
            <p className="mb-[3px] mt-[15px] text-[11px] text-[#948e9d]">
              {label}
            </p>
            <strong className="text-[27px] font-semibold">{value}</strong>
            <small className="ml-2 text-[9px] text-[#77717f]">{detail}</small>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-[minmax(0,1.25fr)_minmax(340px,.75fr)] gap-4 max-[1050px]:grid-cols-1">
        <div className={panelClass}>
          <PanelHeading eyebrow="PIPELINE" title="岗位状态分布">
            <Button
              className="h-auto p-0 text-[11px] text-[#a994df] hover:bg-transparent hover:text-[#d0c0f7]"
              variant="ghost"
              onClick={() => navigate("/jobs")}
            >
              查看全部
              <ArrowUpRight size={15} />
            </Button>
          </PanelHeading>
          <ReactECharts
            option={chartOption}
            style={{ height: 310 }}
            opts={{ renderer: "svg" }}
          />
        </div>
        <div className={`${panelClass} flex flex-col`}>
          <PanelHeading eyebrow="CONVERSION" title="阶段转化率">
            <span className="text-[10px] text-[#2dd4bf] before:mr-1 before:inline-block before:size-[5px] before:rounded-full before:bg-[#2dd4bf] before:content-['']">
              实时
            </span>
          </PanelHeading>
          {conversions.map(([label, value, percent]) => (
            <div
              className="mt-[21px] grid grid-cols-[1fr_64px_34px] items-center gap-[11px]"
              key={label}
            >
              <div className="flex justify-between text-[11px] text-[#948e9d]">
                <span>{label}</span>
                <strong className="text-[#f5f2f7]">{value}</strong>
              </div>
              <div className="h-1 overflow-hidden bg-[#29252e]">
                <span
                  className="block h-full bg-[#8b5cf6]"
                  style={{ width: percent }}
                />
              </div>
              <small className="text-right text-[9px] text-[#6f6977]">
                {percent}
              </small>
            </div>
          ))}
          <div className="mt-auto flex items-start gap-[11px] rounded-[5px] border border-[#2d2840] bg-[#1b1725] p-3.5 text-[#b69bf2]">
            <Target size={18} />
            <p className="m-0 grid gap-0.5">
              <strong className="text-[11px]">本月目标</strong>
              <span className="text-[10px] text-[#948e9d]">
                保持 40% 以上的面试转化率
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <PanelHeading eyebrow="RECENT ACTIVITY" title="最近更新的岗位">
          <Button
            className="h-auto p-0 text-[11px] text-[#a994df] hover:bg-transparent hover:text-[#d0c0f7]"
            variant="ghost"
            onClick={() => navigate("/jobs")}
          >
            岗位一览
            <ArrowUpRight size={15} />
          </Button>
        </PanelHeading>
        <div className="mt-[15px] border-t border-[#211e25]">
          {jobs.slice(0, 4).map((job) => (
            <button
              type="button"
              className="grid min-h-[70px] w-full grid-cols-[38px_minmax(180px,1fr)_90px_76px_90px_20px] items-center gap-3 border-0 border-b border-[#211e25] bg-transparent px-[7px] text-left transition-colors hover:bg-[#19171c] max-[760px]:grid-cols-[38px_minmax(150px,1fr)_70px_60px_20px] max-[460px]:grid-cols-[34px_minmax(130px,1fr)_64px_20px]"
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <span className="company-monogram">
                {job.company.slice(0, 1)}
              </span>
              <span className="grid gap-[3px]">
                <strong className="text-xs">{job.company}</strong>
                <small className="text-[10px] text-[#948e9d]">{job.role}</small>
              </span>
              <span className={`status-badge status-${job.status}`}>
                {job.status}
              </span>
              <span className="grid gap-[3px] max-[460px]:hidden">
                <strong className="text-xs">{job.match}%</strong>
                <small className="text-[10px] text-[#948e9d]">匹配度</small>
              </span>
              <time className="text-[10px] text-[#948e9d] max-[760px]:hidden">
                {job.updatedAt}
              </time>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function PanelHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <div>
        <p className={eyebrowClass}>{eyebrow}</p>
        <h3 className="mt-1 text-[15px] font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
