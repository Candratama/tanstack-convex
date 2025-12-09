import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export function VerifyEmailForm({ email }: { email?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleResendVerification = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement resend verification
      console.log("Resend verification")
    } catch (error) {
      console.error("Failed to resend:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          We've sent a verification link to {email || "your email address"}. Please check your inbox and click the link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or request a new one.
        </p>
        <Button onClick={handleResendVerification} variant="outline" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Resend verification email"}
        </Button>
      </CardContent>
    </Card>
  )
}