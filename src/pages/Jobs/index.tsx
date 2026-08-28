import {
  ArrowDownUp,
  Banknote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { jobs, recruitmentPlatforms, statuses } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getJobStatusLabel } from "@/i18n/jobLabels";
import "./style.css";

const filterLabelClass =
  "flex h-[38px] items-center gap-[7px] rounded-[5px] border border-[#2c2831] bg-[#111014] px-2.5 text-[#948e9d]";
const advancedLabelClass =
  "flex h-[38px] min-w-0 items-center gap-2 rounded-[5px] border border-[#2c2831] bg-[#111014] px-2.5 text-[10px] text-[#948e9d]";
const selectClass =
  "min-w-0 flex-1 border-0 bg-transparent text-[11px] text-[#cfcad3] outline-none";

const ALL = "ALL";

type SortMode = "newest" | "oldest" | "match" | "salary";

const getSalaryRange = (salary: string) => {
  const values = salary.match(/\d+/g)?.map(Number) ?? [];
  return { min: values[0] ?? 0, max: values[1] ?? values[0] ?? 0 };
};

export function Jobs() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = jobsCopy[language];
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("company") ?? "");
  const [status, setStatus] = useState(ALL);
  const [platform, setPlatform] = useState(ALL);
  const [requiredSkill, setRequiredSkill] = useState(ALL);
  const [bonusSkill, setBonusSkill] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [minimumMatch, setMinimumMatch] = useState("0");
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const platformOptions = useMemo(
    () => [
      ...new Set([...recruitmentPlatforms, ...jobs.map((job) => job.platform)]),
    ],
    [],
  );
  const locations = useMemo(
    () => [...new Set(jobs.map((job) => job.location))],
    [],
  );
  const requiredSkills = useMemo(
    () => [...new Set(jobs.flatMap((job) => job.requiredSkills))].sort(),
    [],
  );
  const bonusSkills = useMemo(
    () => [...new Set(jobs.flatMap((job) => job.bonusSkills))].sort(),
    [],
  );

  const filtered = useMemo(
    () =>
      jobs
        .filter((job) => {
          const normalizedQuery = query.trim().toLowerCase();
          const salary = getSalaryRange(job.salary);
          const selectedSalaryMin = Number(salaryMin) || 0;
          const selectedSalaryMax =
            Number(salaryMax) || Number.POSITIVE_INFINITY;
          const matchesQuery = `${job.company} ${job.role}`
            .toLowerCase()
            .includes(normalizedQuery);
          const matchesSalary =
            salary.max >= selectedSalaryMin && salary.min <= selectedSalaryMax;

          return (
            matchesQuery &&
            (status === ALL || job.status === status) &&
            (platform === ALL || job.platform === platform) &&
            (requiredSkill === ALL ||
              job.requiredSkills.includes(requiredSkill)) &&
            (bonusSkill === ALL ||
              job.bonusSkills.includes(bonusSkill)) &&
            (location === ALL || job.location === location) &&
            job.match >= Number(minimumMatch) &&
            matchesSalary
          );
        })
        .sort((first, second) => {
          if (sortMode === "oldest") return second.id - first.id;
          if (sortMode === "match") return second.match - first.match;
          if (sortMode === "salary")
            return (
              getSalaryRange(second.salary).max -
              getSalaryRange(first.salary).max
            );
          return first.id - second.id;
        }),
    [
      bonusSkill,
      location,
      minimumMatch,
      platform,
      query,
      requiredSkill,
      salaryMax,
      salaryMin,
      sortMode,
      status,
    ],
  );

  const resetFilters = () => {
    setQuery("");
    setStatus(ALL);
    setPlatform(ALL);
    setRequiredSkill(ALL);
    setBonusSkill(ALL);
    setLocation(ALL);
    setSalaryMin("");
    setSalaryMax("");
    setMinimumMatch("0");
    setSortMode("newest");
  };

  return (
    <div className="grid gap-6">
      <section className="flex items-end justify-between gap-7 pb-1 max-[760px]:items-start">
        <div>
          <p className="m-0 text-[10px] font-bold text-[#786f82]">
            JOB DATABASE
          </p>
          <h2 className="mb-1 mt-2 text-[27px] font-semibold max-[760px]:text-[23px]">
            {text.title}
          </h2>
          <p className="text-[13px] text-[#948e9d]">
            {text.subtitle}
          </p>
        </div>
        <div className="flex items-baseline gap-2 border-l-2 border-[#8b5cf6] bg-[#131116] px-3.5 py-2.5 max-[760px]:hidden">
          <strong className="text-[22px] text-[#c9b6ff]">
            {filtered.length}
          </strong>
          <span className="text-[11px] text-[#948e9d]">{text.results}</span>
        </div>
      </section>

      <section
        className="overflow-hidden rounded-md border border-[#211e25] bg-[#151318]"
        aria-label={text.filters}
      >
        <div className="flex items-center gap-2 border-b border-[#211e25] p-3 max-[760px]:flex-wrap">
          <label
            className={`${filterLabelClass} min-w-[260px] flex-1 max-[760px]:min-w-full`}
          >
            <Search size={17} />
            <input
              className="min-w-0 flex-1 border-0 bg-transparent text-[11px] text-[#cfcad3] outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={text.search}
            />
          </label>
          <label
            className={`${filterLabelClass} max-[760px]:min-w-0 max-[760px]:flex-1`}
          >
            <SlidersHorizontal size={16} />
            <select
              className={`${selectClass} min-w-[110px]`}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value={ALL}>{text.allStatuses}</option>
              {statuses.map((item) => (
                <option key={item} value={item}>{getJobStatusLabel(item, language)}</option>
              ))}
            </select>
          </label>
          <label
            className={`${filterLabelClass} max-[760px]:min-w-0 max-[760px]:flex-1`}
          >
            <select
              className={`${selectClass} min-w-[110px]`}
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            >
              <option value={ALL}>{text.allPlatforms}</option>
              {platformOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label
            className={`${filterLabelClass} max-[760px]:min-w-0 max-[760px]:flex-1`}
          >
            <ArrowDownUp size={16} />
            <select
              className={`${selectClass} min-w-[110px]`}
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
            >
              <option value="newest">{text.newest}</option>
              <option value="oldest">{text.oldest}</option>
              <option value="match">{text.highestMatch}</option>
              <option value="salary">{text.highestSalary}</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-[minmax(290px,1.2fr)_repeat(4,minmax(140px,.65fr))_auto] items-center gap-2 p-3 max-[760px]:grid-cols-2 max-[460px]:grid-cols-1">
          <label
            className={`${advancedLabelClass} max-[760px]:col-span-full max-[460px]:col-auto`}
          >
            <Banknote size={16} />
            <span className="shrink-0 text-[#6f6977]">{text.annualSalary}</span>
            <input
              className="w-[58px] min-w-0 flex-1 border-0 bg-transparent text-center text-[11px] text-[#cfcad3] outline-none"
              type="number"
              min="0"
              value={salaryMin}
              onChange={(event) => setSalaryMin(event.target.value)}
              placeholder={text.minimum}
            />
            <i className="text-[9px] not-italic text-[#6f6977]">{text.to}</i>
            <input
              className="w-[58px] min-w-0 flex-1 border-0 bg-transparent text-center text-[11px] text-[#cfcad3] outline-none"
              type="number"
              min="0"
              value={salaryMax}
              onChange={(event) => setSalaryMax(event.target.value)}
              placeholder={text.maximum}
            />
            <em className="text-[9px] not-italic text-[#6f6977]">万円</em>
          </label>
          <label className={advancedLabelClass}>
            <span className="shrink-0 text-[#6f6977]">{text.requiredSkill}</span>
            <select
              className={selectClass}
              value={requiredSkill}
              onChange={(event) => setRequiredSkill(event.target.value)}
            >
              <option value={ALL}>{text.allRequiredSkills}</option>
              {requiredSkills.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className={advancedLabelClass}>
            <span className="shrink-0 text-[#6f6977]">{text.bonusSkill}</span>
            <select
              className={selectClass}
              value={bonusSkill}
              onChange={(event) => setBonusSkill(event.target.value)}
            >
              <option value={ALL}>{text.allBonusSkills}</option>
              {bonusSkills.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className={advancedLabelClass}>
            <span className="shrink-0 text-[#6f6977]">{text.location}</span>
            <select
              className={selectClass}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value={ALL}>{text.allLocations}</option>
              {locations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className={advancedLabelClass}>
            <span className="shrink-0 text-[#6f6977]">{text.minimumMatch}</span>
            <select
              className={selectClass}
              value={minimumMatch}
              onChange={(event) => setMinimumMatch(event.target.value)}
            >
              <option value="0">{text.unlimited}</option>
              <option value="60">60% {text.orMore}</option>
              <option value="70">70% {text.orMore}</option>
              <option value="80">80% {text.orMore}</option>
              <option value="90">90% {text.orMore}</option>
            </select>
          </label>
          <Button
            className="h-[38px] px-[11px] text-[10px] text-[#968ba0] hover:bg-transparent hover:text-[#d6c9f4] max-[760px]:justify-self-start max-[460px]:w-full"
            variant="ghost"
            size="sm"
            type="button"
            onClick={resetFilters}
          >
            <RotateCcw size={14} />
            {text.reset}
          </Button>
        </div>
      </section>

      <section className="jobs-list" aria-label={text.list}>
        <div className="jobs-list-head">
          <span>{text.companyJob}</span>
          <span>{text.platform}</span>
          <span>{text.status}</span>
          <span>{text.match}</span>
          <span>{text.updatedAt}</span>
          <span />
        </div>
        {filtered.map((job) => (
          <button
            className="job-row"
            type="button"
            key={job.id}
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <span className="job-company">
              <span className="company-monogram">
                {job.company.slice(0, 1)}
              </span>
              <span>
                <strong>{job.company}</strong>
                <small>{job.role}</small>
                <em>
                  <span>
                    <MapPin size={12} />
                    {job.location}
                  </span>
                  <span>
                    <Banknote size={12} />
                    {job.salary}
                  </span>
                </em>
              </span>
            </span>
            <span className="platform-name">{job.platform}</span>
            <span>
              <span className={`status-badge status-${job.status}`}>
                {getJobStatusLabel(job.status, language)}
              </span>
            </span>
            <span className="match-cell">
              <strong>{job.match}%</strong>
              <span className="mini-progress">
                <i style={{ width: `${job.match}%` }} />
              </span>
            </span>
            <time>{job.updatedAt}</time>
            <ChevronRight size={17} />
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="grid min-h-60 place-items-center gap-[7px] text-[#6f6977]">
            <Search size={24} />
            <strong className="text-[13px] text-[#c7c1cb]">
              {text.empty}
            </strong>
            <span className="text-[11px]">{text.emptyHint}</span>
            <Button
              className="h-[38px] text-[10px] text-[#968ba0] hover:bg-transparent hover:text-[#d6c9f4]"
              variant="ghost"
              size="sm"
              type="button"
              onClick={resetFilters}
            >
              <RotateCcw size={14} />
              {text.clearFilters}
            </Button>
          </div>
        )}
      </section>
      <div className="flex items-center justify-between text-[10px] text-[#6f6977]">
        <span>{text.pagination}</span>
        <div className="flex gap-1">
          <Button
            className="size-9 border-[#2c2831] text-[#a39ca9]"
            variant="ghost"
            size="icon"
            disabled
          >
            <ChevronLeft size={17} />
          </Button>
          <Button
            className="size-9 rounded-[5px] border-[#513c78] bg-[#221a35] text-[#c8b5f7]"
            variant="outline"
            size="icon"
          >
            1
          </Button>
          <Button
            className="size-9 border-[#2c2831] text-[#a39ca9]"
            variant="ghost"
            size="icon"
            disabled
          >
            <ChevronRight size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const jobsCopy = {
  ja: { title: "求人一覧", subtitle: "求人情報を絞り込み、比較しながら継続的に管理できます。", results: "件", filters: "求人フィルター", search: "企業名・職種名を検索", allStatuses: "すべてのステータス", allPlatforms: "すべての媒体", newest: "更新が新しい順", oldest: "更新が古い順", highestMatch: "マッチ度が高い順", highestSalary: "給与が高い順", annualSalary: "年収", minimum: "最低", to: "〜", maximum: "最高", requiredSkill: "必須スキル", allRequiredSkills: "すべての必須スキル", bonusSkill: "歓迎スキル", allBonusSkills: "すべての歓迎スキル", location: "勤務地", allLocations: "すべての勤務地", minimumMatch: "最低マッチ度", unlimited: "指定なし", orMore: "以上", reset: "リセット", list: "求人一覧", companyJob: "企業 / 求人", platform: "求人媒体", status: "ステータス", match: "マッチ度", updatedAt: "更新日時", empty: "条件に一致する求人がありません", emptyHint: "キーワードや絞り込み条件を変更してください。", clearFilters: "フィルターをクリア", pagination: "1 / 1 ページ" },
  zh: { title: "所有岗位", subtitle: "筛选、比较并持续维护你的求职机会。", results: "条结果", filters: "岗位筛选", search: "搜索公司或岗位", allStatuses: "全部状态", allPlatforms: "全部平台", newest: "最近更新", oldest: "最早更新", highestMatch: "匹配度最高", highestSalary: "薪资最高", annualSalary: "年薪", minimum: "最低", to: "至", maximum: "最高", requiredSkill: "必须技能", allRequiredSkills: "全部必须技能", bonusSkill: "加分技能", allBonusSkills: "全部加分技能", location: "工作地点", allLocations: "全部地点", minimumMatch: "最低匹配度", unlimited: "不限", orMore: "以上", reset: "重置", list: "岗位列表", companyJob: "公司 / 岗位", platform: "平台", status: "状态", match: "匹配度", updatedAt: "更新时间", empty: "没有符合条件的岗位", emptyHint: "尝试调整关键词或筛选条件。", clearFilters: "清除全部筛选", pagination: "第 1 页，共 1 页" },
} as const;
