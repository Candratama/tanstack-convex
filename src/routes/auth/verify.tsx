import { createFileRoute } from "@tanstack/react-router"
import { useRouterState } from "@tanstack/react-router"
import { VerifyEmailForm } from "~/components/features/auth/verify-email-form"

export const Route = createFileRoute("/auth/verify")({
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const routerState = useRouterState()
  const url = new URL(routerState.location.href)
  const email = url.searchParams.get("email") || undefined

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <VerifyEmailForm email={email} />
    </div>
  )
}