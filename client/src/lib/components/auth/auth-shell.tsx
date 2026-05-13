import Link from "next/link";
import { GraduationCap, ShieldCheck, ArrowLeft } from "lucide-react";

type AuthCta = {
  href: string;
  label: string;
};

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
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
    <main className="min-h-screen w-full bg-white flex overflow-hidden font-sans">
      <div className="grid w-full lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Side: Branding - Rich visual experience */}
        <section className="relative hidden lg:flex flex-col items-center justify-center bg-[#064e3b] text-white p-12 overflow-hidden">
          {/* Modern Abstract Background Elements */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
            <div className="absolute top-10 left-10 w-64 h-64 border border-emerald-500/20 rounded-full" />
            <div className="absolute bottom-20 right-20 w-96 h-96 border border-emerald-400/10 rounded-full" />
            <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-emerald-300/20 rounded-full" />
          </div>

          <div className="relative z-10 max-w-lg w-full text-center space-y-12">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-4 bg-emerald-400/20 rounded-3xl blur-xl group-hover:bg-emerald-400/30 transition-all duration-500" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl ring-1 ring-white/20">
                  <GraduationCap className="h-12 w-12 text-white" strokeWidth={1.5} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300 shadow-sm">
                  <ShieldCheck className="h-3 w-3" />
                  {badge}
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-emerald-100/80">
                  {title}
                </h1>
                <p className="text-xl text-emerald-100/70 font-medium leading-relaxed max-w-md mx-auto">
                  {description}
                </p>
              </div>
            </div>

            {/* Feature stats like Image 1 */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-sm group-hover:bg-white/10 transition-colors" />
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/30 transition-all">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/60 mt-1">Users</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-sm group-hover:bg-white/10 transition-colors" />
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/30 transition-all">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/60 mt-1">Institutes</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-sm group-hover:bg-white/10 transition-colors" />
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/30 transition-all">
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/60 mt-1">Countries</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 text-emerald-500/40 text-[10px] font-bold tracking-[0.3em] uppercase">
            Powered by Advanced Management Systems
          </div>
        </section>

        {/* Right Side: Interactive Form Area */}
        <section className="flex flex-col bg-white overflow-y-auto">
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-[480px]">
              {/* Back Link - Clean and minimal like Image 1 */}
              <div className="mb-12">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-emerald-600 transition-all group"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to website
                </Link>
              </div>

              {/* Injecting children (the form card) */}
              <div className="relative">
                {children}
              </div>

              {/* Secondary CTA for better flow */}
              {secondaryCta && (
                <div className="mt-8 text-center">
                   <p className="text-sm text-slate-500">
                     {secondaryCta.label.includes('?') ? (
                        <>
                          {secondaryCta.label.split('?')[0]}?{' '}
                          <Link href={secondaryCta.href} className="text-emerald-600 font-bold hover:underline underline-offset-4">
                            {secondaryCta.label.split('?')[1].trim()}
                          </Link>
                        </>
                     ) : (
                        <Link href={secondaryCta.href} className="text-emerald-600 font-bold hover:underline underline-offset-4">
                          {secondaryCta.label}
                        </Link>
                     )}
                   </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8 text-center">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
              © {new Date().getFullYear()} dManage • Secure Enterprise Management
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
