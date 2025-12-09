import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Progress } from "~/components/ui/progress"
import {
  BarChart3,
  Users,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Zap,
} from "lucide-react"

// TODO: Add authentication check
// import { useAuth } from '~/hooks/useAuth'

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
})

function DashboardIndex() {
  // TODO: Replace with actual data from Convex
  const currentPlan = "Premium"
  const planPrice = "50K"
  const nextBillingDate = "Jan 15, 2025"
  const usagePercentage = 65

  const stats = [
    {
      name: "Active Users",
      value: "2,847",
      change: "+12.3%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      name: "Revenue",
      value: "145.2K",
      change: "+8.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      name: "Conversion Rate",
      value: "4.8%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: BarChart3,
    },
  ]

  const quickActions = [
    {
      name: "Upgrade Plan",
      description: "Unlock more features",
      href: "/dashboard/billing",
      icon: CreditCard,
      color: "bg-blue-500",
    },
    {
      name: "Add Team Member",
      description: "Invite collaborators",
      href: "/dashboard/profile",
      icon: Users,
      color: "bg-green-500",
    },
    {
      name: "API Access",
      description: "Manage API keys",
      href: "/dashboard/profile",
      icon: Zap,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your account.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            All systems operational
          </Badge>
        </div>
      </div>

      {/* Subscription Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Overview</CardTitle>
          <CardDescription>
            Manage your current plan and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Current Plan
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{currentPlan}</p>
                <Badge variant="default">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {planPrice} monthly • Next billing: {nextBillingDate}
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm font-medium">Usage</p>
              <div className="flex items-center gap-2">
                <Progress value={usagePercentage} className="w-32" />
                <span className="text-sm font-medium">{usagePercentage}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                650 of 1,000 credits used
              </p>
            </div>
            <Link to="/dashboard/billing">
              <Button variant="outline">Manage Billing</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.name} to={action.href}>
                <Card className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-lg ${action.color} text-white`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base">
                          {action.name}
                        </CardTitle>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="activity"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="api"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  API Usage
                </TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New team member added
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                      <CreditCard className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Payment successful
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Yesterday
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
                      <Zap className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        API key created
                      </p>
                      <p className="text-xs text-muted-foreground">
                        3 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="api" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Requests (Last 24 hours)
                      </p>
                      <p className="text-2xl font-bold">12,847</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Success Rate
                      </span>
                      <span className="font-medium">99.9%</span>
                    </div>
                    <Progress value={99.9} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}