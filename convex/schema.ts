import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("user"), v.literal("admin")),
    emailVerified: v.boolean(),
    profileImage: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  userProfiles: defineTable({
    userId: v.id("users"),
    bio: v.optional(v.string()),
    company: v.optional(v.string()),
    website: v.optional(v.string()),
    preferences: v.object({
      theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
      notifications: v.boolean(),
    }),
  }).index("by_user", ["userId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    plan: v.union(v.literal("free"), v.literal("premium"), v.literal("pro")),
    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("past_due"),
      v.literal("trialing")
    ),
    startedAt: v.string(),
    currentPeriodEnd: v.optional(v.string()),
    cancelAtPeriodEnd: v.boolean(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  paymentTransactions: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    currency: v.string(),
    plan: v.union(v.literal("premium"), v.literal("pro")),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    mayarTransactionId: v.optional(v.string()),
    mayarInvoiceId: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_mayar_transaction", ["mayarTransactionId"]),

  adminActions: defineTable({
    adminUserId: v.id("users"),
    action: v.union(
      v.literal("user_upgrade"),
      v.literal("user_downgrade"),
      v.literal("user_delete"),
      v.literal("user_edit")
    ),
    targetUserId: v.optional(v.id("users")),
    details: v.string(),
    timestamp: v.string(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_admin", ["adminUserId"]),
})