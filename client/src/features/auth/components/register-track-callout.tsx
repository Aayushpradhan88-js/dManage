import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { RegisterTrack } from "../types/auth-form";

type RegisterTrackCalloutProps = {
  track: RegisterTrack;
};

export function RegisterTrackCallout({ track }: RegisterTrackCalloutProps) {
  if (track !== "institute-admin") {
    return null;
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
          <Building2 className="h-5 w-5" />
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-slate-950">
            Two-step institute admin journey
          </p>
          <p className="text-sm leading-6 text-slate-600">
            First create your personal account here. Then continue to the
            institute application form so the super admin can review and approve
            your request.
          </p>
          <Link
            href="/institute/becomeInstitute"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900"
          >
            Open institute admin application
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
