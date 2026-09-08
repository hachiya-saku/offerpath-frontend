import { CircleX, X } from "lucide-react";
import { useEffect, useState, type SubmitEvent } from "react";
import { Button } from "@/components/ui/button";

type RejectJobDialogProps = {
  language: "ja" | "zh";
  open: boolean;
  isSaving: boolean;
  error: string;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
};

export function RejectJobDialog({
  language,
  open,
  isSaving,
  error,
  onClose,
  onConfirm,
}: RejectJobDialogProps) {
  const text = copy[language];
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open || isSaving) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSaving, onClose, open]);

  useEffect(() => {
    if (open) setReason("");
  }, [open]);

  if (!open) return null;

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm(reason.trim() || undefined);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
    >
      <section
        aria-labelledby="reject-job-title"
        aria-modal="true"
        className="w-full max-w-[480px] overflow-hidden rounded-md border border-[#4b2c32] bg-[#151318] shadow-2xl"
        role="dialog"
      >
        <header className="flex items-start justify-between border-b border-[#302329] px-6 py-5">
          <div className="flex gap-3">
            <span className="grid size-9 place-items-center rounded-[5px] bg-[#28181c] text-[#e18c94]">
              <CircleX size={19} />
            </span>
            <div>
              <p className="m-0 text-[10px] font-bold text-[#a86870]">
                APPLICATION RESULT
              </p>
              <h2 className="mb-0 mt-1 text-lg" id="reject-job-title">
                {text.title}
              </h2>
            </div>
          </div>
          <Button
            aria-label={text.close}
            disabled={isSaving}
            onClick={onClose}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X size={18} />
          </Button>
        </header>
        <form className="grid gap-5 p-6" onSubmit={submit}>
          <p className="m-0 text-xs leading-6 text-[#9b94a2]">
            {text.description}
          </p>
          <label className="grid gap-2 text-[10px] text-[#8f8998]">
            {text.reason}
            <textarea
              className="min-h-24 resize-y rounded-[5px] border border-[#302b35] bg-[#0f0e11] p-3 text-xs text-[#f2eef5] outline-none focus:border-[#7957ba]"
              maxLength={500}
              onChange={(event) => setReason(event.target.value)}
              placeholder={text.placeholder}
              value={reason}
            />
          </label>
          {error && (
            <p className="m-0 text-[10px] text-[#ef9aa2]" role="alert">
              {error}
            </p>
          )}
          <footer className="flex justify-end gap-2 border-t border-[#302329] pt-5">
            <Button disabled={isSaving} onClick={onClose} type="button" variant="outline">
              {text.cancel}
            </Button>
            <Button
              className="bg-[#5a2932] text-[#ffc0c5] hover:bg-[#71333e]"
              disabled={isSaving}
              type="submit"
            >
              <CircleX size={16} />
              {isSaving ? text.saving : text.confirm}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  );
}

const copy = {
  ja: {
    title: "不採用として記録しますか？",
    close: "閉じる",
    description: "現在の選考を終了し、求人ステータスを不採用に変更します。間違えた場合は直後に取り消せます。",
    reason: "メモ（任意）",
    placeholder: "例：書類選考で終了、経験年数が不足",
    cancel: "キャンセル",
    confirm: "不採用にする",
    saving: "保存中...",
  },
  zh: {
    title: "记录为未通过吗？",
    close: "关闭",
    description: "结束当前选考流程，并将岗位状态改为未通过。如果操作有误，可以立即撤销。",
    reason: "备注（选填）",
    placeholder: "例如：书类筛选未通过，工作经验不足",
    cancel: "取消",
    confirm: "标记为挂了",
    saving: "保存中...",
  },
} as const;
