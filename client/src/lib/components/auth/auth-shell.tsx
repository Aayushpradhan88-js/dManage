import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, ShieldCheck } from "lucide-react";

type AuthFeature = {
  title: string;
  description: string;
};

type AuthCta = {
  href: string;
  label: string;
};

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  panelTitle: string;
  panelDescription: string;
  features: AuthFeature[];
  primaryCta?: AuthCta;
  secondaryCta?: AuthCta;
  children: React.ReactNode;
};

export function AuthShell({
  badge,
  title,
  description,
  secondaryCta,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.14),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef7f0_50%,_#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-green-900 px-6 py-8 text-white shadow-[0_30px_100px_-40px_rgba(15,23,42,0.75)] sm:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.34),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(20,184,166,0.22),_transparent_30%)]" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                  {badge}
                </p>
              </div>
            </div>

            <div className="mt-12 max-w-xl space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {description}
              </p>
            </div>

            <div className="mt-20 flex justify-center">
              <div className="rounded-full border-2 border-white p-12">
                <GraduationCap className="h-20 w-20 text-white" strokeWidth={1.2} />
              </div>
            </div>
            <div className="mt-auto pt-10">
              <div className="rounded-[28px]  backdrop-blur">
                {(secondaryCta) && (
                  <div className="mt-9 flex flex-wrap gap-3">
                    {secondaryCta && (
                      <Link
                        href={secondaryCta.href}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        {secondaryCta.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-xl">{children}</div>
        </section>
      </div>
    </main>
  )
}
