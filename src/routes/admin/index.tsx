import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Users,
  TrendingUp,
  CreditCard,
  Activity,
  DollarSign,
  UserPlus,
  ArrowUpRight,
} from "lucide-react"

// TODO: Add role check to ensure only admins can access
// import { useAuth } from '~/hooks/useAuth'

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
})

function AdminDashboard() {
  // TODO: Fetch real analytics from Convex
  const analytics = {
    totalUsers: 2847,
    totalRevenue: 145280,
    activeSubscriptions: 2156,
    newUsersThisMonth: 342,
    revenueGrowth: 12.5,
    userGrowth: 8.3,
    subscriptionGrowth: 5.7,
  }

  const stats = [
    {
      name: "Total Users",
      value: analytics.totalUsers.toLocaleString(),
      change: `+${analytics.userGrowth}%`,
      changeType: "positive" as const,
      icon: Users,
    },
    {
      name: "Revenue",
      value: `$${(analytics.totalRevenue / 1000).toFixed(1)}K`,
      change: `+${analytics.revenueGrowth}%`,
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      name: "Active Subscriptions",
      value: analytics.activeSubscriptions.toLocaleString(),
      change: `+${analytics.subscriptionGrowth}%`,
      changeType: "positive" as const,
      icon: CreditCard,
    },
    {
      name: "New Users (30d)",
      value: analytics.newUsersThisMonth.toLocaleString(),
      change: "+12.3%",
      changeType: "positive" as const,
      icon: UserPlus,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "user_signup",
      description: "New user registered",
      user: "alice@example.com",
      time: "2 minutes ago",
      icon: Users,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      id: 2,
      type: "subscription",
      description: "User upgraded to Pro",
      user: "bob@example.com",
      time: "15 minutes ago",
      icon: TrendingUp,
      color: "bg-green-500/10 text-green-500",
    },
    {
      id: 3,
      type: "payment",
      description: "Payment received",
      user: "charlie@example.com",
      time: "1 hour ago",
      icon: DollarSign,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      id: 4,
      type: "subscription",
      description: "Subscription canceled",
      user: "diana@example.com",
      time: "2 hours ago",
      icon: CreditCard,
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      id: 5,
      type: "admin_action",
      description: "Admin action: user_upgrade",
      user: "admin@platform.com",
      time: "3 hours ago",
      icon: Activity,
      color: "bg-purple-500/10 text-purple-500",
    },
  ]

  const topPlans = [
    { name: "Free", users: 1247, percentage: 43.8 },
    { name: "Premium", users: 987, percentage: 34.7 },
    { name: "Pro", users: 613, percentage: 21.5 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your platform's performance and key metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            System Healthy
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                  from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Subscription Plans Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans Distribution</CardTitle>
          <CardDescription>
            Breakdown of users by subscription tier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPlans.map((plan) => (
              <div key={plan.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{plan.name}</div>
                  <Badge variant="secondary">{plan.users} users</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    {plan.percentage}%
                  </div>
                  <div className="w-32 bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${plan.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  All Activity
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Users
                </TabsTrigger>
                <TabsTrigger
                  value="subscriptions"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Subscriptions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon
                    return (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.color}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{activity.user}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
              <TabsContent value="users" className="p-6">
                <div className="space-y-4">
                  {recentActivities
                    .filter((a) => a.type === "user_signup")
                    .map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start gap-4">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.color}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{activity.user}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </TabsContent>
              <TabsContent value="subscriptions" className="p-6">
                <div className="space-y-4">
                  {recentActivities
                    .filter((a) => a.type === "subscription")
                    .map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start gap-4">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.color}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{activity.user}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}