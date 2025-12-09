import type { MayarInvoice, MayarInvoiceResponse, MayarTransactionResponse } from "./_types/mayar"

const MAYAR_API_URL = "https://api.mayar.id"

/**
 * Create a Mayar invoice for payment
 */
export async function createInvoice(
  _ctx: any,
  args: {
    name: string
    email: string
    mobile?: string
    description: string
    amount: number
    currency?: string
    transactionId: string
    redirectUrl: string
  }
): Promise<MayarInvoiceResponse> {
  const MAYAR_API_KEY = (globalThis as any).MAYAR_API_KEY || ""

  if (!MAYAR_API_KEY) {
    console.warn("MAYAR_API_KEY is not set. Mayar payment integration will not work properly.")
  }

  try {
    const {
      name,
      email,
      mobile,
      description,
      amount,
      currency = "IDR",
      transactionId,
      redirectUrl,
    } = args

    // Create invoice payload according to Mayar API
    const invoicePayload: MayarInvoice = {
      customer_name: name,
      customer_email: email,
      customer_mobile: mobile || "",
      description: description,
      amount: amount,
      currency: currency,
      // Add callback URL for payment verification
      callback_url: `${redirectUrl}?transaction_id=${transactionId}`,
      // Redirect URL after payment completion
      redirect_url: `${redirectUrl}?transaction_id=${transactionId}`,
      // Metadata to track our transaction
      metadata: {
        transactionId: transactionId,
        plan: description.toLowerCase(),
      },
    }

    console.log("Creating Mayar invoice:", JSON.stringify(invoicePayload, null, 2))

    const response = await fetch(`${MAYAR_API_URL}/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAYAR_API_KEY}`,
      },
      body: JSON.stringify(invoicePayload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Mayar API error:", response.status, errorText)
      throw new Error(`Failed to create Mayar invoice: ${response.status} ${errorText}`)
    }

    const data: MayarInvoiceResponse = await response.json()

    if (!data.success || !data.data?.payment_url) {
      throw new Error("Invalid response from Mayar API")
    }

    console.log("Mayar invoice created successfully:", data)
    return data
  } catch (error) {
    console.error("Error creating Mayar invoice:", error)
    throw error
  }
}

/**
 * Verify payment status with Mayar API
 */
export async function verifyPayment(
  _ctx: any,
  args: {
    mayarTransactionId: string
  }
): Promise<MayarTransactionResponse> {
  const MAYAR_API_KEY = (globalThis as any).MAYAR_API_KEY || ""

  if (!MAYAR_API_KEY) {
    console.warn("MAYAR_API_KEY is not set. Mayar payment integration will not work properly.")
  }

  try {
    const { mayarTransactionId } = args

    console.log("Verifying payment with Mayar:", mayarTransactionId)

    const response = await fetch(`${MAYAR_API_URL}/transactions/${mayarTransactionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Mayar API error:", response.status, errorText)
      throw new Error(`Failed to verify payment: ${response.status} ${errorText}`)
    }

    const data: MayarTransactionResponse = await response.json()

    if (!data.success) {
      throw new Error("Invalid response from Mayar API")
    }

    console.log("Payment verification result:", data)
    return data
  } catch (error) {
    console.error("Error verifying payment:", error)
    throw error
  }
}

/**
 * Get transaction status from Mayar
 */
export async function getTransactionStatus(
  _ctx: any,
  args: {
    mayarInvoiceId?: string
    mayarTransactionId?: string
  }
): Promise<MayarTransactionResponse> {
  const MAYAR_API_KEY = (globalThis as any).MAYAR_API_KEY || ""

  if (!MAYAR_API_KEY) {
    console.warn("MAYAR_API_KEY is not set. Mayar payment integration will not work properly.")
  }

  try {
    const { mayarInvoiceId, mayarTransactionId } = args

    let url = ""
    if (mayarTransactionId) {
      url = `${MAYAR_API_URL}/transactions/${mayarTransactionId}`
    } else if (mayarInvoiceId) {
      url = `${MAYAR_API_URL}/invoices/${mayarInvoiceId}`
    } else {
      throw new Error("Either mayarTransactionId or mayarInvoiceId is required")
    }

    console.log("Getting transaction status:", url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Mayar API error:", response.status, errorText)
      throw new Error(`Failed to get transaction status: ${response.status} ${errorText}`)
    }

    const data: MayarTransactionResponse = await response.json()

    if (!data.success) {
      throw new Error("Invalid response from Mayar API")
    }

    console.log("Transaction status:", data)
    return data
  } catch (error) {
    console.error("Error getting transaction status:", error)
    throw error
  }
}

/**
 * Check if payment is successful based on Mayar transaction data
 */
export function isPaymentSuccessful(mayarData: MayarTransactionResponse): boolean {
  if (!mayarData.success || !mayarData.data) {
    return false
  }

  // Mayar typically uses status fields like 'paid', 'completed', 'success', etc.
  const status = mayarData.data.status?.toLowerCase()
  return status === "paid" || status === "completed" || status === "success"
}

/**
 * Send email using Resend
 */
export async function sendEmail(
  _ctx: any,
  args: {
    to: string
    subject: string
    html: string
    from?: string
  }
) {
  const RESEND_API_KEY = (globalThis as any).RESEND_API_KEY || (globalThis as any).VITE_RESEND_API_KEY || ""

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Cannot send email.")
    return null
  }

  try {
    const { to, subject, html, from = "noreply@yourapp.com" } = args

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Resend API error:", response.status, errorText)
      throw new Error(`Failed to send email: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log("Email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}