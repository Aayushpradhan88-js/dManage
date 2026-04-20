"use client"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Button } from "@/src/lib/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { Label } from "@/src/lib/components/ui/label"
import { Input } from "@/src/lib/components/ui/input"
import { Separator } from "@/src/lib/components/ui/separator"

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your institute profile and preferences"
      />

      <div className="space-y-6 max-w-2xl">
        {/* Institute Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Institute Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institute-name">Institute Name</Label>
              <Input
                id="institute-name"
                defaultValue="Kathmandu Tech Academy"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institute-email">Contact Email</Label>
              <Input
                id="institute-email"
                defaultValue="admin@kta.edu.np"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institute-phone">Phone</Label>
              <Input
                id="institute-phone"
                defaultValue="+977-1-4567890"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institute-address">Address</Label>
              <Input
                id="institute-address"
                defaultValue="Putalisadak, Kathmandu, Nepal"
                readOnly
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                defaultValue="Asia/Kathmandu (UTC+5:45)"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                defaultValue="English"
                readOnly
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </>
  )
}
