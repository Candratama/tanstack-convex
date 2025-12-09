import { createFileRoute } from "@tanstack/react-router"
import { ForgotPasswordForm } from "~/components/features/auth/forgot-password-form"

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ForgotPasswordForm />
    </div>
  )
}