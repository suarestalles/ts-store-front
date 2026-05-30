'use client'

import Link from 'next/link'
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'

export default function FavoritesPage() {
  const { products, favorites } = useStore()

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  )

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
          Back to Products
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-muted-foreground" />
          <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
          <span className="px-3 py-1 bg-secondary text-primary-foreground rounded-full text-sm font-medium">
            {favorites.length} items
          </span>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No favorites yet
            </h2>
            <p className="text-muted-foreground mb-8">
              Start adding products to your favorites by clicking the heart icon.
            </p>
            <Link href="/">
              <Button className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
