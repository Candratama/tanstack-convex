import { createFileRoute } from "@tanstack/react-router"
import { LoginForm } from "~/components/features/auth/login-form"

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}