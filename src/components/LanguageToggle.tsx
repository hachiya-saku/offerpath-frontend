import { Languages } from "lucide-react";
import { useLanguage, type Language } from "@/i18n/LanguageContext";

const options: Array<{ value: Language; label: string }> = [
  { value: "ja", label: "JA" },
  { value: "zh", label: "中文" },
];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex h-[38px] items-center gap-1 rounded-[5px] border border-[#2c2831] bg-[#111014] p-1" aria-label="Language">
      <Languages className="ml-1 text-[#77717f]" size={14} aria-hidden />
      {options.map((option) => (
        <button
          className={`h-7 rounded-[3px] border-0 px-2 text-[10px] font-semibold transition-colors ${language === option.value ? "bg-[#2a203d] text-[#d4c5f5]" : "bg-transparent text-[#77717f] hover:text-[#c5bfca]"}`}
          key={option.value}
          type="button"
          onClick={() => setLanguage(option.value)}
          aria-pressed={language === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
