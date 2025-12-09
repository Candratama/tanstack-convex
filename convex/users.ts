import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createUserProfile = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString()
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: "user",
      emailVerified: false,
      createdAt: now,
      updatedAt: now,
    })

    await ctx.db.insert("userProfiles", {
      userId,
      preferences: {
        theme: "system",
        notifications: true,
      },
    })

    await ctx.db.insert("subscriptions", {
      userId,
      plan: "free",
      status: "active",
      startedAt: now,
      cancelAtPeriodEnd: false,
      updatedAt: now,
    })

    return userId
  },
})

export const getCurrentUser = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) return null

    const userProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first()

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first()

    return {
      ...user,
      profile: userProfile,
      subscription,
    }
  },
})

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    updates: v.object({
      name: v.optional(v.string()),
      profileImage: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      ...args.updates,
      updatedAt: new Date().toISOString(),
    })
  },
})