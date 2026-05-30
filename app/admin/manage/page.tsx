'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  DollarSign,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Link as LinkIcon,
} from 'lucide-react'
import { useStore, Product, Customer } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Tab = 'products' | 'customers'

export default function AdminManagePage() {
  const { products, updateProduct, addProduct, deleteProduct, customers } = useStore()
  const [activeTab, setActiveTab] = useState<Tab>('products')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  // Product editing state
  const [editForm, setEditForm] = useState<Partial<Product>>({})
  
  // New product modal
  const [showNewProductModal, setShowNewProductModal] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Furniture',
    price: 0,
    description: '',
    images: [],
  })
  
  // Image management state
  const [newImageUrl, setNewImageUrl] = useState('')
  const [editImageUrl, setEditImageUrl] = useState('')
  
  // Edit product modal (for images)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editModalProduct, setEditModalProduct] = useState<Product | null>(null)

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Filter customers
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  )

  const categories = ['Furniture', 'Lighting', 'Decor']

  const handleEditProduct = (product: Product) => {
    setEditModalProduct(product)
    setEditForm({ ...product })
    setShowEditModal(true)
    setEditImageUrl('')
  }

  const handleSaveEdit = (productId: string) => {
    if (editForm.name && editForm.price) {
      updateProduct(productId, editForm)
      setShowEditModal(false)
      setEditModalProduct(null)
      setEditForm({})
      setEditImageUrl('')
    }
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setEditModalProduct(null)
    setEditForm({})
    setEditImageUrl('')
  }
  
  // Image management functions
  const handleAddImageToNew = () => {
    if (newImageUrl.trim()) {
      setNewProduct({
        ...newProduct,
        images: [...(newProduct.images || []), newImageUrl.trim()],
      })
      setNewImageUrl('')
    }
  }
  
  const handleRemoveImageFromNew = (index: number) => {
    setNewProduct({
      ...newProduct,
      images: (newProduct.images || []).filter((_, i) => i !== index),
    })
  }
  
  const handleAddImageToEdit = () => {
    if (editImageUrl.trim()) {
      setEditForm({
        ...editForm,
        images: [...(editForm.images || []), editImageUrl.trim()],
      })
      setEditImageUrl('')
    }
  }
  
  const handleRemoveImageFromEdit = (index: number) => {
    setEditForm({
      ...editForm,
      images: (editForm.images || []).filter((_, i) => i !== index),
    })
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId)
    }
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product: Product = {
        id: `PROD-${Date.now()}`,
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price,
        description: newProduct.description || '',
        images: newProduct.images || [],
      }
      addProduct(product)
      setShowNewProductModal(false)
      setNewProduct({
        name: '',
        category: 'Furniture',
        price: 0,
        description: '',
        images: [],
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-primary backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-primary-foreground bg-primary hover:text-foreground transition-colors p-2 rounded-md border"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold text-primary-foreground">Manage Store</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === 'products'
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary text-secondary-foreground hover:text-foreground'
            )}
          >
            <Package className="w-4 h-4" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === 'customers'
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary text-secondary-foreground hover:text-foreground'
            )}
          >
            <Users className="w-4 h-4" />
            Customers
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground" />
            <input
              type="text"
              placeholder={activeTab === 'products' ? 'Search products...' : 'Search customers...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-primary border border-border rounded-lg text-primary-foreground placeholder:text-sidebar-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          {activeTab === 'products' && (
            <>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 bg-primary border border-border rounded-lg text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button onClick={() => setShowNewProductModal(true)} className="flex items-center gap-2 bg-secondary px-4 py-5 hover:bg-secondary transition-colors border border-border rounded-lg">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </>
          )}
        </div>

        {/* Products Tab Content */}
        {activeTab === 'products' && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm text-primary-foreground">Product</th>
                    <th className="text-left px-6 py-4 text-sm text-primary-foreground">Category</th>
                    <th className="text-left px-6 py-4 text-sm text-primary-foreground">Price</th>
                    <th className="text-left px-6 py-4 text-sm text-primary-foreground">Images</th>
                    <th className="text-left px-6 py-4 text-sm text-primary-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium',
                          product.category === 'Furniture' && 'bg-blue-500/20 text-blue-500',
                          product.category === 'Lighting' && 'bg-yellow-500/20 text-yellow-500',
                          product.category === 'Decor' && 'bg-green-500/20 text-green-500'
                        )}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground">${product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {product.images?.length || 0} image{(product.images?.length || 0) !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProducts.length === 0 && (
              <div className="p-12 text-center">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        )}

        {/* Customers Tab Content */}
        {activeTab === 'customers' && (
          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-card rounded-xl border border-border p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        {customer.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 lg:gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <ShoppingBag className="w-4 h-4" />
                        <span className="text-xs">Orders</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">{customer.totalOrders}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs">Total Spent</span>
                      </div>
                      <p className="text-xl font-bold text-primary">${customer.totalSpent.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">Member Since</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredCustomers.length === 0 && (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No customers found</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* New Product Modal */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Add New Product</h2>
              <button
                onClick={() => setShowNewProductModal(false)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Product name"
                  className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-2 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Product description"
                  rows={3}
                  className="w-full px-4 py-2 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              
              {/* Images Section */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Images</label>
                <div className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Enter image URL"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImageToNew())}
                      className="w-full pl-10 pr-4 py-2 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button type="button" onClick={handleAddImageToNew} variant="outline" size="icon" className="hover:bg-primary transition-colors">
                    <Plus className="w-4 h-4 text-primary-foreground" />
                  </Button>
                </div>
                {newProduct.images && newProduct.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {newProduct.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImageFromNew(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {(!newProduct.images || newProduct.images.length === 0) && (
                  <p className="text-xs text-muted-foreground mt-1">No images added yet</p>
                )}
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowNewProductModal(false)}
                  className="flex-1 bg-secondary text-primary-foreground"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProduct}
                  className="flex-1 bg-primary"
                  disabled={!newProduct.name || !newProduct.price}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Edit Product</h2>
              <button
                onClick={handleCancelEdit}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Product name"
                    className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <select
                    value={editForm.category || ''}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.price || 0}
                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Product description"
                  rows={3}
                  className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              {/* Images Section */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Product Images ({editForm.images?.length || 0})
                  </div>
                </label>
                
                {/* Add Image Input */}
                <div className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={editImageUrl}
                      onChange={(e) => setEditImageUrl(e.target.value)}
                      placeholder="Enter image URL"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImageToEdit())}
                      className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <Button type="button" onClick={handleAddImageToEdit} variant="outline" className="hover:bg-primary transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                {/* Image Gallery */}
                {editForm.images && editForm.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {editForm.images.map((img, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={img}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border border-border"
                        />
                        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveImageFromEdit(index)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="absolute bottom-1 left-1 bg-background/80 text-xs px-1.5 py-0.5 rounded text-foreground">
                          #{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No images added</p>
                    <p className="text-xs text-muted-foreground mt-1">Add image URLs above</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex-1 bg-secondary text-primary-foreground"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSaveEdit(editModalProduct.id)}
                  className="flex-1"
                  disabled={!editForm.name || !editForm.price}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
