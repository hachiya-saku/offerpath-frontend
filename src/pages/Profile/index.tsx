import {
  AtSign,
  CircleUserRound,
  Code2,
  MapPin,
  Pencil,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { skills } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getExperienceLabel, getSkillLevelLabel } from "@/i18n/jobLabels";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserProfileAPI } from "@/api/users";
import { useAppSelector } from "@/store/hooks";
import type { UserProfile } from "@/types/auth";
import { EditProfileDialog } from "./EditProfileDialog";

const skillTones: Record<string, string> = {
  purple: "bg-[#271d3b] text-[#b89cf6]",
  blue: "bg-[#19233f] text-[#91a7ff]",
  green: "bg-[#142c29] text-[#68decf]",
  pink: "bg-[#321c28] text-[#e8a4c1]",
  amber: "bg-[#302616] text-[#f2c46e]",
  cyan: "bg-[#172a2f] text-[#76c9d8]",
};

const levelTones: Record<string, string> = {
  熟练: "bg-[#142b27] text-[#68d8c2]",
  一般: "bg-[#19223a] text-[#93a8ee]",
  了解: "bg-[#252229] text-[#b0a9b6]",
};

export function Profile() {
  const { language } = useLanguage();
  const text = profileCopy[language];
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setHasError(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadUserProfile = async () => {
      setLoading(true);
      setHasError(false);

      try {
        const response = await getUserProfileAPI(accessToken);
        if (!cancelled) {
          setUserProfile(response.data);
        }
      } catch {
        if (!cancelled) {
          setHasError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadUserProfile();

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  if (loading) {
    return <ProfileLoading />;
  }

  if (hasError || !userProfile) {
    return (
      <section className="grid min-h-[320px] place-items-center rounded-md border border-[#30252d] bg-[#151318] px-6 text-center">
        <div className="grid max-w-[360px] gap-3">
          <CircleUserRound className="mx-auto text-[#765f86]" size={34} />
          <h2 className="m-0 text-base">{text.loadError}</h2>
          <p className="m-0 text-xs leading-6 text-[#8d8693]">
            {text.loadErrorDetail}
          </p>
          <Link
            className="mx-auto mt-1 text-xs text-[#b9a2e8] hover:text-[#d5c4f5]"
            to="/login"
          >
            {text.backToLogin}
          </Link>
        </div>
      </section>
    );
  }

  const initials = getInitials(userProfile.displayName);
  const completedFields = [
    userProfile.displayName,
    userProfile.bio,
    userProfile.location,
    userProfile.avatarUrl,
  ].filter(Boolean).length;
  const completeness = `${Math.round((completedFields / 4) * 100)}%`;
  const profileStats = [
    [text.skillCount, "6"],
    [text.strongSkills, "2"],
    [text.averageMatch, "78%"],
    [text.completeness, completeness],
  ];

  return (
    <div className="grid gap-6">
      <section className="flex items-center gap-[18px] rounded-md border border-[#211e25] bg-[#151318] p-[26px] max-[760px]:flex-wrap max-[760px]:items-start">
        {userProfile.avatarUrl ? (
          <img
            alt=""
            className="size-[76px] shrink-0 rounded-md border border-[#4d3c6b] object-cover"
            src={userProfile.avatarUrl}
          />
        ) : (
          <div className="grid size-[76px] shrink-0 place-items-center rounded-md border border-[#4d3c6b] bg-[#221a35] text-[22px] font-bold text-[#c8b0fc]">
            {initials}
          </div>
        )}
        <div className="flex-1">
          <p className="m-0 text-[10px] font-bold text-[#786f82]">
            PERSONAL PROFILE
          </p>
          <h2 className="mb-1 mt-2 text-[23px] font-semibold">
            {userProfile.displayName}
          </h2>
          <p className="text-[13px] text-[#948e9d]">
            {userProfile.bio || text.emptyBio}
          </p>
          <div className="mt-3 flex gap-[18px] max-[460px]:flex-col max-[460px]:gap-1">
            <span className="flex items-center gap-1 text-[10px] text-[#6f6977]">
              <MapPin size={14} />
              {userProfile.location || text.emptyLocation}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#6f6977]">
              <AtSign size={14} />
              {userProfile.email}
            </span>
          </div>
        </div>
        <Button
          className="h-[38px] rounded-[5px] border-[#2c2831] bg-[#17151a] px-3.5 text-xs text-[#c5bfca] hover:border-[#46404e] hover:bg-[#17151a] hover:text-white max-[760px]:w-full"
          variant="outline"
          type="button"
          onClick={() => setIsEditOpen(true)}
        >
          <Pencil size={16} />
          {text.editProfile}
        </Button>
      </section>

      <section className="grid grid-cols-4 overflow-hidden rounded-md border border-[#211e25] max-[760px]:grid-cols-2 max-[460px]:grid-cols-1">
        {profileStats.map(([label, value]) => (
          <div
            className="grid gap-2 border-r border-[#211e25] bg-[#151318] p-[18px] last:border-r-0 max-[760px]:nth-[2]:border-r-0 max-[460px]:border-b max-[460px]:border-r-0"
            key={label}
          >
            <span className="text-[10px] text-[#948e9d]">{label}</span>
            <strong className="text-xl">{value}</strong>
          </div>
        ))}
      </section>

      <section className="rounded-md border border-[#211e25] bg-[#151318] p-[21px] max-[460px]:p-[17px]">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="m-0 text-[10px] font-bold text-[#786f82]">
              SKILL INVENTORY
            </p>
            <h3 className="mt-1 text-[15px] font-semibold">{text.skillProfile}</h3>
            <p className="mt-1.5 text-xs text-[#948e9d]">
              {text.skillDescription}
            </p>
          </div>
          <Button
            className="h-[38px] rounded-[5px] bg-[#7c3aed] px-3.5 text-xs text-white hover:bg-[#8b4cf0]"
            type="button"
          >
            <Plus size={16} />
            {text.addSkill}
          </Button>
        </div>

        <div className="mt-[19px] overflow-x-auto">
          <div className="grid min-h-9 min-w-[680px] grid-cols-[1.3fr_.8fr_.7fr_1fr_36px] items-center gap-3.5 bg-[#111014] px-3 text-[9px] text-[#6f6977]">
            <span>{text.skill}</span>
            <span>{text.level}</span>
            <span>{text.experience}</span>
            <span>{text.weight}</span>
            <span />
          </div>
          {skills.map((skill) => {
            const weight =
              skill.level === "熟练"
                ? "100%"
                : skill.level === "一般"
                  ? "60%"
                  : "30%";
            return (
              <div
                className="grid min-h-[57px] min-w-[680px] grid-cols-[1.3fr_.8fr_.7fr_1fr_36px] items-center gap-3.5 border-b border-[#211e25] px-3 text-[10px] text-[#948e9d]"
                key={skill.name}
              >
                <span className="flex items-center gap-2.5">
                  <i
                    className={`grid size-[29px] place-items-center rounded not-italic ${skillTones[skill.color]}`}
                  >
                    <Code2 size={17} />
                  </i>
                  <strong className="text-[11px] text-[#f5f2f7]">
                    {skill.name}
                  </strong>
                </span>
                <span>
                  <span
                    className={`rounded px-2 py-1 text-[9px] ${levelTones[skill.level]}`}
                  >
                    {getSkillLevelLabel(skill.level, language)}
                  </span>
                </span>
                <span>{getExperienceLabel(skill.years, language)}</span>
                <span className="flex items-center gap-2">
                  <span className="h-[3px] w-[65px] bg-[#2a2630]">
                    <i
                      className="block h-full bg-[#8b5cf6]"
                      style={{ width: weight }}
                    />
                  </span>
                  <strong className="text-[9px] text-[#bbb5c1]">
                    {skill.level === "熟练"
                      ? "1.0"
                      : skill.level === "一般"
                        ? "0.6"
                        : "0.3"}
                  </strong>
                </span>
                <Button
                  className="size-9 border-[#2c2831] text-[#a39ca9] hover:bg-[#1b181f] hover:text-white"
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label={`${text.edit} ${skill.name}`}
                >
                  <Pencil size={15} />
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex items-start gap-3 rounded-[5px] border border-[#2d2840] bg-[#1b1725] p-3.5 text-[#b69bf2]">
        <CircleUserRound size={22} />
        <div className="grid gap-0.5">
          <strong className="text-[11px]">{text.why}</strong>
          <p className="m-0 text-[10px] text-[#948e9d]">
            {text.whyDetail}
          </p>
        </div>
      </section>

      <EditProfileDialog
        language={language}
        onClose={() => setIsEditOpen(false)}
        open={isEditOpen}
        profile={userProfile}
      />
    </div>
  );
}

function getInitials(displayName: string) {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts.at(-1)?.[0] ?? ""}`.toUpperCase();
}

function ProfileLoading() {
  return (
    <div className="grid animate-pulse gap-6" aria-label="Loading profile">
      <div className="h-[130px] rounded-md border border-[#211e25] bg-[#151318]" />
      <div className="h-[82px] rounded-md border border-[#211e25] bg-[#151318]" />
      <div className="h-[330px] rounded-md border border-[#211e25] bg-[#151318]" />
    </div>
  );
}

const profileCopy = {
  ja: { description: "フロントエンドエンジニア志望。React / TypeScript を中心に学習しています。", editProfile: "プロフィールを編集", emptyBio: "自己紹介はまだ登録されていません。", emptyLocation: "所在地未設定", loadError: "プロフィールを読み込めませんでした", loadErrorDetail: "ログイン状態を確認して、もう一度お試しください。", backToLogin: "ログイン画面へ", skillCount: "スキル数", strongSkills: "得意スキル", averageMatch: "求人平均マッチ度", completeness: "プロフィール完成度", skillProfile: "スキルプロフィール", skillDescription: "ここに登録したスキルをもとに求人とのマッチ度を算出します。", addSkill: "スキルを追加", skill: "スキル", level: "習熟度", experience: "経験期間", weight: "重み", edit: "編集", why: "スキルを管理する理由", whyDetail: "OfferPath は習熟度と求人のスキル要件からマッチ度を算出し、優先して準備すべき内容を見つけやすくします。" },
  zh: { description: "志望成为前端工程师，主要学习 React / TypeScript。", editProfile: "编辑资料", emptyBio: "暂未填写个人简介。", emptyLocation: "未设置所在地", loadError: "无法加载个人资料", loadErrorDetail: "请确认登录状态后重新尝试。", backToLogin: "返回登录", skillCount: "技能数量", strongSkills: "熟练技能", averageMatch: "岗位平均匹配", completeness: "档案完整度", skillProfile: "我的技术栈", skillDescription: "匹配度计算将以此处记录的技能为基础。", addSkill: "添加技能", skill: "技能", level: "掌握程度", experience: "学习时间", weight: "权重", edit: "编辑", why: "为什么需要维护技术栈？", whyDetail: "OfferPath 会根据掌握程度和岗位技能要求计算匹配度，帮助你快速判断准备重点。" },
} as const;
