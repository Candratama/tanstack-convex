# Setup Guide - TanStack Convex SaaS Boilerplate

This guide will walk you through setting up the TanStack Convex SaaS Boilerplate from scratch. Follow these steps carefully to ensure everything is configured correctly.

## 📋 Prerequisites Checklist

Before starting, make sure you have the following installed on your system:

- [ ] **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
  - Verify installation: `node --version`
- [ ] **npm** (comes with Node.js) - [Verify: `npm --version`]
- [ ] **Git** - [Download here](https://git-scm.com/)
  - Verify installation: `git --version`
- [ ] **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

## 📦 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <your-repository-url>
cd tanstack-convex

# Verify you're in the correct directory
pwd
# Should show: .../tanstack-convex
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - Frontend dependencies (React, TanStack, etc.)
# - Backend dependencies (Convex)
# - Dev dependencies (TypeScript, ESLint, etc.)

# Verify installation
ls node_modules | head -10
```

**Note:** This may take a few minutes depending on your internet connection.

### Step 3: Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Now you need to configure the following services:
- Convex (Database & Backend)
- Resend (Email Service)
- Mayar (Payment Gateway)

Follow the detailed setup guides below for each service.

---

## 🗄️ Convex Deployment

Convex provides the database and backend API for your application.

### Why Convex?

Convex is a serverless backend that provides:
- Real-time database with automatic consistency
- Type-safe queries and mutations
- Built-in authentication
- Automatic scaling
- Real-time subscriptions

### Step-by-Step Convex Setup

#### 1. Create a Convex Account

1. Go to [https://convex.dev](https://convex.dev)
2. Click **"Sign Up"**
3. Sign up using GitHub, Google, or email
4. Verify your email if required

#### 2. Create a New Convex Project

**Option A: Using Convex Dashboard (Recommended)**

1. Log in to [https://convex.dev/dashboard](https://convex.dev/dashboard)
2. Click **"Create a new project"**
3. Choose a name for your project (e.g., "tanstack-convex-saas")
4. Select a region (choose the closest to your users)
5. Click **"Create Project"**

**Option B: Using CLI**

```bash
# Install Convex CLI globally
npm install -g convex

# Login to Convex
npx convex login

# Create a new project
npx convex init

# Follow the prompts to create a new project
```

#### 3. Initialize Convex in Your Project

```bash
# Run this in your project root
npx convex dev

# You'll see output like:
# ✓ Created convex/ directory
# ✓ Created convex/README.md
# ✓ Installing dependencies...
# ✓ Setup complete!
```

#### 4. Copy Your Convex URL

1. In your Convex dashboard, click on your project
2. Go to **Settings** → **API Keys**
3. Copy your **Deployment URL** (looks like: `https://your-project-name-123.convex.cloud`)

#### 5. Configure Environment Variable

Add to your `.env` file:

```bash
VITE_CONVEX_URL=https://your-project-name-123.convex.cloud
```

**Important:** The URL must start with `https://` and end with `.convex.cloud`

#### 6. Verify Convex Connection

```bash
# Start the Convex dev server
npx convex dev

# In another terminal, start your app
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and check the browser console. You should see Convex connecting successfully.

#### 7. Deploy to Production (Optional but Recommended)

```bash
# Deploy your Convex backend
npx convex deploy

# This will:
# - Build and deploy your Convex functions
# - Set up production database
# - Provide a production URL
```

**Production URL:** After deployment, update your `.env` file with the production URL from the Convex dashboard.

### Convex Troubleshooting

**Issue: "Cannot connect to Convex"**
```bash
# Solution: Restart Convex dev server
npx convex dev --force
```

**Issue: "Authentication failed"**
```bash
# Solution: Re-login to Convex
npx convex login
```

**Issue: "Project not found"**
- Check that your project name in the URL matches your Convex dashboard
- Ensure you're logged into the correct Convex account

---

## 📧 Resend Setup

Resend handles all transactional emails (welcome emails, payment confirmations, etc.).

### Why Resend?

- Developer-friendly API
- High email deliverability
- Built-in templates
- Event tracking
- Affordable pricing

### Step-by-Step Resend Setup

#### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click **"Start sending"**
3. Sign up with email or GitHub account
4. Verify your email address

#### 2. Verify Your Domain (Recommended)

For production use, verify your domain to improve deliverability:

1. In the Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourapp.com`)
4. Follow the DNS verification steps:
   - Add TXT record to your DNS
   - Add DKIM records to your DNS
5. Wait for verification (can take up to 24 hours)

**Note:** For development, you can skip domain verification and send emails to your own address.

#### 3. Create an API Key

1. In the Resend dashboard, go to **API Keys**
2. Click **"Create API Key"**
3. Give it a name (e.g., "TanStack Convex Boilerplate")
4. Select permissions:
   - ✅ Sending access
   - ✅ Read access
