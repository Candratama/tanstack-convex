import { Link, Outlet, useLocation } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  LayoutDashboard,
  User,
  CreditCard,
  LogOut,
} from "lucide-react"
import { cn } from "~/lib/utils"

export function DashboardLayout() {
  const location = useLocation()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: location.pathname === "/dashboard",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
      current: location.pathname === "/dashboard/profile",
    },
    {
      name: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
      current: location.pathname === "/dashboard/billing",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      <div className="fixed inset-0 z-50 lg:hidden bg-background/80 backdrop-blur-sm" />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform lg:translate-x-0">
        <div className="flex h-16 shrink-0 items-center border-b px-6">
          <Link to="/dashboard" className="text-xl font-bold">
            Dashboard
          </Link>
        </div>
        <nav className="flex flex-1 flex-col p-4">
          <ul role="list" className="flex flex-1 flex-col gap-2">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex gap-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors",
                          item.current
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
            <li className="mt-auto">
              {/* User menu */}
              <div className="flex items-center gap-3 rounded-lg p-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </div>
              <Link
                to="/auth/login"
                className="group flex gap-3 rounded-md p-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
                Sign out
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}