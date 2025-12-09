import { createFileRoute, Outlet } from "@tanstack/react-router"
import { DashboardLayout } from "~/components/layout/dashboard-layout"

export const Route = createFileRoute("/dashboard/_layout")({
  component: DashboardLayout,
})

export default function DashboardLayoutRoute() {
  return <Outlet />
}