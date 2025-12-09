import { createFileRoute, Link } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Key,
} from "lucide-react"

// TODO: Add authentication check
// import { useAuth } from '~/hooks/useAuth'

export const Route = createFileRoute("/settings/")({
  component: SettingsIndex,
})

function SettingsIndex() {
  // TODO: Replace with actual data from Convex
  const stats = {
    accountAge: "45 days",
    lastLogin: "Today",
    twoFactorEnabled: false,
    emailVerified: true,
  }

  const settingsSections = [
    {
      title: "Account Settings",
      description: "Manage your personal information and account details",
      icon: User,
      href: "/settings/account",
      color: "bg-blue-500",
      items: [
        {
          label: "Personal Information",
          value: "Complete",
          badge: "Complete",
        },
        {
          label: "Email Address",
          value: "john@example.com",
          badge: "Verified",
        },
        {
          label: "Phone Number",
          value: "Not added",
          badge: "Add phone",
        },
      ],
    },
    {
      title: "Notifications",
      description: "Configure how you want to be notified",
      icon: Bell,
      href: "/settings/notifications",
      color: "bg-green-500",
      items: [
        {
          label: "Email Notifications",
          value: "Enabled",
          badge: "Active",
        },
        {
          label: "Push Notifications",
          value: "Disabled",
          badge: "Inactive",
        },
        {
          label: "Marketing Emails",
          value: "Enabled",
          badge: "Active",
        },
      ],
    },
    {
      title: "Security",
      description: "Keep your account secure",
      icon: Shield,
      href: "/settings/account",
      color: "bg-purple-500",
      items: [
        {
          label: "Two-Factor Authentication",
          value: "Disabled",
          badge: "Setup required",
        },
        {
          label: "Login Sessions",
          value: "2 active",
          badge: "Current",
        },
        {
          label: "API Keys",
          value: "2 keys",
          badge: "Active",
        },
      ],
    },
    {
      title: "Billing & Subscription",
      description: "Manage your subscription and payment methods",
      icon: CreditCard,
      href: "/dashboard/billing",
      color: "bg-orange-500",
      items: [
        {
          label: "Current Plan",
          value: "Premium",
          badge: "Active",
        },
        {
          label: "Next Billing",
          value: "Jan 15, 2025",
          badge: "Due",
        },
        {
          label: "Payment Method",
          value: "Visa ending in 4242",
          badge: "Updated",
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Account Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>
            Overview of your account security and verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">Account Age</p>
              <p className="text-2xl font-bold">{stats.accountAge}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">Last Login</p>
              <p className="text-2xl font-bold">{stats.lastLogin}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">Email Verified</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {stats.emailVerified ? "Yes" : "No"}
                </p>
                {stats.emailVerified && (
                  <Badge variant="secondary">Verified</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">
                2FA Status
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {stats.twoFactorEnabled ? "Enabled" : "Disabled"}
                </p>
                {!stats.twoFactorEnabled && (
                  <Badge variant="outline">Setup required</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${section.color} text-white`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.value}
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.badge === "Active" ||
                          item.badge === "Verified" ||
                          item.badge === "Complete" ||
                          item.badge === "Updated" ||
                          item.badge === "Current"
                            ? "secondary"
                            : item.badge === "Setup required"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {item.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Link to={section.href}>
                  <Button className="w-full">
                    Manage {section.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common actions to help you manage your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/settings/account">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span className="font-medium">Update Password</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Change your account password
                </p>
              </Button>
            </Link>
            <Link to="/settings/account">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Enable 2FA</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Add two-factor authentication
                </p>
              </Button>
            </Link>
            <Link to="/dashboard/billing">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium">Update Billing</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Manage payment methods
                </p>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}