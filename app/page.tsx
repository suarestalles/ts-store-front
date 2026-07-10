'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Filter, Search } from 'lucide-react'
import { getProductByCategory, getProducts } from '@/features/product/products.service'
import { Product } from '@/features/product/types'
import { Category } from '@/features/category/types'
import { getCategories } from '@/features/category/category.service'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await getCategories()
        setCategories(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    loadCategories();
  }, [])

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = selectedCategory
          ? await getProductByCategory(selectedCategory.id)
          : await getProducts();
        setProducts(response.data.data)
        
      } catch (error) {
        console.error(error);
      }
    }
    loadProducts()
    
  }, [selectedCategory]);

  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();

  const filteredProducts = useMemo(() => {
    const query = normalize(searchQuery);

    if (!query) return products;

    return products.filter((product) => {
      return (
        normalize(product.name).includes(query) ||
        normalize(product.description).includes(query) ||
        normalize(product.category.name).includes(query)
      );
    });
  }, [products, searchQuery]);

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
        <section className="mb-8 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory?.name === category.name
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-primary border border-border rounded-lg text-primary-foreground placeholder:text-sidebar-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
