import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RegisterTrack } from "../types/auth-form";

type RegisterTrackSelectorProps = {
  value: RegisterTrack;
  onValueChange: (value: RegisterTrack) => void;
};

export function RegisterTrackSelector({
  value,
  onValueChange,
}: RegisterTrackSelectorProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as RegisterTrack)}
      className="gap-5"
    >
      <TabsList className="grid h-auto grid-cols-2 rounded-2xl bg-slate-100 p-1">
        <TabsTrigger value="student" className="rounded-xl py-2.5">
          Student
        </TabsTrigger>
        <TabsTrigger value="institute-admin" className="rounded-xl py-2.5">
          Institute admin
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
