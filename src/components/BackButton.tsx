import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/context";

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className = "mb-6" }: BackButtonProps) {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/#services");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-0 p-0 ${className}`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {t("caseStudy.back")}
    </button>
  );
}
