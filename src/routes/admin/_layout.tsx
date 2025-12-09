import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AdminLayout } from "~/components/layout/admin-layout"

export const Route = createFileRoute("/admin/_layout")({
  component: AdminLayout,
})

export default function AdminLayoutRoute() {
  return <Outlet />
}