import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

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
    const admin = await ctx.auth.getUserIdentity()
    if (!admin || !admin.tokenIdentifier) throw new Error("Unauthorized")

    const adminUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", admin.email!))
      .first()

    if (!adminUser || adminUser.role !== "admin") {
      throw new Error("Forbidden")
    }

    await ctx.db.insert("adminActions", {
      adminUserId: adminUser._id,
      action: args.action,
      targetUserId: args.targetUserId,
      details: args.details,
      timestamp: new Date().toISOString(),
    })
  },
})

export const getAllUsers = query({
  handler: async (ctx) => {
    const admin = await ctx.auth.getUserIdentity()
    if (!admin || !admin.tokenIdentifier) throw new Error("Unauthorized")

    const adminUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", admin.email!))
      .first()

    if (!adminUser || adminUser.role !== "admin") {
      throw new Error("Forbidden")
    }

    const users = await ctx.db.query("users").collect()

    const usersWithSubscriptions = await Promise.all(
      users.map(async (user) => {
        const subscription = await ctx.db
          .query("subscriptions")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .first()

        return {
          ...user,
          subscription,
        }
      })
    )

    return usersWithSubscriptions
  },
})