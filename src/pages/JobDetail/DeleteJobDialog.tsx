import { AlertTriangle, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type DeleteJobDialogProps = {
  language: "ja" | "zh";
  jobName: string;
  open: boolean;
  isDeleting: boolean;
  error: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteJobDialog({
  language,
  jobName,
  open,
  isDeleting,
  error,
  onClose,
  onConfirm,
}: DeleteJobDialogProps) {
  const text = copy[language];

  useEffect(() => {
    if (!open || isDeleting) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDeleting, onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-5 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) onClose();
      }}
    >
      <section
        aria-labelledby="delete-job-title"
        aria-modal="true"
        className="w-full max-w-[440px] overflow-hidden rounded-md border border-[#492a31] bg-[#151318] shadow-2xl shadow-black/60"
        role="alertdialog"
      >
        <header className="flex items-start justify-between border-b border-[#2d2227] px-5 py-4">
          <div className="flex gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-[5px] bg-[#2a171d] text-[#f08c94]">
              <AlertTriangle size={18} />
            </span>
            <div>
              <p className="m-0 text-[9px] font-bold text-[#a46169]">
                DELETE OPPORTUNITY
              </p>
              <h2 className="mb-0 mt-1 text-base" id="delete-job-title">
                {text.title}
              </h2>
            </div>
          </div>
          <Button
            aria-label={text.close}
            className="size-8 text-[#8e8795] hover:bg-[#211e25] hover:text-white"
            disabled={isDeleting}
            onClick={onClose}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X size={17} />
          </Button>
        </header>

        <div className="px-5 py-5">
          <p className="text-xs leading-6 text-[#aaa4ae]">
            {text.descriptionStart}
            <strong className="text-[#f3eef5]">{jobName}</strong>
            {text.descriptionEnd}
          </p>
          <p className="mt-3 text-[10px] text-[#817a86]">{text.warning}</p>
          {error && (
            <p
              className="mt-4 rounded-[5px] border border-[#5a2e36] bg-[#27171c] px-3 py-2.5 text-[10px] text-[#ef9aa2]"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <footer className="flex justify-end gap-2 border-t border-[#2d2227] px-5 py-4">
          <Button
            className="h-9 border-[#302b34] bg-transparent px-4 text-xs text-[#aaa3b0] hover:bg-[#211e25] hover:text-white"
            disabled={isDeleting}
            onClick={onClose}
            type="button"
            variant="outline"
          >
            {text.cancel}
          </Button>
          <Button
            className="h-9 border border-[#63313a] bg-[#351b21] px-4 text-xs text-[#f39aa2] hover:bg-[#472129]"
            disabled={isDeleting}
            onClick={onConfirm}
            type="button"
            variant="destructive"
          >
            <Trash2 size={15} />
            {isDeleting ? text.deleting : text.confirm}
          </Button>
        </footer>
      </section>
    </div>
  );
}

const copy = {
  ja: {
    title: "この求人を削除しますか？",
    close: "閉じる",
    descriptionStart: "「",
    descriptionEnd: "」を削除します。",
    warning: "関連する履歴も削除され、この操作は取り消せません。",
    cancel: "キャンセル",
    confirm: "削除する",
    deleting: "削除中...",
  },
  zh: {
    title: "要删除这个岗位吗？",
    close: "关闭",
    descriptionStart: "即将删除“",
    descriptionEnd: "”。",
    warning: "相关记录也会被删除，并且此操作无法撤销。",
    cancel: "取消",
    confirm: "确认删除",
    deleting: "删除中...",
  },
} as const;
