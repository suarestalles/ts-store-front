'use client'

import Link from 'next/link'
import { ArrowLeft, ShoppingBag} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/useAuth'
import { formatCurrency } from '@/lib/currency'
import { useOrder } from '@/features/order/useOrder'
import { GiShoppingBag } from "react-icons/gi"

export default function OrderPage() {
  const { isAuthenticated, openLogin } = useAuth();
  const { orders } = useOrder()

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-card">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Your don't have any order</h1>
            <p className="text-muted-foreground mb-8">
              It looks like you haven&apos;t placed any orders yet.
            </p>
              <div className="flex justify-center gap-4">
                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
                {!isAuthenticated ? <Button
                  onClick={async (e) => {
                    if (!isAuthenticated) {
                      e.preventDefault()
                      openLogin()
                    }
                  }}>
                  Login
                </Button> : null}
              </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-card">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-foreground bg-primary hover:text-foreground transition-colors mb-8 p-2 rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">Orders</h1>

        <div className="grid gap-8">
          {/* Cart Items */}
          <div className="w-full space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                {/* Product Image Placeholder */}
                <div className="w-24 h-24 bg-background rounded-lg flex items-center justify-center shrink-0">
                  <GiShoppingBag className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    Order: {order.id.substring(order.id.length - 8, order.id.length).toUpperCase()}
                  </h3>
                  {order.items.map((item) => {
                    return <div key={item.id} className="flex justify-between">
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.productName}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        QTD: {item.quantity} = {formatCurrency(item.subtotal)}
                      </p>

                    </div>
                    })}
                  <div className="flex justify-between">
                    <p className="font-bold text-lg text-foreground">
                      TOTAL:
                    </p>
                    <p className="font-bold text-lg text-foreground">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <p className="text-foreground">{Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(order.createdAt))}</p>
                    <button
                      className="pl-4 pr-4 h-8 flex items-center justify-center bg-background rounded-lg hover:bg-secondary/80 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <p>{order.status}</p>
                    </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
