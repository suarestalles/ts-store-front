'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCartItem } from '@/features/cartItem/useCartItem'
import { useAuth } from '@/features/auth/useAuth'
import { FaWhatsapp } from "react-icons/fa"
import { formatCurrency } from '@/lib/currency'

export default function CartPage() {
  const { cartItems, updateQuantity, clearCart, removeCartItem, finishCart } = useCartItem();
  const { user, isAuthenticated, openLogin } = useAuth();

  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return ''

    let message = `*New Order from 3D Store*\n\n`
    message += `*Customer Information:*\n`
    message += `Name: ${customerInfo.name}\n`
    message += `Phone: ${customerInfo.phone}\n`
    message += `Address: ${customerInfo.address}\n\n`
    message += `*Order Details:*\n`
    message += `------------------------\n`

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`
      message += `   Qty: ${item.quantity} x ${formatCurrency(item.product.price)}\n`
      message += `   Subtotal: ${formatCurrency(item.product.price * item.quantity)}\n\n`
    })

    message += `------------------------\n`
    message += `*TOTAL: ${calculateTotal()}*\n`

    return encodeURIComponent(message)
  }

  async function handleWhatsAppOrder() {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all customer information')
      return
    }

    const message = generateWhatsAppMessage()
    const whatsappNumber = '5564996144837'
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
    if(cartItems.length === 0) return ''
    const cart = cartItems.at(0)
    await finishCart(cart!.cartId)
  }

  function calculateTotal() {
    const subTotal = cartItems.reduce((total, item) => {
      return total + ((item.product.price) * (item.quantity))
    }, 0)
    return formatCurrency(subTotal)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-card">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added any items yet.
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

        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                {/* Product Image Placeholder */}
                <div className="w-24 h-24 bg-background rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.product.category.name}
                  </p>
                  <p className="font-semibold text-primary">
                    {formatCurrency(item.product.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={async (e) => {
                      e.preventDefault()
                      await removeCartItem(item.id)
                    }}
                    // onClick={() => {}}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={async (e) => {
                        if ((item.quantity - 1) === 0) return
                        e.preventDefault()
                        await updateQuantity(item.id, item.quantity - 1)}
                      }
                      className="w-8 h-8 flex items-center justify-center bg-background rounded-lg hover:bg-secondary/80 transition-colors"
                      aria-label="Decrease quantity"
                      >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={async (e) => {
                        e.preventDefault()
                        await updateQuantity(item.id, item.quantity + 1)}
                      }
                      className="w-8 h-8 flex items-center justify-center bg-background rounded-lg hover:bg-secondary/80 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-bold text-lg text-foreground">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full bg-primary text-primary-foreground"
              // onClick={clearCart}
              onClick={async (e) => {
                e.preventDefault()
                await clearCart()
              }}
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Items Summary */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="text-secondary font-medium">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-primary">Total</span>
                  <span className="text-primary text-bold">{calculateTotal()}</span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-foreground">
                  Delivery Information
                </h3>
                <input
                  type="text"
                  placeholder="Your name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Delivery address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>

              {/* WhatsApp Order Button */}
              <Button
                className="w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white"
                size="lg"
                onClick={async (e) => {
                  e.preventDefault()
                  await handleWhatsAppOrder()
                }}
              >
                <FaWhatsapp className="w-5 h-5"/>
                Order via WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Your order details will be sent to our WhatsApp for processing.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
