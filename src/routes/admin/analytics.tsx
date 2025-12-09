import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Badge } from "~/components/ui/badge"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
} from "lucide-react"

// TODO: Add role check to ensure only admins can access
// import { useAuth } from '~/hooks/useAuth'

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalytics,
})

function AdminAnalytics() {
  // TODO: Fetch real analytics from Convex
  // Mock data - replace with actual data from API
  const revenueData = [
    { month: "Jan", revenue: 45000, subscriptions: 180 },
    { month: "Feb", revenue: 52000, subscriptions: 210 },
    { month: "Mar", revenue: 48000, subscriptions: 195 },
    { month: "Apr", revenue: 61000, subscriptions: 245 },
    { month: "May", revenue: 55000, subscriptions: 220 },
    { month: "Jun", revenue: 67000, subscriptions: 268 },
    { month: "Jul", revenue: 73000, subscriptions: 292 },
    { month: "Aug", revenue: 69000, subscriptions: 276 },
    { month: "Sep", revenue: 78000, subscriptions: 312 },
    { month: "Oct", revenue: 82000, subscriptions: 328 },
    { month: "Nov", revenue: 89000, subscriptions: 356 },
    { month: "Dec", revenue: 95000, subscriptions: 380 },
  ]

  const userGrowthData = [
    { month: "Jan", users: 1200, newUsers: 145 },
    { month: "Feb", users: 1345, newUsers: 168 },
    { month: "Mar", users: 1513, newUsers: 189 },
    { month: "Apr", users: 1702, newUsers: 215 },
    { month: "May", users: 1917, newUsers: 198 },
    { month: "Jun", users: 2115, newUsers: 234 },
    { month: "Jul", users: 2349, newUsers: 267 },
    { month: "Aug", users: 2616, newUsers: 289 },
    { month: "Sep", users: 2905, newUsers: 312 },
    { month: "Oct", users: 3217, newUsers: 334 },
    { month: "Nov", users: 3551, newUsers: 356 },
    { month: "Dec", users: 3907, newUsers: 378 },
  ]

  const subscriptionMetrics = [
    { name: "Free", value: 1247, color: "#94a3b8" },
    { name: "Premium", value: 987, color: "#3b82f6" },
    { name: "Pro", value: 613, color: "#8b5cf6" },
  ]

  const churnData = [
    { month: "Jan", churnRate: 2.4, retention: 97.6 },
    { month: "Feb", churnRate: 2.1, retention: 97.9 },
    { month: "Mar", churnRate: 2.8, retention: 97.2 },
    { month: "Apr", churnRate: 2.3, retention: 97.7 },
    { month: "May", churnRate: 1.9, retention: 98.1 },
    { month: "Jun", churnRate: 2.5, retention: 97.5 },
    { month: "Jul", churnRate: 2.2, retention: 97.8 },
    { month: "Aug", churnRate: 2.0, retention: 98.0 },
    { month: "Sep", churnRate: 1.8, retention: 98.2 },
    { month: "Oct", churnRate: 2.1, retention: 97.9 },
    { month: "Nov", churnRate: 1.9, retention: 98.1 },
    { month: "Dec", churnRate: 1.7, retention: 98.3 },
  ]

  const mrrData = [
    { month: "Jan", mrr: 32000 },
    { month: "Feb", mrr: 38000 },
    { month: "Mar", mrr: 35000 },
    { month: "Apr", mrr: 45000 },
    { month: "May", mrr: 41000 },
    { month: "Jun", mrr: 51000 },
    { month: "Jul", mrr: 58000 },
    { month: "Aug", mrr: 54000 },
    { month: "Sep", mrr: 62000 },
    { month: "Oct", mrr: 67000 },
    { month: "Nov", mrr: 74000 },
    { month: "Dec", mrr: 81000 },
  ]

  const currentStats = {
    totalRevenue: 824000,
    totalUsers: 3907,
    activeSubscriptions: 2847,
    monthlyGrowth: 12.5,
    churnRate: 1.7,
    mrr: 81000,
    arpu: 28.45,
  }

  const topStats = [
    {
      name: "Total Revenue",
      value: `$${(currentStats.totalRevenue / 1000).toFixed(0)}K`,
      change: `+${currentStats.monthlyGrowth}%`,
      trend: "up",
      icon: DollarSign,
      description: "Last 12 months",
    },
    {
      name: "Total Users",
      value: currentStats.totalUsers.toLocaleString(),
      change: `+${((userGrowthData[11].newUsers / userGrowthData[10].users) * 100).toFixed(1)}%`,
      trend: "up",
      icon: Users,
      description: "Active users",
    },
    {
      name: "MRR",
      value: `$${(currentStats.mrr / 1000).toFixed(1)}K`,
      change: `+${currentStats.monthlyGrowth}%`,
      trend: "up",
      icon: TrendingUp,
      description: "Monthly Recurring Revenue",
    },
    {
      name: "Churn Rate",
      value: `${currentStats.churnRate}%`,
      change: "-0.4%",
      trend: "down",
      icon: Activity,
      description: "Monthly churn",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into your platform's performance and growth.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {topStats.map((stat) => {
          const Icon = stat.icon
          const isPositive = stat.trend === "up"
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div
                    className={`flex items-center gap-1 ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Monthly revenue for the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                      labelClassName="text-foreground"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Recurring Revenue</CardTitle>
                <CardDescription>MRR growth trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mrrData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, "MRR"]}
                      labelClassName="text-foreground"
                    />
                    <Line
                      type="monotone"
                      dataKey="mrr"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: "#8b5cf6", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue & Subscriptions</CardTitle>
              <CardDescription>Correlation between revenue and new subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "revenue" ? `$${value.toLocaleString()}` : value,
                      name === "revenue" ? "Revenue" : "New Subscriptions",
                    ]}
                    labelClassName="text-foreground"
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar yAxisId="right" dataKey="subscriptions" fill="#10b981" name="Subscriptions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Total users and new user signups over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    formatter={(value, name) => [
                      value.toLocaleString(),
                      name === "users" ? "Total Users" : "New Users",
                    ]}
                    labelClassName="text-foreground"
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="newUsers"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>Users by subscription tier</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subscriptionMetrics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) => `${entry.name}: ${entry.value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subscriptionMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value.toLocaleString(), "Users"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ARPU</CardTitle>
                <CardDescription>Average Revenue Per User</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">${currentStats.arpu}</div>
                  <p className="text-sm text-muted-foreground mt-2">per user per month</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Badge variant="outline" className="gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      +5.2% from last month
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retention & Churn</CardTitle>
              <CardDescription>Monthly retention and churn rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={churnData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" domain={[0, 100]} />
                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name === "churnRate" ? "Churn Rate" : "Retention Rate"]}
                    labelClassName="text-foreground"
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 4 }}
                    name="Retention Rate"
                  />
                  <Line
                    type="monotone"
                    dataKey="churnRate"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", r: 4 }}
                    name="Churn Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}