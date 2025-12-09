import * as React from "react"

interface PaymentFailedEmailProps {
  name: string
  email: string
  plan: "premium" | "pro"
  amount: number
  currency: string
  transactionId: string
  mayarId: string
  appUrl?: string
}

export function PaymentFailedEmail({
  name,
  email,
  plan,
  amount,
  currency,
  transactionId,
  mayarId,
  appUrl = "http://localhost:5173",
}: PaymentFailedEmailProps) {
  const planDisplay = plan.toUpperCase()
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency || "IDR",
  }).format(amount)

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#ef4444", fontSize: "28px", margin: "0" }}>
          Payment Failed
        </h1>
      </div>

      <div
        style={{
          backgroundColor: "#fef2f2",
          border: "2px solid #ef4444",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "16px", margin: "0 0 10px 0" }}>
          Dear <strong>{name}</strong>,
        </p>
        <p style={{ fontSize: "16px", margin: "0" }}>
          We were unable to process your payment for the {planDisplay} plan.
          Your account remains on the free plan.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "20px", margin: "0 0 15px 0", color: "#1f2937" }}>
          Transaction Details
        </h2>
        <table style={{ width: "100%", borderSpacing: "0" }}>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "bold",
                }}
              >
                Plan:
              </td>
              <td style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
                {planDisplay}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "bold",
                }}
              >
                Amount:
              </td>
              <td style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
                {formattedAmount}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "bold",
                }}
              >
                Currency:
              </td>
              <td style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
                {currency}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "bold",
                }}
              >
                Transaction ID:
              </td>
              <td style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
                <code style={{ fontSize: "14px" }}>{transactionId}</code>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0", fontWeight: "bold" }}>
                Mayar Reference:
              </td>
              <td style={{ padding: "10px 0" }}>
                <code style={{ fontSize: "14px" }}>{mayarId}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          backgroundColor: "#fef3c7",
          border: "1px solid #f59e0b",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "18px", margin: "0 0 10px 0", color: "#92400e" }}>
          What Happened?
        </h3>
        <p style={{ margin: "0", fontSize: "16px" }}>
          The payment could not be completed. This could be due to:
        </p>
        <ul style={{ margin: "10px 0 0 0", paddingLeft: "20px" }}>
          <li>Insufficient funds in your account</li>
          <li>Incorrect payment information</li>
          <li>Your bank or payment provider declined the transaction</li>
          <li>A technical issue with the payment processor</li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "#eff6ff",
          border: "1px solid #3b82f6",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "18px", margin: "0 0 10px 0", color: "#1e40af" }}>
          What Can You Do?
        </h3>
        <ul style={{ margin: "0", paddingLeft: "20px" }}>
          <li>Try again with a different payment method</li>
          <li>Contact your bank or payment provider to check if there are any issues</li>
          <li>Ensure your account has sufficient funds</li>
          <li>Contact our support team if you need assistance</li>
        </ul>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <a
          href={appUrl}
          style={{
            display: "inline-block",
            backgroundColor: "#3b82f6",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 30px",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          Try Again
        </a>
        <a
          href={`${appUrl}/support`}
          style={{
            display: "inline-block",
            backgroundColor: "#6b7280",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 30px",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Contact Support
        </a>
      </div>

      <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
          If you have any questions or need assistance, please don't hesitate to contact our
          support team.
        </p>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "10px 0 0 0" }}>
          Best regards,<br />
          <strong>The Team</strong>
        </p>
      </div>
    </div>
  )
}

export const paymentFailedEmailSubject = (plan: string) =>
  `Payment Failed - ${plan.toUpperCase()} Plan`

export function renderPaymentFailedEmail(props: PaymentFailedEmailProps) {
  return <PaymentFailedEmail {...props} />
}