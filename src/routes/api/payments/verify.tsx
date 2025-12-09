import * as React from "react"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Alert, AlertDescription } from "~/components/ui/alert"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

// Import the Convex client
import { useConvex } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const Route = createFileRoute("/api/payments/verify")({
  component: PaymentVerificationPage,
})

function PaymentVerificationPage() {
  const router = useRouter()
  const convex = useConvex()
  const [verificationStatus, setVerificationStatus] = React.useState<"pending" | "success" | "failed">("pending")
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  // Get URL search params
  const searchParams = new URLSearchParams(window.location.search)
  const transactionId = searchParams.get("transaction_id")
  const mayarInvoiceId = searchParams.get("invoice_id") || searchParams.get("mayar_invoice_id")
  const paymentId = searchParams.get("payment_id")

  // Verify payment mutation
  const verifyPaymentMutation = useMutation({
    mutationFn: async () => {
      if (!transactionId && !mayarInvoiceId) {
        throw new Error("Missing transaction ID or Mayar invoice ID")
      }

      try {
        if (transactionId) {
          // Verify using transaction ID
          const result = await convex.mutation(api.paymentTransactions.verifyPayment, {
            transactionId: transactionId as any, // Type assertion for ID
          })
          return result
        } else if (mayarInvoiceId) {
          // Verify using Mayar invoice ID (callback mode)
          const result = await convex.mutation(api.paymentTransactions.verifyPaymentFromCallback, {
            mayarInvoiceId: mayarInvoiceId,
          })
          return result
        } else {
          throw new Error("No valid identifier provided")
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        throw error
      }
    },
    onSuccess: (result) => {
      console.log("Payment verification result:", result)
      if (result.success) {
        setVerificationStatus("success")
      } else {
        setVerificationStatus("failed")
        setErrorMessage(result.message || "Payment verification failed")
      }
    },
    onError: (error) => {
      console.error("Payment verification failed:", error)
      setVerificationStatus("failed")
      setErrorMessage(error instanceof Error ? error.message : "An error occurred during verification")
    },
  })

  // Auto-verify on mount
  React.useEffect(() => {
    if (transactionId || mayarInvoiceId) {
      verifyPaymentMutation.mutate()
    } else {
      setErrorMessage("No transaction or payment ID found in the URL")
      setVerificationStatus("failed")
    }
  }, [transactionId, mayarInvoiceId])

  const handleReturnToDashboard = () => {
    router.navigate({ to: "/dashboard/billing" })
  }

  const handleReturnToSettings = () => {
    router.navigate({ to: "/settings/account", search: { tab: "billing" } })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {verificationStatus === "pending" && (
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
            )}
            {verificationStatus === "success" && (
              <CheckCircle className="h-16 w-16 text-green-500" />
            )}
            {verificationStatus === "failed" && (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {verificationStatus === "pending" && "Verifying Payment..."}
            {verificationStatus === "success" && "Payment Successful!"}
            {verificationStatus === "failed" && "Payment Verification Failed"}
          </CardTitle>
          <CardDescription>
            {verificationStatus === "pending" &&
              "Please wait while we verify your payment with Mayar..."}
            {verificationStatus === "success" &&
              "Your payment has been confirmed and your subscription is now active."}
            {verificationStatus === "failed" &&
              "We encountered an issue while verifying your payment."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error Message */}
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Success Details */}
          {verificationStatus === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-green-900">What's Next?</h3>
              <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                <li>Your subscription is now active</li>
                <li>You can access all premium features immediately</li>
                <li>A confirmation email has been sent to your email address</li>
                <li>You can manage your subscription from your account settings</li>
              </ul>
            </div>
          )}

          {/* Failed Details */}
          {verificationStatus === "failed" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-red-900">What Can You Do?</h3>
              <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                <li>Try the payment process again</li>
                <li>Check your email for payment confirmation</li>
                <li>Contact support if you were charged but verification failed</li>
                <li>Ensure your payment method has sufficient funds</li>
              </ul>
            </div>
          )}

          {/* Transaction Details */}
          {(transactionId || mayarInvoiceId) && (
            <div className="bg-muted rounded-lg p-4 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span className="font-mono">{transactionId}</span>
              </div>
              {mayarInvoiceId && (
                <div className="flex justify-between">
                  <span className="font-medium">Mayar Invoice ID:</span>
                  <span className="font-mono">{mayarInvoiceId}</span>
                </div>
              )}
              {paymentId && (
                <div className="flex justify-between">
                  <span className="font-medium">Payment ID:</span>
                  <span className="font-mono">{paymentId}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleReturnToDashboard}
              className="flex-1"
              variant={verificationStatus === "success" ? "default" : "outline"}
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={handleReturnToSettings}
              className="flex-1"
              variant="outline"
            >
              Account Settings
            </Button>
          </div>

          {/* Manual Refresh Button */}
          {verificationStatus === "failed" && (
            <Button
              onClick={() => verifyPaymentMutation.mutate()}
              variant="ghost"
              className="w-full"
              disabled={verifyPaymentMutation.isPending}
            >
              {verifyPaymentMutation.isPending ? "Retrying..." : "Retry Verification"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentVerificationPage