import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Progress } from "~/components/ui/progress"
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

// TODO: Add authentication check
// import { useAuth } from '~/hooks/useAuth'

export const Route = createFileRoute("/dashboard/billing/")({
  component: DashboardBilling,
})

function DashboardBilling() {
  // TODO: Replace with actual data from Convex
  const currentPlan = "Premium"
  const nextBillingDate = "Jan 15, 2025"
  const planPrice = "50K"
  const usagePercentage = 65

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "month",
      description: "Perfect for getting started",
      features: [
        "Basic features",
        "1 project",
        "Community support",
        "1,000 API requests/month",
      ],
      buttonText: "Current Plan",
      popular: false,
    },
    {
      name: "Premium",
      price: "50K",
      period: "month",
      description: "Best for growing teams",
      features: [
        "Everything in Free",
        "10 projects",
        "Priority support",
        "100,000 API requests/month",
        "Advanced analytics",
        "Team collaboration",
      ],
      buttonText: "Current Plan",
      popular: true,
    },
    {
      name: "Pro",
      price: "150K",
      period: "month",
      description: "For power users and businesses",
      features: [
        "Everything in Premium",
        "Unlimited projects",
        "Dedicated support",
        "Unlimited API requests",
        "Advanced integrations",
        "SLA guarantee",
      ],
      buttonText: "Upgrade",
      popular: false,
    },
  ]

  const invoices = [
    {
      id: "INV-001",
      date: "Dec 15, 2024",
      amount: "50K",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-002",
      date: "Nov 15, 2024",
      amount: "50K",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-003",
      date: "Oct 15, 2024",
      amount: "50K",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-004",
      date: "Sep 15, 2024",
      amount: "50K",
      status: "paid",
      downloadUrl: "#",
    },
  ]

  const paymentMethods = [
    {
      id: "pm_001",
      type: "Visa ending in 4242",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: "pm_002",
      type: "Mastercard ending in 8888",
      expiry: "08/25",
      isDefault: false,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment methods
          </p>
        </div>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Your subscription details and usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Plan</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{currentPlan}</p>
                <Badge variant="default">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {planPrice} monthly
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm font-medium">Usage this month</p>
              <div className="flex items-center gap-2">
                <Progress value={usagePercentage} className="w-32" />
                <span className="text-sm font-medium">{usagePercentage}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                650 of 1,000 credits used
              </p>
            </div>
            <div className="space-y-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="ghost">Cancel Subscription</Button>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">Next billing date</p>
              <p className="text-sm text-muted-foreground">
                {nextBillingDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Tabs */}
      <Tabs defaultValue="plans" className="w-full">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.popular ? "border-primary shadow-md" : ""}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      {plan.price === "0" ? "Free" : plan.price}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-muted-foreground">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    disabled={plan.name === currentPlan}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Download your past invoices and receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(invoice.status)}
                      <div>
                        <p className="text-sm font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusVariant(invoice.status) as any}>
                        {invoice.status}
                      </Badge>
                      <p className="text-sm font-medium">{invoice.amount}</p>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your saved payment methods
                </CardDescription>
              </div>
              <Button>Add Payment Method</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{method.type}</p>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expiry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}