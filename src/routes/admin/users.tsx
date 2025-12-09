import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import {
  MoreHorizontal,
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
} from "lucide-react"
import { toast } from "sonner"

// TODO: Add role check to ensure only admins can access
// import { useAuth } from '~/hooks/useAuth'

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
})

type User = {
  _id: string
  email: string
  name: string
  role: "user" | "admin"
  emailVerified: boolean
  profileImage?: string
  createdAt: string
  updatedAt: string
  subscription?: {
    _id: string
    plan: "free" | "premium" | "pro"
    status: "active" | "canceled" | "past_due" | "trialing"
    startedAt: string
  }
}

function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // TODO: Replace with actual Convex query when API is generated
  // const { data: users = [], isLoading, refetch } = useQuery({
  //   queryKey: ["admin", "users"],
  //   queryFn: async () => {
  //     const result = await api.adminActions.getAllUsers.query()
  //     return result as User[]
  //   },
  // })

  // Mock data for now
  const isLoading = false
  const users: User[] = [
    {
      _id: "1",
      email: "user1@example.com",
      name: "John Doe",
      role: "user" as const,
      emailVerified: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      subscription: {
        _id: "sub1",
        plan: "premium" as const,
        status: "active" as const,
        startedAt: "2024-01-15T10:00:00Z",
      },
    },
    {
      _id: "2",
      email: "user2@example.com",
      name: "Jane Smith",
      role: "user" as const,
      emailVerified: true,
      createdAt: "2024-02-10T14:30:00Z",
      updatedAt: "2024-02-10T14:30:00Z",
      subscription: {
        _id: "sub2",
        plan: "pro" as const,
        status: "active" as const,
        startedAt: "2024-02-10T14:30:00Z",
      },
    },
    {
      _id: "3",
      email: "user3@example.com",
      name: "Bob Johnson",
      role: "user" as const,
      emailVerified: false,
      createdAt: "2024-03-05T09:15:00Z",
      updatedAt: "2024-03-05T09:15:00Z",
      subscription: undefined,
    },
  ]

  // Log admin action mutation
  // TODO: Replace with actual Convex mutation when API is generated
  // const logAdminAction = useMutation({
  //   mutationFn: async (args: { action: string; targetUserId?: string; details: string }) => {
  //     const result = await api.adminActions.logAdminAction.mutate(args)
  //     return result
  //   },
  //   onSuccess: () => {
  //     toast.success("Action completed successfully")
  //     refetch()
  //   },
  //   onError: (error) => {
  //     toast.error(`Failed to perform action: ${error.message}`)
  //   },
  // })

  const logAdminAction = {
    mutate: (args: { action: string; targetUserId?: string; details: string }) => {
      console.log("Admin action:", args)
      toast.success("Action completed successfully")
    },
    isPending: false,
  }

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlan = planFilter === "all" || user.subscription?.plan === planFilter
    const matchesStatus = statusFilter === "all" || user.subscription?.status === statusFilter

    return matchesSearch && matchesPlan && matchesStatus
  })

  const handleUpgradeUser = (user: User) => {
    const currentPlan = user.subscription?.plan || "free"
    const nextPlan = currentPlan === "free" ? "premium" : currentPlan === "premium" ? "pro" : "pro"

    if (currentPlan !== "pro") {
      logAdminAction.mutate({
        action: "user_upgrade",
        targetUserId: user._id,
        details: `Upgraded user from ${currentPlan} to ${nextPlan}`,
      })
    }
  }

  const handleDowngradeUser = (user: User) => {
    const currentPlan = user.subscription?.plan || "free"
    const prevPlan = currentPlan === "pro" ? "premium" : currentPlan === "premium" ? "free" : "free"

    if (currentPlan !== "free") {
      logAdminAction.mutate({
        action: "user_downgrade",
        targetUserId: user._id,
        details: `Downgraded user from ${currentPlan} to ${prevPlan}`,
      })
    }
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setShowDeleteDialog(true)
  }

  const confirmDeleteUser = () => {
    if (selectedUser) {
      logAdminAction.mutate({
        action: "user_delete",
        targetUserId: selectedUser._id,
        details: `Deleted user ${selectedUser.email}`,
      })
      setShowDeleteDialog(false)
      setSelectedUser(null)
    }
  }

  const handleEditUser = (user: User) => {
    logAdminAction.mutate({
      action: "user_edit",
      targetUserId: user._id,
      details: `Edited user ${user.email}`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case "free":
        return "secondary"
      case "premium":
        return "default"
      case "pro":
        return "default"
      default:
        return "secondary"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "canceled":
        return "destructive"
      case "past_due":
        return "destructive"
      case "trialing":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts, subscriptions, and permissions.
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
                <SelectItem value="trialing">Trialing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            A list of all users in the system with their subscription details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-muted-foreground">Loading users...</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <Button variant="ghost" className="gap-1">
                      Name <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {user.role === "admin" ? "Admin" : "User"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getPlanBadgeVariant(user.subscription?.plan || "free")}>
                          {user.subscription?.plan || "free"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.subscription?.status || "active")}>
                          {user.subscription?.status || "active"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleUpgradeUser(user)}
                              disabled={user.subscription?.plan === "pro"}
                            >
                              <ArrowUpDown className="mr-2 h-4 w-4" />
                              Upgrade Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDowngradeUser(user)}
                              disabled={user.subscription?.plan === "free"}
                            >
                              <ArrowUpDown className="mr-2 h-4 w-4" />
                              Downgrade Plan
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete user{" "}
              <span className="font-semibold">{selectedUser?.email}</span>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={logAdminAction.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteUser}
              disabled={logAdminAction.isPending}
            >
              {logAdminAction.isPending ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}