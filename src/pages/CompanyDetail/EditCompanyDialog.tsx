import { Building2, FileText, Globe2, MapPin, UsersRound, X } from "lucide-react";
import { useEffect, type SubmitEventHandler } from "react";
import { Button } from "@/components/ui/button";
import type { Company, UpdateCompanyRequest } from "@/types/companies";

type EditCompanyDialogProps = {
  company: Company;
  language: "ja" | "zh";
  open: boolean;
  isSaving: boolean;
  saveError: string;
  onClose: () => void;
  onSave: (data: UpdateCompanyRequest) => void;
};

const fieldClass =
  "h-10 w-full rounded-[5px] border border-[#302b34] bg-[#100f12] px-3 text-xs text-[#f4f1f6] outline-none transition-colors placeholder:text-[#5e5864] focus:border-[#7655a9]";

export function EditCompanyDialog({
  company,
  language,
  open,
  isSaving,
  saveError,
  onClose,
  onSave,
}: EditCompanyDialogProps) {
  const text = copy[language];

  useEffect(() => {
    if (!open || isSaving) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSaving, onClose, open]);

  if (!open) return null;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const optionalValue = (name: string) => {
      const value = String(formData.get(name) ?? "").trim();
      return value || null;
    };

    onSave({
      name: String(formData.get("name") ?? "").trim(),
      website: optionalValue("website"),
      industry: optionalValue("industry"),
      size: optionalValue("size"),
      location: optionalValue("location"),
      description: optionalValue("description"),
      notes: optionalValue("notes"),
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && !isSaving && onClose()}>
      <section aria-labelledby="edit-company-title" aria-modal="true" className="my-auto w-full max-w-[680px] overflow-hidden rounded-md border border-[#393140] bg-[#151318] shadow-2xl" role="dialog">
        <header className="flex items-start justify-between border-b border-[#29252e] px-6 py-5">
          <div><p className="m-0 text-[9px] font-bold text-[#786f82]">COMPANY PROFILE</p><h2 className="mb-0 mt-1 text-base" id="edit-company-title">{text.title}</h2></div>
          <Button aria-label={text.close} disabled={isSaving} onClick={onClose} size="icon" type="button" variant="ghost"><X size={17} /></Button>
        </header>
        <form className="grid gap-4 p-6" onSubmit={handleSubmit}>
          <Field icon={<Building2 size={15} />} label={text.name}><input className={fieldClass} defaultValue={company.name} maxLength={120} name="name" required /></Field>
          <div className="grid grid-cols-2 gap-4 max-[580px]:grid-cols-1">
            <Field icon={<Globe2 size={15} />} label={text.website}><input className={fieldClass} defaultValue={company.website ?? ""} maxLength={2048} name="website" placeholder="https://example.com" type="url" /></Field>
            <Field icon={<Building2 size={15} />} label={text.industry}><input className={fieldClass} defaultValue={company.industry ?? ""} maxLength={120} name="industry" placeholder={text.industryPlaceholder} /></Field>
            <Field icon={<UsersRound size={15} />} label={text.size}><input className={fieldClass} defaultValue={company.size ?? ""} maxLength={80} name="size" placeholder={text.sizePlaceholder} /></Field>
            <Field icon={<MapPin size={15} />} label={text.location}><input className={fieldClass} defaultValue={company.location ?? ""} maxLength={200} name="location" placeholder={text.locationPlaceholder} /></Field>
          </div>
          <Field icon={<FileText size={15} />} label={text.description}><textarea className="min-h-24 w-full resize-y rounded-[5px] border border-[#302b34] bg-[#100f12] p-3 text-xs leading-5 text-[#f4f1f6] outline-none focus:border-[#7655a9]" defaultValue={company.description ?? ""} maxLength={2000} name="description" /></Field>
          <Field icon={<FileText size={15} />} label={text.notes}><textarea className="min-h-20 w-full resize-y rounded-[5px] border border-[#302b34] bg-[#100f12] p-3 text-xs leading-5 text-[#f4f1f6] outline-none focus:border-[#7655a9]" defaultValue={company.notes ?? ""} maxLength={2000} name="notes" /></Field>
          {saveError && <p className="m-0 text-[10px] text-[#ef9aa2]" role="alert">{saveError}</p>}
          <footer className="mt-1 flex justify-end gap-2 border-t border-[#29252e] pt-4">
            <Button disabled={isSaving} onClick={onClose} type="button" variant="outline">{text.cancel}</Button>
            <Button className="bg-[#7c3aed] text-white hover:bg-[#8b4cf0]" disabled={isSaving} type="submit">{isSaving ? text.saving : text.save}</Button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-[10px] text-[#bcb6c2]"><span className="flex items-center gap-1.5 text-[#8f8998]">{icon}{label}</span>{children}</label>;
}

const copy = {
  ja: { title: "企業情報を編集", close: "閉じる", name: "企業名 *", website: "Webサイト", industry: "業界", industryPlaceholder: "例：SaaS / HR Tech", size: "従業員規模", sizePlaceholder: "例：51〜100名", location: "所在地", locationPlaceholder: "例：東京都渋谷区", description: "企業概要", notes: "企業メモ", cancel: "キャンセル", save: "変更を保存", saving: "保存中..." },
  zh: { title: "编辑公司资料", close: "关闭", name: "公司名称 *", website: "公司网站", industry: "所属行业", industryPlaceholder: "例如：SaaS / HR Tech", size: "员工规模", sizePlaceholder: "例如：51～100 人", location: "所在地", locationPlaceholder: "例如：东京都涩谷区", description: "公司简介", notes: "公司备注", cancel: "取消", save: "保存修改", saving: "保存中..." },
} as const;
