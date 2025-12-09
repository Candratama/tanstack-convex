import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { createInvoice, verifyPayment as mayarVerifyPayment, isPaymentSuccessful, sendEmail } from "./mayar"

const PLANS = {
  premium: { amount: 50000 },
  pro: { amount: 150000 },
}

export const createPaymentTransaction = mutation({
  args: {
    plan: v.union(v.literal("premium"), v.literal("pro")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error("Unauthorized")

    // Get user details from database
    const userDoc = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", user.email!))
      .first()
    if (!userDoc) throw new Error("User not found")

    const now = new Date().toISOString()

    // Create payment transaction in database
    const paymentTransactionId = await ctx.db.insert("paymentTransactions", {
      userId: user._id,
      amount: PLANS[args.plan].amount,
      currency: "IDR",
      plan: args.plan,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    })

    // Generate redirect URL for after payment
    const appUrl = process.env.VITE_APP_URL || "http://localhost:5173"
    const redirectUrl = `${appUrl}/settings/account?tab=billing&transaction_id=${paymentTransactionId}`

    // Create Mayar invoice
    const mayarInvoice = await createInvoice(ctx, {
      name: userDoc.name,
      email: userDoc.email,
      description: args.plan.toUpperCase(),
      amount: PLANS[args.plan].amount,
      currency: "IDR",
      transactionId: paymentTransactionId,
      redirectUrl,
    })

    // Update transaction with Mayar invoice ID
    await ctx.db.patch(paymentTransactionId, {
      mayarInvoiceId: mayarInvoice.data?.id,
      updatedAt: new Date().toISOString(),
    })

    // Return payment URL for redirect
    return {
      transactionId: paymentTransactionId,
      paymentUrl: mayarInvoice.data?.payment_url,
    }
  },
})

export const getMyTransactions = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error("Unauthorized")

    return await ctx.db
      .query("paymentTransactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect()
  },
})

export const verifyPayment = mutation({
  args: {
    transactionId: v.id("paymentTransactions"),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId)
    if (!transaction) throw new Error("Transaction not found")

    // If already completed, return early
    if (transaction.status === "completed") {
      return {
        success: true,
        message: "Payment already verified",
        transaction,
      }
    }

    // Get user details
    const userDoc = await ctx.db.get(transaction.userId)
    if (!userDoc) throw new Error("User not found")

    // Type assertion - we know this is a user document
    const user = userDoc as any

    // Use Mayar invoice ID or transaction ID to verify
    const mayarId = transaction.mayarTransactionId || transaction.mayarInvoiceId
    if (!mayarId) {
      throw new Error("Mayar transaction/invoice ID not found")
    }

    // Verify payment with Mayar
    const verificationResult = await mayarVerifyPayment(ctx, {
      mayarTransactionId: mayarId,
    })

    const isSuccess = isPaymentSuccessful(verificationResult)

    // Update transaction status
    await ctx.db.patch(transaction._id, {
      status: isSuccess ? "completed" : "failed",
      mayarTransactionId: mayarId,
      updatedAt: new Date().toISOString(),
    })

    if (isSuccess) {
      // Update or create subscription
      const existingSubscription = await ctx.db
        .query("subscriptions")
        .withIndex("by_user", (q) => q.eq("userId", transaction.userId))
        .first()

      const now = new Date().toISOString()

      if (existingSubscription) {
        await ctx.db.patch(existingSubscription._id, {
          plan: transaction.plan,
          status: "active",
          startedAt: existingSubscription.startedAt || now,
          updatedAt: now,
        })
      } else {
        // Calculate subscription end date (30 days from now)
        const currentDate = new Date()
        const endDate = new Date(currentDate)
        endDate.setDate(endDate.getDate() + 30)

        await ctx.db.insert("subscriptions", {
          userId: transaction.userId,
          plan: transaction.plan,
          status: "active",
          startedAt: now,
          currentPeriodEnd: endDate.toISOString(),
          cancelAtPeriodEnd: false,
          updatedAt: now,
        })
      }

      // Send success email
      try {
        await sendEmail(ctx, {
          to: user.email,
          subject: `Payment Successful - ${transaction.plan.toUpperCase()} Plan`,
          html: `
            <h2>Payment Confirmation</h2>
            <p>Dear ${user.name},</p>
            <p>Thank you for your payment! Your ${transaction.plan.toUpperCase()} plan subscription is now active.</p>
            <p><strong>Transaction Details:</strong></p>
            <ul>
              <li>Plan: ${transaction.plan.toUpperCase()}</li>
              <li>Amount: ${transaction.amount.toLocaleString("id-ID")} ${transaction.currency}</li>
              <li>Transaction ID: ${transaction._id}</li>
              <li>Mayar ID: ${mayarId}</li>
            </ul>
            <p>You can access all premium features now.</p>
            <p>Best regards,<br/>The Team</p>
          `,
        })
      } catch (emailError) {
        console.error("Failed to send success email:", emailError)
        // Don't fail the entire process if email fails
      }
    } else {
      // Send failure email
      try {
        await sendEmail(ctx, {
          to: user.email,
          subject: `Payment Failed - ${transaction.plan.toUpperCase()} Plan`,
          html: `
            <h2>Payment Failed</h2>
            <p>Dear ${user.name},</p>
            <p>We were unable to process your payment for the ${transaction.plan.toUpperCase()} plan.</p>
            <p><strong>Transaction Details:</strong></p>
            <ul>
              <li>Plan: ${transaction.plan.toUpperCase()}</li>
              <li>Amount: ${transaction.amount.toLocaleString("id-ID")} ${transaction.currency}</li>
              <li>Transaction ID: ${transaction._id}</li>
              <li>Mayar ID: ${mayarId}</li>
            </ul>
            <p>Please try again or contact support if you need assistance.</p>
            <p>Best regards,<br/>The Team</p>
          `,
        })
      } catch (emailError) {
        console.error("Failed to send failure email:", emailError)
      }
    }

    return {
      success: isSuccess,
      message: isSuccess ? "Payment verified successfully" : "Payment verification failed",
      status: isSuccess ? "completed" : "failed",
    }
  },
})

/**
 * Alternative verification method using Mayar callback
 */
export const verifyPaymentFromCallback = mutation({
  args: {
    mayarInvoiceId: v.string(),
  },
  handler: async (ctx, args) => {
    // Find transaction by Mayar invoice ID
    const transaction = await ctx.db
      .query("paymentTransactions")
      .withIndex("by_mayar_transaction", (q) => q.eq("mayarInvoiceId", args.mayarInvoiceId))
      .first()

    if (!transaction) {
      throw new Error("Transaction not found")
    }

    // Use the existing verifyPayment function
    const result = await verifyPayment(ctx, {
      transactionId: transaction._id,
    })

    return result
  },
})