5. Click **"Add"**

#### 4. Copy Your API Key

You should see your API key (starts with `re_`). **Copy it immediately** - you won't be able to see it again!

#### 5. Configure Environment Variable

Add to your `.env` file:

```bash
VITE_RESEND_API_KEY=re_your_api_key_here
```

**Example:**
```bash
VITE_RESEND_API_KEY=re_51abc123def456ghi789jkl012mno345pqr678stu
```

#### 6. Test Resend Integration

Create a test email to verify everything works:

```bash
# Start the development server
npm run dev
```

Try creating an account or making a payment. Check your email inbox (and spam folder) for the confirmation email.

### Resend Troubleshooting

**Issue: "Invalid API key"**
- Ensure the API key is correct (starts with `re_`)
- Check for extra spaces in the `.env` file
- Restart your development server after adding the key

**Issue: "Domain not verified" (Production)**
- For development, this is okay - you can still send emails
- For production, verify your domain in the Resend dashboard
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)

**Issue: "Rate limit exceeded"**
- Free Resend accounts have sending limits
- Check your usage in the Resend dashboard
- Consider upgrading to a paid plan for production

---

## 💳 Mayar Configuration

Mayar is the payment gateway that processes subscription payments.

### Why Mayar?

- Supports multiple payment methods (credit cards, bank transfers, e-wallets)
- Competitive fees
- Developer-friendly API
- Good integration with Indonesian market
- Webhook support for real-time payment verification

### Step-by-Step Mayar Setup

#### 1. Create a Mayar Account

