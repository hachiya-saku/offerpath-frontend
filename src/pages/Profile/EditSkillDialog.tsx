import { useEffect, useRef, type SubmitEvent } from "react";
import { Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SkillInput, SkillLevel, UserSkill } from "@/types/skills";

export function EditSkillDialog({
  skill,
  language,
  busy,
  error,
  onClose,
  onSave,
  onDelete,
}: {
  skill: UserSkill | null;
  language: "ja" | "zh";
  busy: boolean;
  error: string;
  onClose: () => void;
  onSave: (data: SkillInput) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const ja = language === "ja";
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  const field =
    "mt-2 h-10 w-full rounded border border-[#39313f] bg-[#100f12] px-3 text-xs text-white outline-none focus:border-[#8b5cf6]";
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void onSave({
      name: String(data.get("name")).trim(),
      level: data.get("level") as SkillLevel,
      yearsLabel: String(data.get("yearsLabel")).trim() || null,
    });
  };
  return (
    <dialog
      aria-label={ja ? "スキル編集" : "技能编辑"}
      ref={dialog}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-md rounded-md border border-[#39313f] bg-[#18151d] p-0 text-[#e9e4ee] shadow-2xl backdrop:bg-black/70"
    >
      <form onSubmit={submit} className="grid gap-5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base">
            {ja
              ? skill
                ? "スキルを編集"
                : "スキルを追加"
              : skill
                ? "编辑技能"
                : "添加技能"}
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={busy}
            aria-label={ja ? "閉じる" : "关闭"}
            onClick={onClose}
          >
            <X size={17} />
          </Button>
        </div>
        <fieldset disabled={busy} className="grid gap-4">
          <label className="text-xs">
            {ja ? "スキル名" : "技能名称"}
            <input
              className={field}
              name="name"
              required
              maxLength={80}
              defaultValue={skill?.name ?? ""}
              autoFocus
            />
          </label>
          <label className="text-xs">
            {ja ? "習熟度" : "掌握程度"}
            <select
              className={field}
              name="level"
              defaultValue={skill?.level ?? "BEGINNER"}
            >
              <option value="PROFICIENT">{ja ? "熟練" : "熟练"}</option>
              <option value="INTERMEDIATE">{ja ? "一般" : "一般"}</option>
              <option value="BEGINNER">{ja ? "基礎" : "了解"}</option>
            </select>
          </label>
          <label className="text-xs">
            {ja ? "経験期間" : "经验时长"}
            <input
              className={field}
              name="yearsLabel"
              maxLength={80}
              defaultValue={skill?.yearsLabel ?? ""}
              placeholder={ja ? "例：1年" : "例如：1年"}
            />
          </label>
        </fieldset>
        {error && (
          <p role="alert" className="text-xs text-[#f09ca6]">
            {error}
          </p>
        )}
        <div className="flex justify-between gap-3">
          {skill ? (
            <Button
              type="button"
              variant="ghost"
              disabled={busy}
              className="text-[#f09ca6]"
              onClick={() => {
                if (
                  window.confirm(
                    ja ? "このスキルを削除しますか？" : "确定删除此技能吗？",
                  )
                )
                  void onDelete();
              }}
            >
              <Trash2 size={15} />
              {ja ? "削除" : "删除"}
            </Button>
          ) : (
            <span />
          )}
          <Button
            type="submit"
            disabled={busy}
            className="bg-[#7c3aed] text-white hover:bg-[#8b4cf0]"
          >
            <Save size={15} />
            {busy ? (ja ? "保存中…" : "保存中…") : ja ? "保存" : "保存"}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
