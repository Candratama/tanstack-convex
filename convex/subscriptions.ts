import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getMySubscription = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error("Unauthorized")

    return await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first()
  },
})

export const upgradePlan = mutation({
  args: {
    plan: v.union(v.literal("premium"), v.literal("pro")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error("Unauthorized")

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first()

    if (!subscription) throw new Error("No subscription found")

    const now = new Date()
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1))

    await ctx.db.patch(subscription._id, {
      plan: args.plan,
      status: "active",
      currentPeriodEnd: nextMonth.toISOString(),
      updatedAt: new Date().toISOString(),
    })
  },
})

export const cancelSubscription = mutation({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error("Unauthorized")

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first()

    if (!subscription) throw new Error("No subscription found")

    await ctx.db.patch(subscription._id, {
      cancelAtPeriodEnd: true,
      updatedAt: new Date().toISOString(),
    })
  },
})