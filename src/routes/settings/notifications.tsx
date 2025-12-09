import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"
import { Badge } from "~/components/ui/badge"
import {
  Bell,
  Mail,
  MessageSquare,
  Shield,
  AlertCircle,
} from "lucide-react"

// TODO: Add authentication check
// import { useAuth } from '~/hooks/useAuth'

export const Route = createFileRoute("/settings/notifications")({
  component: SettingsNotifications,
})

function SettingsNotifications() {
  // TODO: Replace with actual data from Convex
  const [notifications, setNotifications] = useState({
    email: {
      accountUpdates: true,
      securityAlerts: true,
      marketing: false,
      productUpdates: true,
      weeklyDigest: false,
    },
    push: {
      enabled: false,
      accountUpdates: true,
      mentions: true,
      newMessages: true,
      projectUpdates: false,
    },
    sms: {
      enabled: false,
      securityAlerts: true,
      accountUpdates: false,
    },
  })

  const handleSaveEmailNotifications = () => {
    // TODO: Implement save to Convex
    console.log("Saving email notifications:", notifications.email)
  }

  const handleSavePushNotifications = () => {
    // TODO: Implement save to Convex
    console.log("Saving push notifications:", notifications.push)
  }

  const handleSaveSmsNotifications = () => {
    // TODO: Implement save to Convex
    console.log("Saving SMS notifications:", notifications.sms)
  }

  const handleResetToDefaults = () => {
    // TODO: Implement reset to defaults
    console.log("Resetting to default settings")
  }

  const emailNotificationGroups = [
    {
      title: "Account & Security",
      icon: Shield,
      items: [
        {
          id: "accountUpdates",
          label: "Account updates",
          description: "Get notified about changes to your account settings, profile, and login activity",
          value: notifications.email.accountUpdates,
        },
        {
          id: "securityAlerts",
          label: "Security alerts",
          description: "Important security notifications like password changes and new login attempts",
          value: notifications.email.securityAlerts,
        },
      ],
    },
    {
      title: "Product & Updates",
      icon: Bell,
      items: [
        {
          id: "productUpdates",
          label: "Product updates",
          description: "New features, improvements, and service announcements",
          value: notifications.email.productUpdates,
        },
        {
          id: "weeklyDigest",
          label: "Weekly digest",
          description: "Weekly summary of your activity and important updates",
          value: notifications.email.weeklyDigest,
        },
      ],
    },
    {
      title: "Marketing",
      icon: Mail,
      items: [
        {
          id: "marketing",
          label: "Marketing emails",
          description: "Special offers, promotions, and marketing communications",
          value: notifications.email.marketing,
        },
      ],
    },
  ]

  const pushNotificationGroups = [
    {
      title: "Real-time Notifications",
      icon: MessageSquare,
      items: [
        {
          id: "accountUpdates",
          label: "Account updates",
          description: "Get push notifications for important account changes",
          value: notifications.push.accountUpdates,
        },
        {
          id: "mentions",
          label: "Mentions",
          description: "When someone mentions you in a comment or message",
          value: notifications.push.mentions,
        },
        {
          id: "newMessages",
          label: "New messages",
          description: "When you receive a new direct message",
          value: notifications.push.newMessages,
        },
        {
          id: "projectUpdates",
          label: "Project updates",
          description: "Updates about projects you're working on",
          value: notifications.push.projectUpdates,
        },
      ],
    },
  ]

  const smsNotificationGroups = [
    {
      title: "Critical Alerts",
      icon: AlertCircle,
      items: [
        {
          id: "securityAlerts",
          label: "Security alerts",
          description: "Critical security notifications via SMS",
          value: notifications.sms.securityAlerts,
        },
        {
          id: "accountUpdates",
          label: "Account updates",
          description: "Important account changes via SMS",
          value: notifications.sms.accountUpdates,
        },
      ],
    },
  ]

  const handleToggle = (
    type: "email" | "push" | "sms",
    id: string
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: !(prev[type] as any)[id],
      },
    }))
  }

  const handleToggleMaster = (type: "email" | "push" | "sms", key: "enabled") => {
    setNotifications((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: !(prev[type] as any)[key],
      },
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Choose how you want to be notified about updates and events
        </p>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Status</CardTitle>
          <CardDescription>
            Overview of your current notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Email</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {
                  Object.values(notifications.email).filter(Boolean).length
                }{" "}
                of {Object.keys(notifications.email).length} enabled
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Push</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={notifications.push.enabled ? "secondary" : "outline"}>
                  {notifications.push.enabled ? "Active" : "Disabled"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {
                  Object.entries(notifications.push)
                    .filter(([key, value]) => key !== "enabled" && value)
                    .length
                }{" "}
                enabled
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">SMS</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={notifications.sms.enabled ? "secondary" : "outline"}>
                  {notifications.sms.enabled ? "Active" : "Disabled"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {
                  Object.entries(notifications.sms)
                    .filter(([key, value]) => key !== "enabled" && value)
                    .length
                }{" "}
                enabled
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage your email notification preferences
              </CardDescription>
            </div>
            <Badge variant="secondary">Enabled</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {emailNotificationGroups.map((group) => {
            const Icon = group.icon
            return (
              <div key={group.title}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">{group.title}</h3>
                </div>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-normal">
                            {item.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={item.value}
                          onChange={() => handleToggle("email", item.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                      <Separator className="mt-3" />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveEmailNotifications}>
            Save Email Preferences
          </Button>
        </CardFooter>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Receive notifications on your devices
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="push-toggle" className="text-sm">
                {notifications.push.enabled ? "Enabled" : "Disabled"}
              </Label>
              <input
                id="push-toggle"
                type="checkbox"
                checked={notifications.push.enabled}
                onChange={() => handleToggleMaster("push", "enabled")}
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>
          </div>
        </CardHeader>
        {notifications.push.enabled && (
          <CardContent className="space-y-6">
            {pushNotificationGroups.map((group) => {
              const Icon = group.icon
              return (
                <div key={group.title}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium">{group.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-normal">
                              {item.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={item.value}
                            onChange={() => handleToggle("push", item.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </div>
                        <Separator className="mt-3" />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </CardContent>
        )}
        <CardFooter>
          <Button
            onClick={handleSavePushNotifications}
            disabled={!notifications.push.enabled}
          >
            Save Push Preferences
          </Button>
        </CardFooter>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>
                Receive critical alerts via text message
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="sms-toggle" className="text-sm">
                {notifications.sms.enabled ? "Enabled" : "Disabled"}
              </Label>
              <input
                id="sms-toggle"
                type="checkbox"
                checked={notifications.sms.enabled}
                onChange={() => handleToggleMaster("sms", "enabled")}
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>
          </div>
        </CardHeader>
        {notifications.sms.enabled && (
          <CardContent className="space-y-6">
            {smsNotificationGroups.map((group) => {
              const Icon = group.icon
              return (
                <div key={group.title}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium">{group.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-normal">
                              {item.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={item.value}
                            onChange={() => handleToggle("sms", item.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </div>
                        <Separator className="mt-3" />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </CardContent>
        )}
        <CardFooter>
          <div className="flex items-center gap-4 w-full">
            <Button
              onClick={handleSaveSmsNotifications}
              disabled={!notifications.sms.enabled}
            >
              Save SMS Preferences
            </Button>
            <p className="text-xs text-muted-foreground">
              SMS notifications may incur carrier charges
            </p>
          </div>
        </CardFooter>
      </Card>

      {/* Reset to Defaults */}
      <Card>
        <CardHeader>
          <CardTitle>Reset Preferences</CardTitle>
          <CardDescription>
            Reset all notification settings to their default values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleResetToDefaults}>
            Reset to Default Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}