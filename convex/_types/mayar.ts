// Mayar API type definitions

export interface MayarInvoice {
  customer_name: string
  customer_email: string
  customer_mobile: string
  description: string
  amount: number
  currency: string
  callback_url?: string
  redirect_url?: string
  metadata?: Record<string, any>
}

export interface MayarInvoiceResponse {
  success: boolean
  message?: string
  data?: {
    id: string
    payment_url: string
    [key: string]: any
  }
}

export interface MayarTransactionResponse {
  success: boolean
  message?: string
  data?: {
    id: string
    status: string
    amount: number
    currency: string
    customer_name?: string
    customer_email?: string
    created_at?: string
    updated_at?: string
    metadata?: Record<string, any>
    [key: string]: any
  }
}

export interface MayarWebhookPayload {
  id: string
  event: string
  data: {
    id: string
    status: string
    amount: number
    currency: string
    customer_name?: string
    customer_email?: string
    created_at: string
    updated_at: string
    metadata?: Record<string, any>
  }
}