import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Header } from "~/components/layout/header"
import { Footer } from "~/components/layout/footer"

export const Route = createFileRoute("/")({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Your SaaS Faster
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A production-ready boilerplate with authentication, billing, and admin panel. Built with TanStack and Convex.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg">Get Started Free</Button>
              </Link>
              <Button size="lg" variant="outline">View Demo</Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Authentication"
                description="Complete auth system with email verification and password reset"
              />
              <FeatureCard
                title="Billing"
                description="Subscription management with Mayar payment integration"
              />
              <FeatureCard
                title="Admin Panel"
                description="User management and analytics dashboard for admins"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                name="Free"
                price="$0"
                period="/month"
                features={["Basic features", "1 project", "Community support"]}
                cta="Get Started"
                variant="outline"
              />
              <PricingCard
                name="Premium"
                price="50K"
                period="/month"
                features={["Everything in Free", "10 projects", "Priority support"]}
                cta="Upgrade"
                popular
              />
              <PricingCard
                name="Pro"
                price="150K"
                period="/month"
                features={["Everything in Premium", "Unlimited projects", "API access"]}
                cta="Upgrade"
                variant="outline"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers building with our boilerplate
            </p>
            <Link to="/auth/register">
              <Button size="lg" variant="secondary">
                Start Building Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  popular,
  variant,
}: {
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  popular?: boolean
  variant?: "default" | "outline"
}) {
  return (
    <Card className={popular ? "border-primary" : ""}>
      {popular && (
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium rounded-t-lg">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Link to="/auth/register" className="block">
          <Button className="w-full" variant={variant as any}>
            {cta}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}