1. Go to [https://mayar.id](https://mayar.id)
2. Click **"Daftar"** (Sign Up)
3. Fill in your details:
   - Business name
   - Email address
   - Phone number
4. Complete the registration process
5. Verify your email and phone number

#### 2. Complete Business Verification

Mayar requires business verification for payment processing:

1. **Identity Verification:**
   - Upload your ID card (KTP/Passport)
   - Verify phone number via OTP

2. **Business Information:**
   - Business type (e.g., SaaS, E-commerce, etc.)
   - Business description
   - Expected monthly transactions

3. **Bank Account:**
   - Provide bank account details for payouts
   - Upload bank account proof

**Note:** This process may take 1-3 business days.

#### 3. Access API Dashboard

1. After verification, log in to Mayar dashboard
2. Go to **"Developer"** or **"API"** section
3. You'll find:
   - API Key
   - API Endpoint URL
   - Webhook URL configuration

#### 4. Get Your API Key

1. In the Mayar dashboard, navigate to **API Settings**
2. Copy your **API Key**
3. Note the **API URL** (usually `https://api.mayar.id`)

#### 5. Configure Environment Variables

Add to your `.env` file:

```bash
MAYAR_API_KEY=your_mayar_api_key_here
MAYAR_API_URL=https://api.mayar.id
```

**Example:**
```bash
MAYAR_API_KEY=mayar_live_abc123def456ghi789jkl012mno345pqr
MAYAR_API_URL=https://api.mayar.id
```

#### 6. Configure Webhook URL (Important!)

For payment verification, configure the webhook URL:

1. In Mayar dashboard, go to **Webhooks**
2. Add webhook URL:
   ```
   https://your-convex-url.convex.cloud/mayar/webhook
   ```
   (Replace with your actual Convex URL)

3. Select events to subscribe to:
   - `payment.success`
   - `payment.failed`
   - `payment.pending`

4. Copy the **Webhook Secret** if provided

#### 7. Test Payment Integration

```bash
# Start the development server
npm run dev
```

To test payments:

1. Register a new account
2. Go to **Settings** → **Billing**
3. Select a subscription plan (Premium or Pro)
4. Complete the payment flow with Mayar's test card (if available)

**Test Cards (if provided by Mayar):**
- Visa: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits

### Mayar Troubleshooting

**Issue: "API key not valid"**
- Ensure the API key is correct
- Check if your account is fully verified
- Try regenerating the API key in Mayar dashboard

**Issue: "Payment not verifying"**
- Check webhook URL configuration
- Verify webhook is receiving events
- Check Convex logs: `npx convex logs`

**Issue: "Merchant not found"**
- Ensure your Mayar account is verified
- Check that you're using the correct environment (sandbox/live)
- Contact Mayar support if issues persist

---

## 🔐 Environment Variables Checklist

After setting up all three services, verify you have the following in your `.env` file:

### Required Variables

```bash
# ✅ Convex Configuration
# Get from: https://convex.dev/dashboard → Your Project → Settings → API
VITE_CONVEX_URL=https://your-project-name-123.convex.cloud

# ✅ Resend Configuration
# Get from: https://resend.com → API Keys
VITE_RESEND_API_KEY=re_your_40_character_api_key

# ✅ Mayar Configuration
# Get from: https://mayar.id → Developer → API Settings
MAYAR_API_KEY=your_mayar_api_key
MAYAR_API_URL=https://api.mayar.id
```

### Optional Variables

```bash
# Application URL (for redirects after payment)
VITE_APP_URL=http://localhost:5173

# For production, update to:
# VITE_APP_URL=https://your-domain.com
```

### Environment File Template

Here's a complete `.env` template:

```bash
# ──────────────────────────────────────────────────────────────
# CONVEX (Required) - Database & Backend
# Get from: https://convex.dev/dashboard
# ──────────────────────────────────────────────────────────────
VITE_CONVEX_URL=https://your-project-name-123.convex.cloud

# ──────────────────────────────────────────────────────────────
# RESEND (Required) - Email Service
# Get from: https://resend.com → API Keys
# ──────────────────────────────────────────────────────────────
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ──────────────────────────────────────────────────────────────
# MAYAR (Required) - Payment Gateway
# Get from: https://mayar.id → Developer → API Settings
# ──────────────────────────────────────────────────────────────
MAYAR_API_KEY=mayar_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MAYAR_API_URL=https://api.mayar.id

# ──────────────────────────────────────────────────────────────
# OPTIONAL - Application Configuration
# ──────────────────────────────────────────────────────────────
VITE_APP_URL=http://localhost:5173
```

### Validating Your Environment Variables

Run this script to check if all variables are set:

```bash
# Check if .env file exists
if [ -f .env ]; then
  echo "✅ .env file exists"
else
  echo "❌ .env file not found"
  exit 1
fi

# Check required variables
echo "Checking required environment variables..."
[ -n "$VITE_CONVEX_URL" ] && echo "✅ VITE_CONVEX_URL is set" || echo "❌ VITE_CONVEX_URL is missing"
[ -n "$VITE_RESEND_API_KEY" ] && echo "✅ VITE_RESEND_API_KEY is set" || echo "❌ VITE_RESEND_API_KEY is missing"
[ -n "$MAYAR_API_KEY" ] && echo "✅ MAYAR_API_KEY is set" || echo "❌ MAYAR_API_KEY is missing"
```

---

## 🚀 Running the Application

### Start Development Servers

Run this command to start everything:

```bash
npm run dev
```

This will start:
- **Vite dev server** at [http://localhost:5173](http://localhost:5173)
- **Convex dev server** (runs automatically)

### Alternative: Start Separately

If you prefer to start servers separately:

```bash
# Terminal 1: Start Convex
npx convex dev

# Terminal 2: Start Vite
npm run dev:web
```

### Verify Everything is Working

1. **Open** [http://localhost:5173](http://localhost:5173) in your browser
2. **Check** the browser console for any errors
3. **Try** to register a new account
4. **Verify** you can log in
5. **Check** email in your inbox (check spam folder too)
6. **Try** viewing the dashboard
7. **Try** upgrading a subscription (with test payment)

---

## 🔧 Next Steps

After successful setup:

1. **Customize the branding**
   - Update app name in `package.json`
   - Update logo and favicon in `public/`
   - Update colors in `src/styles/globals.css`

2. **Set up your subscription plans**
   - Edit pricing in `convex/paymentTransactions.ts`
   - Update plan names and features in the frontend

3. **Customize email templates**
   - Edit email templates in `convex/mayar.ts`
   - Update sender email in Resend dashboard

4. **Configure production deployment**
   - Set up Vercel/Netlify account
   - Configure environment variables in your hosting platform
   - Deploy Convex to production: `npx convex deploy`

5. **Add your own features**
   - Add new pages in `src/routes/`
   - Add new Convex functions in `convex/`
   - Customize the UI components in `src/components/`

---

## 📞 Getting Help

If you encounter issues:

1. **Check the logs:**
   ```bash
   # Convex logs
   npx convex logs

   # Application logs (in browser console)
   # Open DevTools → Console
   ```

2. **Verify all environment variables** using the checklist above

3. **Restart the development servers:**
   ```bash
   # Stop all servers (Ctrl+C)
   npm run dev
   ```

4. **Check official documentation:**
   - [Convex Docs](https://docs.convex.dev)
   - [Resend Docs](https://resend.com/docs)
   - [Mayar Docs](https://docs.mayar.id)

5. **Common issues:**
   - Port 5173 already in use: Kill the process or use a different port
   - Module not found: Run `npm install` again
   - Convex connection failed: Check your internet connection and Convex URL

---

## ✅ Setup Complete!

Once all steps are completed, you should have:

- ✅ Convex backend running
- ✅ Email service configured (Resend)
- ✅ Payment gateway configured (Mayar)
- ✅ All environment variables set
- ✅ Application running on localhost:5173

You're ready to start building! Check out the README.md for next steps and the API.md for detailed API documentation.