import { IStatus } from "@/src/lib/store/global/types/type";

type AuthStatusMessageProps = {
  status: IStatus;
  successMessage?: string;
};

export function AuthStatusMessage({
  status,
  successMessage,
}: AuthStatusMessageProps) {
  if (status === IStatus.ERROR) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Provided details are already taken, try another
      </p>
    );
  }

  if (status === IStatus.SUCCESS && successMessage) {
    return (
      <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        {successMessage}
      </p>
    );
  }

  return null;
}
