import * as React from "react"

interface PaymentSuccessEmailProps {
  name: string
  email: string
  plan: "premium" | "pro"
  amount: number
  currency: string
  transactionId: string
  mayarId: string
  appUrl?: string
}

export function PaymentSuccessEmail({
  name,
  email,
  plan,
  amount,
  currency,
  transactionId,
  mayarId,
  appUrl = "http://localhost:5173",
}: PaymentSuccessEmailProps) {
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
        <h1 style={{ color: "#10b981", fontSize: "28px", margin: "0" }}>
          Payment Successful!
        </h1>
      </div>

      <div
        style={{
          backgroundColor: "#f0fdf4",
          border: "2px solid #10b981",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "16px", margin: "0 0 10px 0" }}>
          Dear <strong>{name}</strong>,
        </p>
        <p style={{ fontSize: "16px", margin: "0" }}>
          Thank you for your payment! Your {planDisplay} plan subscription is now
          active.
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
          backgroundColor: "#eff6ff",
          border: "1px solid #3b82f6",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "18px", margin: "0 0 10px 0", color: "#1e40af" }}>
          What's Next?
        </h3>
        <ul style={{ margin: "0", paddingLeft: "20px" }}>
          <li>Your subscription is now active and you have full access to all features.</li>
          <li>You can manage your subscription from your account settings.</li>
          <li>You will receive a renewal reminder before your subscription expires.</li>
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
          }}
        >
          Access Your Account
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

export const paymentSuccessEmailSubject = (plan: string) =>
  `Payment Successful - ${plan.toUpperCase()} Plan`

export function renderPaymentSuccessEmail(props: PaymentSuccessEmailProps) {
  return <PaymentSuccessEmail {...props} />
}