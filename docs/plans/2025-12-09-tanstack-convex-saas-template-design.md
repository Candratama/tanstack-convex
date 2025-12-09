# TanStack Convex SaaS Template Design

## Overview

A production-ready boilerplate template combining TanStack Start + Convex backend for rapid SaaS development. Features complete authentication, user management, admin panel, and Mayar payment integration.

## Architecture

### Technology Stack

- **Frontend**: TanStack Router, React 19, Vite
- **Backend**: Convex (reactive, typesafe backend)
- **Authentication**: Convex Auth (email/password)
- **Payments**: Mayar API (Indonesia payment gateway)
- **Email**: Resend + React Email
- **UI**: shadcn/ui + TailwindCSS
- **Forms**: Conform + Zod validation
- **Routing**: TanStack Router with load functions

### Project Structure

```
/src
  /components
    /ui              # shadcn base components
    /features        # Feature-specific components
      /auth          # Login, register, forgot password
      /dashboard     # Dashboard layout and widgets
      /billing       # Plan selector, payment forms
      /admin         # User management, analytics
      /settings      # Profile, account, notifications
    /layout          # Header, sidebar, navigation
    /email           # React Email templates
  /routes
    /auth            # Auth pages
    /dashboard       # Protected dashboard routes
    /settings        # User settings pages
    /admin           # Admin panel routes
  /lib
    /convex          # Convex query/mutation wrappers
    /utils           # Helper functions
    /validations     # Zod schemas

/convex
  /schema.ts         # Database schema
  /functions
    /auth            # Auth mutations/queries
    /billing         # Payment handling
    /admin           # Admin operations
    /email           # Email triggers
```

## Database Schema

### Users Table

```typescript
users: {
  _id: string
  email: string
  name: string
  role: "user" | "admin"
  emailVerified: boolean
  profileImage?: string
  createdAt: string
  updatedAt: string
}
```

### User Profiles Table

```typescript
userProfiles: {
  _id: string
  userId: string (references users._id)
  bio?: string
  company?: string
  website?: string
  preferences: {
    theme: "light" | "dark" | "system"
    notifications: boolean
  }
}
```

### Subscriptions Table

```typescript
subscriptions: {
  _id: string
  userId: string (references users._id)
  plan: "free" | "premium" | "pro"
  status: "active" | "canceled" | "past_due" | "trialing"
  startedAt: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd: boolean
  updatedAt: string
}
```

### Payment Transactions Table

```typescript
paymentTransactions: {
  _id: string
  userId: string (references users._id)
  amount: number
  currency: string (default "IDR")
  plan: "premium" | "pro"
  status: "pending" | "completed" | "failed" | "refunded"
  mayarTransactionId?: string
  mayarInvoiceId?: string
  createdAt: string
  updatedAt: string
}
```

### Admin Actions Audit Log

```typescript
adminActions: {
  _id: string
  adminUserId: string (references users._id)
  action: "user_upgrade" | "user_downgrade" | "user_delete" | "user_edit"
  targetUserId?: string
  details: string
  timestamp: string
}
```

## Authentication Flow

### Registration

1. User submits form (name, email, password)
2. Convex Auth creates user with `emailVerified: false`
3. Resend sends verification email
4. User clicks link → navigates to `/auth/verify?token=...`
5. Token validated → `emailVerified: true`
6. Redirect to onboarding/dashboard

### Login

1. User enters credentials
2. Mutation `signIn` called
3. If not verified → show error with resend option
4. If verified → create session, redirect

### Password Reset

1. Request reset → email sent with token link
2. User clicks → form for new password
3. Token validated → password updated

## Routing Structure

```
/
  ├─ Landing Page
  ├─ /auth/login
  ├─ /auth/register
  ├─ /auth/verify (token)
  ├─ /auth/forgot-password
  ├─ /auth/reset-password (token)
  ├─ /onboarding
  ├─ /dashboard (protected)
  │   ├─ Overview
  │   ├─ Profile
  │   └─ Billing
  ├─ /settings (protected)
  │   ├─ Profile Settings
  │   ├─ Account
  │   └─ Notifications
  └─ /admin (admin only)
      ├─ Dashboard
      ├─ Users Management
      └─ Analytics
```

## Billing & Subscription

### Subscription Plans

- **Free**: $0/month, basic features
- **Premium**: 50,000 IDR/month, 10 projects, priority support
- **Pro**: 150,000 IDR/month, unlimited projects, API access

### Payment Flow (Mayar)

1. User selects plan → create payment transaction
2. Convex calls Mayar `/invoice/create`
3. Redirect to Mayar payment page
4. Payment completion → Mayar redirects back
5. Dashboard detects payment callback
6. Verify payment via Mayar API
7. Update subscription in database
8. Send confirmation email

### Billing Management

- View current plan and usage
- Upgrade/downgrade plans
- Cancel subscription
- Payment history
- Admin manual overrides

## UI Components

### shadcn Components Used

- Forms: Form, Input, Button, FormMessage
- Navigation: NavigationMenu, Sheet, Breadcrumb, Tabs
- Display: Card, Table, Badge, Avatar
- Feedback: Toast, Alert, Progress

### Component Organization

- `/ui` - Base shadcn components
- `/features/*` - Feature-specific components
- `/layout` - Shared layout components
- `/email` - React Email templates

## Error Handling & Security

### Error Handling

- Route-level error boundaries
- Toast notifications for user feedback
- Loading states for async operations
- Convex error patterns with try/catch

### Validation

- Zod schemas for all forms
- Conform for form validation
- Input sanitization
- Email format validation

### Security

- Row-level security via Convex
- Session management with Convex Auth
- CSRF protection
- Rate limiting on auth endpoints
- Environment variables for sensitive data

## Email Templates (Resend)

1. **Welcome Email**: Post-registration
2. **Email Verification**: Confirm account
3. **Password Reset**: Reset password link
4. **Payment Success**: Confirmation after upgrade
5. **Payment Failed**: Failed payment notification

## Testing Strategy

### Unit Testing

- Convex mutations/queries
- Form validation logic
- Payment processing

### Component Testing

- Auth forms
- Dashboard components
- Billing components

### E2E Testing (Playwright)

- Complete auth flow
- Subscription flow
- Admin workflow

## Implementation Phases

### Phase 1: Foundation

- Project setup and dependencies
- Convex schema and backend
- shadcn/ui configuration
- Routing structure
- Authentication flow

### Phase 2: Core Features

- Dashboard pages
- Settings pages
- Landing page
- Email templates

### Phase 3: Billing

- Mayar integration
- Billing pages
- Subscription management
- Admin overrides

### Phase 4: Admin Panel

- Admin dashboard
- User management
- Analytics
- Audit logging

### Phase 5: Polish & Deploy

- Testing
- Error handling
- Performance optimization
- Documentation

## Environment Variables

- `CONVEX_DEPLOYMENT` - Convex deployment
- `VITE_CONVEX_URL` - Convex deployment
- `VITE_RESEND_API_KEY` - Resend email service
- `MAYAR_API_KEY` - Mayar payment gateway
- `MAYAR_API_URL` - Mayar API endpoint (default: https://api.mayar.id)

## Deliverables

- Complete boilerplate template
- Setup documentation
- Deployment guide
- Customization instructions
- Test suite

## Estimated Timeline

3-5 weeks for full implementation
