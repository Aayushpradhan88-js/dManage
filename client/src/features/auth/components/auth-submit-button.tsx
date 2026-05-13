import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Loader2} from "lucide-react"

type AuthSubmitButtonProps = {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  tone?: "dark" | "emerald";
};

const toneClassName = {
  dark: "bg-slate-950 text-white hover:bg-slate-800",
  emerald:
    "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200/50 transition-all active:scale-[0.98]",
};

export function AuthSubmitButton({
  label,
  isLoading = false,
  disabled = false,
  tone = "emerald",
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={`flex cursor-pointer h-14 w-full items-center justify-center gap-2 rounded-xl ${toneClassName[tone]}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : label}
      {/* <ArrowRight className="h-4 w-4" /> */}
    </Button>
  );
}
