import { FileText, Image, MapPin, UserRound, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { UpdateProfileRequest, UserProfile } from '@/types/auth';


type EditProfileDialogProps = {
  language: "ja" | "zh";
  open: boolean;
  profile: UserProfile;
  isSaving: boolean;
  saveError: string | null;
  onClose: () => void;
  onSave: (data: UpdateProfileRequest) => void;
};
const fieldClass =
  "h-10 w-full rounded-[5px] border border-[#302b34] bg-[#100f12] px-3 text-xs text-[#f4f1f6] outline-none transition-colors placeholder:text-[#5e5864] focus:border-[#7655a9]";

export function EditProfileDialog({
  language,
  open,
  profile,
  isSaving,
  saveError,
  onClose,
  onSave
}: EditProfileDialogProps) {
  const text = dialogCopy[language];

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="edit-profile-title"
        aria-modal="true"
        className="w-full max-w-[520px] overflow-hidden rounded-md border border-[#302b34] bg-[#151318] shadow-2xl shadow-black/50"
        role="dialog"
      >
        <header className="flex items-start justify-between border-b border-[#29252e] px-5 py-4">
          <div>
            <p className="m-0 text-[9px] font-bold text-[#786f82]">
              PERSONAL PROFILE
            </p>
            <h2 className="mb-0 mt-1 text-base" id="edit-profile-title">
              {text.title}
            </h2>
          </div>
          <Button
            aria-label={text.close}
            className="size-8 text-[#8e8795] hover:bg-[#211e25] hover:text-white"
            onClick={onClose}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X size={17} />
          </Button>
        </header>

        <form
          className="grid gap-4 px-5 py-5"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.displayName}</span>
            <div className="relative flex items-center">
              <UserRound className="absolute left-3 text-[#6f6977]" size={15} />
              <input
                autoComplete="name"
                className={`${fieldClass} pl-9`}
                defaultValue={profile.displayName}
                maxLength={80}
                name="displayName"
                required
              />
            </div>
          </label>

          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.bio}</span>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-[#6f6977]" size={15} />
              <textarea
                className="min-h-[92px] w-full resize-y rounded-[5px] border border-[#302b34] bg-[#100f12] py-2.5 pl-9 pr-3 text-xs leading-5 text-[#f4f1f6] outline-none transition-colors placeholder:text-[#5e5864] focus:border-[#7655a9]"
                defaultValue={profile.bio ?? ""}
                maxLength={300}
                name="bio"
                placeholder={text.bioPlaceholder}
              />
            </div>
          </label>

          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.location}</span>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3 text-[#6f6977]" size={15} />
              <input
                className={`${fieldClass} pl-9`}
                defaultValue={profile.location ?? ""}
                maxLength={120}
                name="location"
                placeholder={text.locationPlaceholder}
              />
            </div>
          </label>

          <label className="grid gap-2 text-[10px] text-[#bcb6c2]">
            <span>{text.avatarUrl}</span>
            <div className="relative flex items-center">
              <Image className="absolute left-3 text-[#6f6977]" size={15} />
              <input
                className={`${fieldClass} pl-9`}
                defaultValue={profile.avatarUrl ?? ""}
                maxLength={2048}
                name="avatarUrl"
                placeholder="https://example.com/avatar.jpg"
                type="url"
              />
            </div>
          </label>

          <p className="m-0 text-[9px] text-[#6f6977]">{profile.email}</p>

          <footer className="mt-1 flex justify-end gap-2 border-t border-[#29252e] pt-4">
            <Button
              className="h-9 border-[#302b34] bg-transparent px-4 text-xs text-[#aaa3b0] hover:bg-[#211e25] hover:text-white"
              onClick={onClose}
              type="button"
              variant="outline"
            >
              {text.cancel}
            </Button>
            <Button
              className="h-9 bg-[#7c3aed] px-4 text-xs text-white hover:bg-[#8b4cf0]"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ?  "保存中..." : text.save}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  );
}

const dialogCopy = {
  ja: {
    title: "プロフィールを編集",
    close: "閉じる",
    displayName: "表示名",
    bio: "自己紹介",
    bioPlaceholder: "経歴や目指している職種を入力",
    location: "所在地",
    locationPlaceholder: "例：Tokyo, Japan",
    avatarUrl: "アバター URL",
    cancel: "キャンセル",
    save: "変更を保存",
  },
  zh: {
    title: "编辑个人资料",
    close: "关闭",
    displayName: "显示名称",
    bio: "个人简介",
    bioPlaceholder: "填写经历或目标岗位",
    location: "所在地",
    locationPlaceholder: "例如：Tokyo, Japan",
    avatarUrl: "头像 URL",
    cancel: "取消",
    save: "保存修改",
  },
} as const;
