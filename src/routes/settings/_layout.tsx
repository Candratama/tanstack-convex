import { createFileRoute, Outlet } from "@tanstack/react-router"
import { SettingsLayout } from "~/components/layout/settings-layout"

export const Route = createFileRoute("/settings/_layout")({
  component: SettingsLayout,
})

export default function SettingsLayoutRoute() {
  return <Outlet />
}