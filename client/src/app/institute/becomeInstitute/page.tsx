"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  FileCheck2,
  MailCheck,
  ShieldAlert,
} from "lucide-react";
import { APIInstitute } from "@/src/lib/store/slices/institute/instituteSlice";
import { IInstituteState } from "@/src/lib/store/slices/institute/instituteSliceTypes";
import { useAppDispatch } from "../../../lib/store/hooks/customHook";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InstitutePage = () => {
  const dispatch = useAppDispatch();
  const [documentType, setDocumentType] = useState("pan");
  const [instituteData, setInstituteData] = useState<IInstituteState>({
    instituteName: "",
    instituteEmail: "",
    institutePhoneNumber: "",
    instituteAddress: "",
    instituteVatNumber: "",
    institutePanNumber: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInstituteData({
      ...instituteData,
      [name]: value,
    });
  };

  const handleInstituteCreateSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(APIInstitute.createInstitute(instituteData));
    } catch (error) {
      console.log("institute page error", error);
    }
  };

  return (
    <AuthShell
      badge="Institute application"
      title="Apply to become an institute admin."
      description="This page should feel like a reviewable business application, not a casual signup form. We need enough information for the super admin to approve with confidence."
      secondaryCta={{ href: "/login", label: "Already signed in?" }}
    >
      <Card className="overflow-hidden border-slate-200/80 bg-white/95 py-0 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur">
        <CardHeader className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">
                Institute onboarding
              </p>
              <CardTitle className="mt-2 text-3xl text-slate-950">
                Institute admin request form
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-6 py-6 sm:px-8">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <MailCheck className="mb-3 h-5 w-5 text-emerald-700" />
              <p className="text-sm font-semibold text-slate-950">
                Use a real business email
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                This should match the contact address used for institute
                communication.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <FileCheck2 className="mb-3 h-5 w-5 text-emerald-700" />
              <p className="text-sm font-semibold text-slate-950">
                Provide one legal document
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Collect either PAN or VAT for the first reviewable version.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <ShieldAlert className="mb-3 h-5 w-5 text-emerald-700" />
              <p className="text-sm font-semibold text-slate-950">
                No instant approval
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Keep this as a pending application until a super admin verifies
                it.
              </p>
            </div>
          </div>

          <form onSubmit={handleInstituteCreateSubmission} className="space-y-5">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="instituteName">Institute name</FieldLabel>
                <Input
                  id="instituteName"
                  name="instituteName"
                  type="text"
                  placeholder="dManage Academy"
                  value={instituteData.instituteName}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-slate-200 bg-white"
                  required
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="instituteEmail">Institute email</FieldLabel>
                  <Input
                    id="instituteEmail"
                    name="instituteEmail"
                    type="email"
                    placeholder="contact@dmanage.com"
                    value={instituteData.instituteEmail}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-slate-200 bg-white"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="institutePhoneNumber">Phone number</FieldLabel>
                  <Input
                    id="institutePhoneNumber"
                    name="institutePhoneNumber"
                    type="text"
                    placeholder="+977 98XXXXXXXX"
                    value={instituteData.institutePhoneNumber}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-slate-200 bg-white"
                    required
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="instituteAddress">Address</FieldLabel>
                <Input
                  id="instituteAddress"
                  name="instituteAddress"
                  type="text"
                  placeholder="Kathmandu, Nepal"
                  value={instituteData.instituteAddress}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-slate-200 bg-white"
                  required
                />
                <FieldDescription>
                  Later we can split this into district, municipality, and full
                  address if needed.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Verification document</FieldLabel>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-200 bg-white">
                    <SelectItem value="pan">PAN number</SelectItem>
                    <SelectItem value="vat">VAT number</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {documentType === "pan" ? (
                <Field>
                  <FieldLabel htmlFor="institutePanNumber">PAN number</FieldLabel>
                  <Input
                    id="institutePanNumber"
                    name="institutePanNumber"
                    type="text"
                    placeholder="Enter PAN number"
                    value={instituteData.institutePanNumber ?? ""}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-slate-200 bg-white"
                  />
                </Field>
              ) : (
                <Field>
                  <FieldLabel htmlFor="instituteVatNumber">VAT number</FieldLabel>
                  <Input
                    id="instituteVatNumber"
                    name="instituteVatNumber"
                    type="text"
                    placeholder="Enter VAT number"
                    value={instituteData.instituteVatNumber ?? ""}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-slate-200 bg-white"
                  />
                </Field>
              )}
            </FieldGroup>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              Current frontend recommendation: after submit, show a pending
              application state with &quot;Under review&quot; instead of logging
              the user into the institute dashboard immediately.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="outline"
                className="h-12 flex-1 rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                <Link href="/register">
                  <ArrowLeft className="h-4 w-4" />
                  Back to account creation
                </Link>
              </Button>
              <Button
                type="submit"
                className="h-12 flex-1 rounded-xl bg-slate-950 text-white hover:bg-slate-800"
              >
                Submit application
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  );
};

export default InstitutePage;
