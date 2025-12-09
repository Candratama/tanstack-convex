# TanStack Convex SaaS Boilerplate

A production-ready, full-stack SaaS application template built with modern technologies including TanStack, Convex, React, and TypeScript. This boilerplate provides a solid foundation for building subscription-based applications with user authentication, payment processing, and admin functionality.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![React](https://img.shields.io/badge/React-19.2-blue.svg)

## ✨ Features

### Core Features
- **User Authentication** - Secure user registration and login with Convex Auth
- **Subscription Management** - Multiple subscription plans (Free, Premium, Pro)
- **Payment Processing** - Integrated with Mayar payment gateway
- **Email Notifications** - Automated emails via Resend for payment confirmations
- **Admin Dashboard** - Admin panel for user and subscription management
- **User Profiles** - Customizable user profiles with preferences
- **Payment History** - Complete transaction tracking and history
- **Theme Support** - Light/Dark/System theme switching

### Technical Features
- **Type-Safe** - Full TypeScript support throughout the application
- **Modern UI** - Built with Radix UI components and Tailwind CSS
- **Database** - Convex for real-time, serverless database
- **State Management** - TanStack Query for efficient data fetching and caching
- **Routing** - TanStack Router for type-safe routing
- **Responsive Design** - Mobile-first responsive layout
- **Form Handling** - React Hook Form with Zod validation
- **Real-time Updates** - Live data synchronization with Convex

### Security Features
- **Role-Based Access Control** - User and Admin role separation
- **Secure API** - Type-safe API with Convex validators
- **Protected Routes** - Route-level authentication and authorization
- **Input Validation** - Client and server-side validation with Zod

## 🚀 Tech Stack

### Frontend
- **[React](https://react.dev/)** - UI library (v19.2.1)
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety (v5.9.2)
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing (v1.132.2)
- **[TanStack Query](https://tanstack.com/query)** - Server state management (v5.89.0)
- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework (v1.132.2)
- **[Vite](https://vitejs.dev/)** - Build tool and dev server (v7.1.5)

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS (v4.1.13)
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Icon library (v0.400.0)
- **[Class Variance Authority](https://cva.style/)** - Type-safe component variants
- **[clsx](https://github.com/lukeed/clsx)** - Conditional class names
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes

### Backend & Database
- **[Convex](https://convex.dev/)** - Serverless database and backend (v1.29.1)
- **[React Query DevTools](https://tanstack.com/query)** - DevTools for debugging

### Payments & Email
- **[Mayar](https://mayar.id/)** - Payment gateway integration
- **[Resend](https://resend.com/)** - Email service (v3.3.0)

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms (v7.68.0)
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation (v3.25.76)
- **[Hookform Resolvers](https://github.com/react-hook-form/resolvers)** - Resolvers for form libraries

### Development Tools
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Concurrently](https://github.com/open-cli-tools/concurrently)** - Run multiple scripts

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** - Package manager
- **Git** - Version control

You'll also need accounts for:
- **Convex** - [Sign up here](https://convex.dev/)
- **Mayar** - [Sign up here](https://mayar.id/)
- **Resend** - [Sign up here](https://resend.com/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tanstack-convex
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys (see [Environment Setup](#-environment-setup) for details).

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start both the Vite development server and Convex development environment.

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🔧 Environment Setup

You'll need to configure three main services. Follow the links in each section for detailed setup instructions.

### 1. Convex Setup

Convex is used for the database and backend functions.

1. **Create a Convex account** at [convex.dev](https://convex.dev/)
2. **Create a new project**
   ```bash
   npx convex dev
   ```
3. **Copy your Convex URL** from the dashboard and add it to `.env`:
   ```
   VITE_CONvex_URL=https://your-project-url.convex.cloud
   ```

For detailed instructions, see [SETUP.md](SETUP.md#-convex-deployment)

### 2. Mayar Payment Setup

Mayar handles subscription payments.

1. **Create a Mayar account** at [mayar.id](https://mayar.id/)
2. **Get your API key** from the dashboard
3. **Add it to `.env`:**
   ```
   MAYAR_API_KEY=your_mayar_api_key_here
   MAYAR_API_URL=https://api.mayar.id
   ```

For detailed instructions, see [SETUP.md](SETUP.md#-mayar-configuration)

### 3. Resend Email Setup

Resend handles transactional emails.

1. **Create a Resend account** at [resend.com](https://resend.com/)
2. **Get your API key** from the dashboard
3. **Add it to `.env`:**
   ```
   VITE_RESEND_API_KEY=your_resend_api_key_here
   ```

For detailed instructions, see [SETUP.md](SETUP.md#-resend-setup)

### Environment Variables Checklist

Here's a complete list of environment variables you need:

```bash
# Convex (Required)
VITE_CONvex_URL=https://your-project-url.convex.cloud

# Resend Email (Required)
VITE_RESEND_API_KEY=re_your_api_key_here

# Mayar Payment (Required)
MAYAR_API_KEY=your_mayar_api_key_here
MAYAR_API_URL=https://api.mayar.id

# Optional
VITE_APP_URL=http://localhost:5173
```

## 🚀 Deployment

### Deploying Convex Backend

1. **Deploy to Convex Cloud**
   ```bash
   npx convex deploy
   ```

2. **Update environment variables** in your hosting platform with your production Convex URL

### Deploying Frontend

The frontend can be deployed to any static hosting service:

#### Vercel (Recommended)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```
2. **Deploy**
   ```bash
   vercel
   ```
3. **Set environment variables** in Vercel dashboard

#### Netlify
1. **Build the project**
   ```bash
   npm run build
   ```
2. **Deploy** the `dist` folder to Netlify
3. **Set environment variables** in Netlify dashboard

#### Manual Deployment
1. **Build for production**
   ```bash
   npm run build
   ```
2. **Deploy** the `dist` directory to your hosting service

### Production Checklist

- [ ] All environment variables are set in production
- [ ] Convex is deployed with `npx convex deploy`
- [ ] Payment gateway is configured for production
- [ ] Email service is configured for production
- [ ] Database is properly seeded (if needed)
- [ ] CORS settings are configured correctly

## 🎨 Customization

### Changing Plans and Pricing

Update pricing in `convex/paymentTransactions.ts`:

```typescript
const PLANS = {
  premium: { amount: 50000 }, // Amount in IDR
  pro: { amount: 150000 },    // Amount in IDR
}
```

### Updating Database Schema

1. **Modify** `convex/schema.ts`
2. **Run** `npx convex dev` to apply changes
3. **Update** frontend types if needed

### Adding New Convex Functions

Create new functions in the `convex/` directory:

```typescript
// convex/newFunction.ts
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const myNewQuery = query({
  handler: async (ctx) => {
    // Your code here
    return data
  },
})
```

### Styling and Theming

#### Tailwind Configuration

Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints

#### Theme Switching

The app supports light/dark/system themes. Theme preferences are stored per user and can be customized in the user profile.

#### Custom Colors

Update the CSS variables in `src/styles/globals.css`:

```css
:root {
  --primary: 220 14% 96%;
  --primary-foreground: 220 14% 14%;
  /* ... */
}
```

### Adding New Routes

1. **Create** a new route file in `src/routes/`
2. **Add** to `src/router.tsx`:
   ```typescript
   import * as Route from "./routes/newRoute"

   export const routeTree = createRootRoute({
     component: () => <RouterProvider router={router} />,
     notFoundComponent: () => <NotFound />,
     routes: [
       // ... existing routes
       Route.routeTree,
     ],
   })
   ```

### Customizing Email Templates

Email templates are in `convex/mayar.ts`. Customize the HTML in the `sendEmail` function calls.

## 📚 API Documentation

For detailed API documentation, see [API.md](API.md). This includes:

- Complete Convex function reference
- Database schema documentation
- Authentication flow
- Payment processing flow
- Admin functions

## 🏗️ Project Structure

```
tanstack-convex/
├── convex/                  # Convex backend functions
│   ├── _generated/          # Auto-generated Convex files
│   ├── _types/              # TypeScript type definitions
│   ├── schema.ts            # Database schema
│   ├── users.ts             # User management functions
│   ├── subscriptions.ts     # Subscription management
│   ├── paymentTransactions.ts # Payment processing
│   ├── mayar.ts             # Mayar payment integration
│   └── adminActions.ts      # Admin functions
├── src/                     # Frontend source code
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions
│   ├── routes/              # Route definitions
│   │   ├── auth/            # Authentication routes
│   │   ├── dashboard/       # Dashboard route
│   │   ├── admin/           # Admin panel
│   │   ├── settings/        # User settings
│   │   └── api/             # API documentation
│   └── styles/              # Global styles
├── docs/                    # Documentation
├── public/                  # Static assets
└── dist/                    # Build output
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Format code
npm run format
```

## 📝 Available Scripts

```bash
# Start development server (runs both Vite and Convex)
npm run dev

# Start only frontend
npm run dev:web

# Start only Convex dev server
npm run dev:convex

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Format code
npm run format
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Support

If you have any questions or need help:

1. Check the [SETUP.md](SETUP.md) for detailed setup instructions
2. Check the [API.md](API.md) for API documentation
3. Open an [issue](https://github.com/your-repo/issues)

## 🏆 Acknowledgments

- [Convex](https://convex.dev/) for the amazing backend platform
- [TanStack](https://tanstack.com/) for the excellent React ecosystem
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Mayar](https://mayar.id/) for payment processing
- [Resend](https://resend.com/) for email services

---

**Built with ❤️ using TanStack and Convex**