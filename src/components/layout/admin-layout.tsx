import { Link, Outlet, useLocation } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  Shield,
} from "lucide-react"
import { cn } from "~/lib/utils"

export function AdminLayout() {
  const location = useLocation()

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: location.pathname === "/admin",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      current: location.pathname === "/admin/users",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      current: location.pathname === "/admin/analytics",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      <div className="fixed inset-0 z-50 lg:hidden bg-background/80 backdrop-blur-sm" />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform lg:translate-x-0">
        <div className="flex h-16 shrink-0 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <Link to="/admin" className="text-xl font-bold">
              Admin Panel
            </Link>
          </div>
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
              {/* Admin user menu */}
              <div className="flex items-center gap-3 rounded-lg p-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Admin avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">
                    admin@example.com
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
          {/* TODO: Add role check to ensure only admins can access */}
          {/* const { user } = useAuth() */}
          {/* if (user?.role !== 'admin') return <Navigate to="/dashboard" /> */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}