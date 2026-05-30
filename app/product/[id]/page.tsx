'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Heart, ShoppingCart, CreditCard } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Product3DViewer } from '@/components/product-3d-viewer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const { products, addToCart, toggleFavorite, isFavorite } = useStore()

  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const favorite = isFavorite(product.id)

  const handleBuyNow = () => {
    addToCart(product)
    window.location.href = '/cart'
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
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 3D Viewer */}
          <div className="relative aspect-square bg-primary/60 rounded-2xl overflow-hidden border border-border">
            <Product3DViewer category={product.category} className="h-full" />
            
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className={cn(
                'absolute top-4 right-4 p-3 rounded-full transition-all duration-200 z-10',
                favorite
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-accent hover:bg-card'
              )}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={cn('w-6 h-6', favorite && 'fill-current')} />
            </button>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-primary rounded-full text-primary-foreground">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-secondary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleBuyNow}
              >
                <CreditCard className="w-5 h-5" />
                Buy Now
              </Button>
            </div>

            {/* Product Features */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Premium quality materials
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Modern and elegant design
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Easy to assemble
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Free shipping on orders over $200
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
