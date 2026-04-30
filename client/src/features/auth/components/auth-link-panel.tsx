import Link from "next/link";

type AuthLinkPanelProps = {
  text: string;
  href: string;
  linkLabel: string;
  tone?: "muted" | "plain";
};

export function AuthLinkPanel({
  text,
  href,
  linkLabel,
  tone = "muted",
}: AuthLinkPanelProps) {
  if (tone === "plain") {
    return (
      <p className="text-center text-sm text-slate-600">
        {text}{" "}
        <Link
          href={href}
          className="font-semibold text-emerald-700 hover:text-emerald-800"
        >
          {linkLabel}
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
      {text}{" "}
      <Link
        href={href}
        className="font-semibold text-emerald-700 hover:text-emerald-800"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
