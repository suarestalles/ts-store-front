'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Heart, User, Menu, X, Package, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProfilePopup } from '@/features/auth/components/ProfilePopup'
import { useFavorite } from '@/features/favorite/useFavorite'
import { useAuth } from '@/features/auth/useAuth'
import { useCartItem } from '@/features/cartItem/useCartItem'
import { RiFilePaper2Line } from "react-icons/ri"

interface HeaderProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const { isAuthenticated, openLogin } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { favoritesCount } = useFavorite()
  const { cartItemsCount } = useCartItem()


  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Package className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground hidden sm:inline">3D Store</span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-primary border border-border rounded-lg text-primary-foreground placeholder:text-sidebar-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center gap-2">
              {/* Favorites */}
              <Link
                href="/favorites"
                onClick={async (e) => {
                  if (!isAuthenticated) {
                    e.preventDefault()
                    openLogin()
                  }
                }}
                className="relative p-2 rounded-lg hover:bg-primary transition-colors"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5 text-foreground hover:text-primary-foreground transition-colors" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                onClick={async (e) => {
                  if (!isAuthenticated) {
                    e.preventDefault()
                    openLogin()
                  }
                }}
                className="relative p-2 rounded-lg hover:bg-primary transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-foreground hover:text-primary-foreground transition-colors" />
                {/* {cartItemsCount > 0 && ( */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    { cartItemsCount }
                  </span>
                {/* )} */}
              </Link>

              {/* Orders */}
              <button
                onClick={() => openLogin()}
                className="p-2 rounded-lg hover:bg-primary transition-colors"
                aria-label="Order"
              >
                <RiFilePaper2Line className="w-5 h-5 text-foreground hover:text-primary-foreground transition-colors" />
              </button>

              {/* Profile */}
              <button
                onClick={() => openLogin()}
                className="p-2 rounded-lg hover:bg-primary transition-colors"
                aria-label="Profile"
              >
                <User className="w-5 h-5 text-foreground hover:text-primary-foreground transition-colors" />
              </button>

              {/* Admin Link */}
              <Link
                href="/admin"
                className="hidden sm:flex p-2 rounded-lg hover:bg-primary transition-colors"
                aria-label="Admin Dashboard"
              >
                <Settings className="w-5 h-5 text-foreground hover:text-primary-foreground transition-colors" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors md:hidden"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-20 pb-4' : 'max-h-0'
          )}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <ProfilePopup/>
    </>
  )
}
