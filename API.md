# API Documentation - TanStack Convex SaaS Boilerplate

This document provides comprehensive documentation for all API endpoints, database schema, and authentication flows in the TanStack Convex SaaS Boilerplate.

## 📚 Table of Contents

- [Overview](#-overview)
- [Database Schema](#-database-schema)
- [Authentication Flow](#-authentication-flow)
- [User Management API](#-user-management-api)
- [Subscription API](#-subscription-api)
- [Payment Transaction API](#-payment-transaction-api)
- [Admin API](#-admin-api)
- [Payment Integration](#-payment-integration)
- [Email Integration](#-email-integration)
- [Error Handling](#-error-handling)
- [Rate Limiting](#-rate-limiting)

---

## 📖 Overview

This application uses **Convex** as the backend platform, which provides:
- Real-time database with automatic consistency
- Type-safe queries and mutations
- Built-in authentication
- Automatic API generation
- Real-time subscriptions

All API functions are type-safe and automatically generate TypeScript types.

### API Structure

- **Queries** - Read-only functions that fetch data
- **Mutations** - Functions that modify data
- **Actions** - Side-effect functions (for external API calls)

All functions are documented with:
- Purpose and description
- Arguments schema
- Return type
- Usage examples
- Error conditions

---

## 🗄️ Database Schema

The application uses five main tables:

### 1. Users Table

Stores user account information.

```typescript
users: {
  _id: string              // Auto-generated unique ID
  email: string            // User email (unique)
  name: string             // User's full name
  role: "user" | "admin"   // User role
  emailVerified: boolean   // Email verification status
  profileImage?: string    // Optional profile image URL
  createdAt: string        // ISO 8601 timestamp
  updatedAt: string        // ISO 8601 timestamp
}
```

**Indexes:**
- `by_email` - Fast lookup by email
- `by_role` - Filter users by role (for admin queries)

**Example:**
```typescript
{
  _id: "k8x2m9n4p5q6r7s8t9u0v1",
  email: "user@example.com",
  name: "John Doe",
  role: "user",
  emailVerified: true,
  createdAt: "2025-12-09T10:00:00.000Z",
  updatedAt: "2025-12-10T15:30:00.000Z"
}
```

### 2. UserProfiles Table

Stores additional user profile information and preferences.

```typescript
userProfiles: {
  _id: string                    // Auto-generated unique ID
  userId: Id<"users">            // Reference to users table
  bio?: string                   // Optional bio
  company?: string               // Optional company name
  website?: string               // Optional website URL
  preferences: {
    theme: "light" | "dark" | "system"  // Theme preference
    notifications: boolean             // Email notification preference
  }
}
```

**Indexes:**
- `by_user` - Fast lookup by user ID

**Example:**
```typescript
{
  _id: "a1b2c3d4e5f6g7h8i9j0k1",
  userId: "k8x2m9n4p5q6r7s8t9u0v1",
  bio: "Software engineer passionate about React",
  company: "Tech Corp",
  website: "https://johndoe.dev",
  preferences: {
    theme: "system",
    notifications: true
  }
}
```

### 3. Subscriptions Table

Tracks user subscription plans and status.

```typescript
subscriptions: {
  _id: string                        // Auto-generated unique ID
  userId: Id<"users">                // Reference to users table
  plan: "free" | "premium" | "pro"   // Subscription plan
  status: "active" | "canceled" | "past_due" | "trialing"  // Current status
  startedAt: string                  // ISO 8601 timestamp
  currentPeriodEnd?: string          // ISO 8601 timestamp (when billing period ends)
  cancelAtPeriodEnd: boolean         // Whether to cancel at period end
  updatedAt: string                  // ISO 8601 timestamp
}
```

**Indexes:**
- `by_user` - Fast lookup by user ID
- `by_status` - Filter subscriptions by status

**Example:**
```typescript
{
  _id: "z9y8x7w6v5u4t3s2r1q0p",
  userId: "k8x2m9n4p5q6r7s8t9u0v1",
  plan: "premium",
  status: "active",
  startedAt: "2025-12-01T00:00:00.000Z",
  currentPeriodEnd: "2025-12-31T23:59:59.999Z",
  cancelAtPeriodEnd: false,
  updatedAt: "2025-12-01T00:00:00.000Z"
}
```

**Plan Details:**

| Plan | Amount (IDR) | Features |
|------|-------------|----------|
| Free | 0 | Basic features |
| Premium | 50,000 | Premium features |
| Pro | 150,000 | All features + priority support |

### 4. PaymentTransactions Table

Records all payment transactions for audit and tracking.

```typescript
paymentTransactions: {
  _id: string                                  // Auto-generated unique ID (also our transaction ID)
  userId: Id<"users">                          // Reference to users table
  amount: number                               // Payment amount in IDR
  currency: string                             // Currency code (e.g., "IDR")
  plan: "premium" | "pro"                      // Plan being purchased
  status: "pending" | "completed" | "failed" | "refunded"  // Transaction status
  mayarTransactionId?: string                  // Mayar transaction ID
  mayarInvoiceId?: string                      // Mayar invoice ID
  createdAt: string                            // ISO 8601 timestamp
  updatedAt: string                            // ISO 8601 timestamp
}
```

**Indexes:**
- `by_user` - Fast lookup by user ID
- `by_status` - Filter transactions by status
- `by_mayar_transaction` - Lookup by Mayar transaction/invoice ID

**Example:**
```typescript
{
  _id: "t5u6v7w8x9y0z1a2b3c4d5",
  userId: "k8x2m9n4p5q6r7s8t9u0v1",
  amount: 50000,
  currency: "IDR",
  plan: "premium",
  status: "completed",
  mayarTransactionId: "mayar_tr_123456789",
  mayarInvoiceId: "mayar_inv_987654321",
  createdAt: "2025-12-10T12:00:00.000Z",
  updatedAt: "2025-12-10T12:05:00.000Z"
}
```

### 5. AdminActions Table

Audit log for all admin actions.

```typescript
adminActions: {
  _id: string                                             // Auto-generated unique ID
  adminUserId: Id<"users">                                // Reference to admin user
  action: "user_upgrade" | "user_downgrade" | "user_delete" | "user_edit"  // Action type
  targetUserId?: Id<"users">                              // Optional target user
  details: string                                         // Action description/details
  timestamp: string                                       // ISO 8601 timestamp
}
```

**Indexes:**
- `by_timestamp` - Order admin actions by time
- `by_admin` - Filter actions by admin user

---

## 🔐 Authentication Flow

### User Authentication

Convex provides built-in authentication. Users are identified by their email address.

#### Authentication States

1. **Authenticated User**
   ```typescript
   const user = await ctx.auth.getUserIdentity()
   // Returns: { email, name, tokenIdentifier, ... }
   ```

2. **Anonymous User**
   ```typescript
   const user = await ctx.auth.getUserIdentity()
   // Returns: null
   ```

#### Common Authentication Patterns

**Protect a Query:**
```typescript
export const getPrivateData = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error("Unauthorized")

    // Query private data
    return await ctx.db.query("privateTable").collect()
  },
})
```

**Protect a Mutation:**
```typescript
export const updateData = mutation({
  args: {
    data: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error("Unauthorized")

    // Update data
    await ctx.db.insert("table", { userId: user._id, data: args.data })
  },
})
```

**Check Admin Role:**
```typescript
export const adminOnlyFunction = mutation({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error("Unauthorized")

    // Check if user is admin
    const userDoc = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", user.email!))
      .first()

    if (!userDoc || userDoc.role !== "admin") {
      throw new Error("Forbidden")
    }

    // Perform admin action
  },
})
```

---

## 👥 User Management API

### Create User Profile

Creates a new user profile with default subscription and preferences.

```typescript
export const createUserProfile = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // ... implementation
  },
})
```

**Parameters:**
- `name` (string, required) - User's full name
- `email` (string, required) - User's email address

**Returns:** `Id<"users">` - The created user ID

**Side Effects:**
- Creates user record in `users` table
- Creates profile in `userProfiles` table
- Creates free subscription in `subscriptions` table

**Example Usage:**
```typescript
import { useMutation } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const mutation = useMutation(api.users.createUserProfile, {
  name: "John Doe",
  email: "john@example.com",
})
```

### Get Current User

Retrieves the current authenticated user with profile and subscription.

```typescript
export const getCurrentUser = query({
  handler: async (ctx) => {
    // ... implementation
  },
})
```

**Returns:** `UserProfile | null`

**Return Structure:**
```typescript
{
  _id: string
  email: string
  name: string
  tokenIdentifier: string
  profile: {
    _id: string
    userId: string
    bio?: string
    company?: string
    website?: string
    preferences: {
      theme: "light" | "dark" | "system"
      notifications: boolean
    }
  }
  subscription: {
    _id: string
    plan: "free" | "premium" | "pro"
    status: "active" | "canceled" | "past_due" | "trialing"
    // ... other fields
  }
}
```

**Example Usage:**
```typescript
import { useQuery } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const { data: user } = useQuery(api.users.getCurrentUser)
```

### Update User

Updates user information.

```typescript
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    updates: v.object({
      name: v.optional(v.string()),
      profileImage: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    // ... implementation
  },
})
```

**Parameters:**
- `userId` (Id<"users">, required) - User ID to update
- `updates` (object, optional):
  - `name` (string, optional) - New name
  - `profileImage` (string, optional) - New profile image URL

**Example Usage:**
```typescript
import { useMutation } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const mutation = useMutation(api.users.updateUser, {
  userId: "user_id_here",
  updates: {
    name: "Jane Doe",
    profileImage: "https://example.com/avatar.jpg",
  },
})
```

---

## 📦 Subscription API

### Get My Subscription

Retrieves the current user's subscription.

```typescript
export const getMySubscription = query({
  handler: async (ctx) => {
    // ... implementation
  },
})
```

**Returns:** `Subscription | null`

**Example Usage:**
```typescript
import { useQuery } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const { data: subscription } = useQuery(api.subscriptions.getMySubscription)
```

### Upgrade Plan

Upgrades the user's subscription plan.

```typescript
export const upgradePlan = mutation({
  args: {
    plan: v.union(v.literal("premium"), v.literal("pro")),
  },
  handler: async (ctx, args) => {
    // ... implementation
  },
})
```

**Parameters:**
- `plan` ("premium" | "pro", required) - Plan to upgrade to

**Example Usage:**
```typescript
import { useMutation } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const mutation = useMutation(api.subscriptions.upgradePlan, {
  plan: "premium",
})
```

**Note:** This is typically used for manual upgrades. For paid upgrades, use the payment transaction flow instead.

### Cancel Subscription

Cancels the user's subscription (will remain active until period end).

```typescript
export const cancelSubscription = mutation({
  handler: async (ctx) => {
    // ... implementation
  },
})
```

**Example Usage:**
```typescript
import { useMutation } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const mutation = useMutation(api.subscriptions.cancelSubscription)
```

---

## 💰 Payment Transaction API

### Create Payment Transaction

Creates a new payment transaction and initiates Mayar payment.

```typescript
export const createPaymentTransaction = mutation({
  args: {
    plan: v.union(v.literal("premium"), v.literal("pro")),
  },
  handler: async (ctx, args) => {
    // ... implementation
  },
})
```

**Parameters:**
- `plan` ("premium" | "pro", required) - Plan to purchase

**Returns:**
```typescript
{
  transactionId: Id<"paymentTransactions">
  paymentUrl: string
}
```

**Process Flow:**
1. Validates user is authenticated
2. Gets user details from database
3. Creates payment transaction record (status: "pending")
4. Creates Mayar invoice
5. Returns payment URL for redirect

**Example Usage:**
```typescript
import { useMutation } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const mutation = useMutation(api.paymentTransactions.createPaymentTransaction, {
  plan: "premium",
  onSuccess: (data) => {
    // Redirect to payment URL
    window.location.href = data.paymentUrl
  },
})
```

### Get My Transactions

Retrieves all payment transactions for the current user.

```typescript
export const getMyTransactions = query({
  handler: async (ctx) => {
    // ... implementation
  },
})
```

**Returns:** `PaymentTransaction[]` - Array of transactions (ordered by newest first)

**Example Usage:**
```typescript
import { useQuery } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const { data: transactions } = useQuery(api.paymentTransactions.getMyTransactions)
```

### Verify Payment

Verifies a payment transaction with Mayar and updates subscription status.

```typescript
export const verifyPayment = mutation({
  args: {
    transactionId: v.id("paymentTransactions"),
  },
  handler: async (ctx, args) => {
    // ... implementation
  },
})
```

**Parameters:**
- `transactionId` (Id<"paymentTransactions">, required) - Transaction to verify

**Returns:**
```typescript
{
  success: boolean
  message: string
  status: "completed" | "failed"
}
```

**Process Flow:**
1. Retrieves transaction from database
2. Verifies payment status with Mayar
3. Updates transaction status
4. If successful:
   - Updates or creates subscription
   - Sends success email
5. If failed:
   - Sends failure email

**Example Usage:**
```typescript
import { useMutation } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const mutation = useMutation(api.paymentTransactions.verifyPayment, {
  transactionId: "transaction_id_here",
  onSuccess: (result) => {
    if (result.success) {
      console.log("Payment verified!")
    }
  },
})
```

### Verify Payment from Callback

Alternative verification method using Mayar webhook/callback.

```typescript
export const verifyPaymentFromCallback = mutation({
  args: {
    mayarInvoiceId: v.string(),
  },
  handler: async (ctx, args) => {
    // ... implementation
  },
})
```

**Parameters:**
- `mayarInvoiceId` (string, required) - Mayar invoice ID from webhook

**Example Usage:**
```typescript
// Used by Mayar webhook endpoint
// This is called automatically when Mayar sends a webhook
```

---

## 🔧 Admin API

### Log Admin Action

Logs an admin action for audit purposes.

```typescript
export const logAdminAction = mutation({
  args: {
    action: v.union(
      v.literal("user_upgrade"),
      v.literal("user_downgrade"),
      v.literal("user_delete"),
      v.literal("user_edit")
    ),
    targetUserId: v.optional(v.id("users")),
    details: v.string(),
  },
  handler: async (ctx, args) => {
    // ... implementation
  },
})
```

**Parameters:**
- `action` (enum, required) - Type of action performed
- `targetUserId` (Id<"users">, optional) - User being acted upon
- `details` (string, required) - Detailed description of the action

**Authorization:** Admin role required

**Example Usage:**
```typescript
import { useMutation } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const mutation = useMutation(api.adminActions.logAdminAction, {
  action: "user_upgrade",
  targetUserId: "user_id_here",
  details: "Upgraded user to premium plan",
})
```

### Get All Users

Retrieves all users with their subscription information (admin only).

```typescript
export const getAllUsers = query({
  handler: async (ctx) => {
    // ... implementation
  },
})
```

**Returns:** `User[]` - Array of all users with subscriptions

**Return Structure:**
```typescript
{
  _id: string
  email: string
  name: string
  role: "user" | "admin"
  subscription?: {
    plan: "free" | "premium" | "pro"
    status: "active" | "canceled" | "past_due" | "trialing"
    // ... other fields
  }
}
```

**Authorization:** Admin role required

**Example Usage:**
```typescript
import { useQuery } from "@tanstack/react-query"
import { api } from "../convex/_generated/api"

const { data: users } = useQuery(api.adminActions.getAllUsers, {
  enabled: isAdmin, // Only fetch if user is admin
})
```

---

## 💳 Payment Integration

### Mayar Integration

The application integrates with Mayar for payment processing.

#### Payment Flow

1. **User initiates payment**
   - User selects a plan in the app
   - App calls `createPaymentTransaction`

2. **Transaction created**
   - Transaction record created with "pending" status
   - Mayar invoice created
   - Payment URL returned

3. **User completes payment**
   - User redirected to Mayar payment page
   - User enters payment details
   - Mayar processes payment

4. **Payment verification**
   - App calls `verifyPayment` after redirect
   - Convex queries Mayar for payment status
   - Transaction and subscription updated

5. **Email notification**
   - Success/failure email sent via Resend

#### Mayar API Functions

These functions are defined in `convex/mayar.ts`:

**Create Invoice:**
```typescript
export async function createInvoice(
  ctx,
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
): Promise<MayarInvoiceResponse>
```

**Verify Payment:**
```typescript
export async function verifyPayment(
  ctx,
  args: {
    mayarTransactionId: string
  }
): Promise<MayarTransactionResponse>
```

**Get Transaction Status:**
```typescript
export async function getTransactionStatus(
  ctx,
  args: {
    mayarInvoiceId?: string
    mayarTransactionId?: string
  }
): Promise<MayarTransactionResponse>
```

**Check Payment Success:**
```typescript
export function isPaymentSuccessful(
  mayarData: MayarTransactionResponse
): boolean
```

#### Payment Webhook

Mayar can send webhooks for real-time payment updates. Configure webhook URL in Mayar dashboard:

```
https://your-convex-url.convex.cloud/mayar/webhook
```

Webhook flow:
1. Mayar sends payment event
2. Convex receives webhook
3. Calls `verifyPaymentFromCallback`
4. Updates transaction and subscription
5. Sends email notification

---

## 📧 Email Integration

### Resend Integration

The application uses Resend for transactional emails.

#### Email Functions

Defined in `convex/mayar.ts`:

**Send Email:**
```typescript
export async function sendEmail(
  ctx,
  args: {
    to: string
    subject: string
    html: string
    from?: string
  }
)
```

#### Email Templates

**Payment Success Email:**
Sent when payment is successfully verified.

```html
<h2>Payment Confirmation</h2>
<p>Dear {{name}},</p>
<p>Thank you for your payment! Your {{plan}} plan subscription is now active.</p>
<p><strong>Transaction Details:</strong></p>
<ul>
  <li>Plan: {{plan}}</li>
  <li>Amount: {{amount}} {{currency}}</li>
  <li>Transaction ID: {{transactionId}}</li>
  <li>Mayar ID: {{mayarId}}</li>
</ul>
<p>You can access all premium features now.</p>
<p>Best regards,<br/>The Team</p>
```

**Payment Failure Email:**
Sent when payment verification fails.

```html
<h2>Payment Failed</h2>
<p>Dear {{name}},</p>
<p>We were unable to process your payment for the {{plan}} plan.</p>
<p><strong>Transaction Details:</strong></p>
<ul>
  <li>Plan: {{plan}}</li>
  <li>Amount: {{amount}} {{currency}}</li>
  <li>Transaction ID: {{transactionId}}</li>
  <li>Mayar ID: {{mayarId}}</li>
</ul>
<p>Please try again or contact support if you need assistance.</p>
<p>Best regards,<br/>The Team</p>
```

---

## ⚠️ Error Handling

### Common Error Types

**Authentication Errors:**
- `Unauthorized` - User not logged in
- `Forbidden` - User doesn't have permission

**Validation Errors:**
- `Error` - Invalid arguments or data

**Payment Errors:**
- `Failed to create Mayar invoice` - Mayar API error
- `Payment verification failed` - Payment not successful
- `Transaction not found` - Invalid transaction ID

### Error Handling Best Practices

**Frontend:**
```typescript
const mutation = useMutation(api.paymentTransactions.createPaymentTransaction, {
  plan: "premium",
  onError: (error) => {
    toast.error(error.message || "Something went wrong")
  },
  onSuccess: (data) => {
    toast.success("Redirecting to payment...")
    window.location.href = data.paymentUrl
  },
})
```

**Backend:**
```typescript
export const myFunction = mutation({
  handler: async (ctx, args) => {
    try {
      // Perform operation
    } catch (error) {
      console.error("Error:", error)
      throw new Error("User-friendly error message")
    }
  },
})
```

---

## 🚦 Rate Limiting

Convex automatically handles rate limiting and scaling. However, best practices include:

### Query Optimization

**Avoid N+1 queries:**
```typescript
// ❌ Bad - N+1 queries
const users = await ctx.db.query("users").collect()
for (const user of users) {
  const subscription = await ctx.db.get(user.subscriptionId) // Separate query for each user
}

// ✅ Good - Single query with join
const usersWithSubscriptions = await Promise.all(
  users.map(async (user) => {
    const subscription = await ctx.db.get(user.subscriptionId)
    return { ...user, subscription }
  })
)
```

**Use indexes:**
- Always use `withIndex()` when querying
- Use appropriate indexes for common queries
- Avoid full table scans for large datasets

### Mutation Patterns

**Batch operations:**
```typescript
// ✅ Good - Batch insert
await Promise.all(
  items.map(item => ctx.db.insert("table", item))
)
```

**Idempotency:**
```typescript
// Check if operation already performed
const existing = await ctx.db.query("transactions")
  .withIndex("by_external_id", q => q.eq("externalId", externalId))
  .first()

if (existing) {
  return existing // Return existing instead of creating duplicate
}
```

---

## 🔍 Testing API Functions

### Using Convex Dev Console

```bash
# Start Convex dev server
npx convex dev

# Open dev console (printed in terminal)
# Navigate to Functions tab
# Test queries and mutations
```

### Using Convex CLI

```bash
# Run a query
npx convex run api.users.getCurrentUser

# Run a mutation
npx convex run api.paymentTransactions.createPaymentTransaction --plan premium
```

### Writing Tests

Create test files in `convex/test/` directory:

```typescript
// convex/test/user.test.ts
import { expect, test } from "vitest"
import { convexTest } from "convex-helpers/testing"
import { api } from "../index.js"

test("create user profile", async () => {
  const t = await convexTest()
  const userId = await t.mutation(api.users.createUserProfile, {
    name: "Test User",
    email: "test@example.com",
  })
  expect(userId).toBeDefined()
})
```

---

## 📚 Additional Resources

### Convex Documentation

- [Convex Documentation](https://docs.convex.dev)
- [Database Guide](https://docs.convex.dev/database)
- [Queries & Mutations](https://docs.convex.dev/functions)
- [Authentication](https://docs.convex.dev/auth)

### TanStack Query Integration

- [TanStack Query Docs](https://tanstack.com/query)
- [Convex React Query Integration](https://stack.convex.dev/client/react-query)

### Code Examples

All examples in this document follow the actual implementation in the codebase. Refer to:
- `convex/users.ts` - User management
- `convex/subscriptions.ts` - Subscription management
- `convex/paymentTransactions.ts` - Payment processing
- `convex/adminActions.ts` - Admin functions
- `convex/mayar.ts` - Payment and email integration
- `convex/schema.ts` - Database schema

---

## 📝 Changelog

### v1.0.0 (Current)

- Initial release
- User authentication and profiles
- Subscription management (Free, Premium, Pro)
- Mayar payment integration
- Resend email notifications
- Admin panel with user management
- Audit logging for admin actions

---

## 🤝 Contributing

When adding new API functions:

1. **Add TypeScript types** for all arguments and returns
2. **Add comprehensive comments** explaining the function
3. **Use proper error handling** with try/catch
4. **Add database indexes** for query performance
5. **Write usage examples** in this documentation
6. **Add tests** for critical functions

---

## 📄 License

API documentation © 2025. Licensed under MIT.