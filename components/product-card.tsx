'use client'

import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/lib/types/product'
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // IMPLEMENT
  // const { toggleFavorite, isFavorite, addToCart, isInCart } = useStore()
  // const favorite = isFavorite(product.id)

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
      {/* 3D View */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-56 bg-primary cursor-pointer">
          {/* <Product3DViewer category={product.category.name} /> */}
          <Image
            src={`${product.images[0]}`}
            alt="Abajur Image"
            fill={true}
            loading='eager'
          ></Image>
          <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            // toggleFavorite(product.id)
          }}
          className={cn(
            'p-2 rounded-full transition-all duration-200',
            // IMPLEMENT
            // favorite
            true
              ? 'bg-accent text-accent-foreground'
              : 'bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-accent hover:bg-card'
          )}
          aria-label={
            // IMPLEMENT
            // favorite ? 'Remove from favorites' : 'Add to favorites'
            true ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          <Heart className={
              // IMPLEMENT
              // cn('w-5 h-5', favorite && 'fill-current')
              cn('w-5 h-5', true && 'fill-current')
            } />
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            // IMPLEMENT
            // addToCart(product)
          }}
          className={cn(
            'p-2 rounded-full transition-all duration-200',
            // IMPLEMENT
            // isInCart(product.id)
            true
              ? 'bg-primary text-primary-foreground'
              : 'bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:bg-card'
          )}
          aria-label={
            // IMPLEMENT
            // isInCart(product.id) ? 'Already in cart' : 'Add to cart'
            true ? 'Already in cart' : 'Add to cart'
          }
        >
          <ShoppingCart className={
            // IMPLEMENT
            // cn('w-5 h-5', isInCart(product.id) && 'fill-current')
            cn('w-5 h-5', true && 'fill-current')
          } />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-primary rounded-full text-primary-foreground">
            {product.category.name}
          </span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-card-foreground group-hover:text-secondary transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-secondary">
            ${product.price.toFixed(2)}
          </span>
          <Link
            href={`/product/${product.id}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}
