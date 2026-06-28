'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Filter } from 'lucide-react'
import { Product } from '@/lib/types/product'
import { ProductImage } from '@/lib/types/productImage'
import { getProducts } from '@/services/products.service'

const categories = ['All', 'Furniture', 'Lighting', 'Decor']

export default function HomePage() {
  // const { products } = useStore()
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // const filteredProducts = useMemo(() => {
  //   return products.filter((product) => {
  //     const matchesSearch =
  //       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchQuery.toLowerCase())
  //     const matchesCategory =
  //       selectedCategory === 'All' || product.category.name === selectedCategory
  //     return matchesSearch && matchesCategory
  //   })
  // }, [products, searchQuery, selectedCategory])

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts();
        setProducts(response)
      } catch (error) {
        console.error(error);
      }
    }
    loadProducts();
  }, []); 

  return (
    <div className="min-h-screen bg-card">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover 3D Objects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of beautifully designed objects with immersive 3D previews. 
            Find the perfect piece for your space.
          </p>
        </section>

        {/* Category Filter */} 
        <section className="mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
