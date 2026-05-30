import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  images: string[]
  model3d?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  trackingCode?: string
  customerName: string
  customerPhone: string
  customerAddress: string
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  createdAt: string
}

interface StoreState {
  // Products
  products: Product[]
  
  // Cart
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  isInCart: (productId: string) => boolean
  
  // Favorites
  favorites: string[]
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  
  // Orders (for admin)
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  updateTrackingCode: (orderId: string, trackingCode: string) => void
  
  // Products management
  addProduct: (product: Product) => void
  updateProduct: (productId: string, updates: Partial<Product>) => void
  deleteProduct: (productId: string) => void
  
  // Customers
  customers: Customer[]
  addCustomer: (customer: Customer) => void
  
  // User
  user: {
    name: string
    email: string
    phone: string
    address: string
  } | null
  setUser: (user: StoreState['user']) => void
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Chair',
    category: 'Furniture',
    price: 299.99,
    description: 'A beautifully crafted modern chair with ergonomic design. Perfect for home office or living room. Made with premium materials for lasting comfort.',
    images: ['/products/chair-1.jpg', '/products/chair-2.jpg'],
  },
  {
    id: '2',
    name: 'Desk Lamp',
    category: 'Lighting',
    price: 89.99,
    description: 'Sleek LED desk lamp with adjustable brightness and color temperature. Touch controls and modern aesthetic design.',
    images: ['/products/lamp-1.jpg', '/products/lamp-2.jpg'],
  },
  {
    id: '3',
    name: 'Coffee Table',
    category: 'Furniture',
    price: 449.99,
    description: 'Minimalist coffee table with natural wood finish. Spacious surface area with hidden storage compartment.',
    images: ['/products/table-1.jpg', '/products/table-2.jpg'],
  },
  {
    id: '4',
    name: 'Ceramic Vase',
    category: 'Decor',
    price: 79.99,
    description: 'Hand-crafted ceramic vase with unique glazed finish. Perfect centerpiece for any room.',
    images: ['/products/vase-1.jpg', '/products/vase-2.jpg'],
  },
  {
    id: '5',
    name: 'Wall Clock',
    category: 'Decor',
    price: 129.99,
    description: 'Contemporary wall clock with silent movement. Elegant design that complements any interior style.',
    images: ['/products/clock-1.jpg', '/products/clock-2.jpg'],
  },
  {
    id: '6',
    name: 'Bookshelf',
    category: 'Furniture',
    price: 599.99,
    description: 'Modular bookshelf system with customizable configuration. Solid wood construction with metal accents.',
    images: ['/products/shelf-1.jpg', '/products/shelf-2.jpg'],
  },
  {
    id: '7',
    name: 'Floor Lamp',
    category: 'Lighting',
    price: 199.99,
    description: 'Elegant floor lamp with adjustable arm. Provides ambient lighting with dimmable LED bulb.',
    images: ['/products/floorlamp-1.jpg', '/products/floorlamp-2.jpg'],
  },
  {
    id: '8',
    name: 'Decorative Bowl',
    category: 'Decor',
    price: 59.99,
    description: 'Artisan decorative bowl perfect for displaying or as a standalone piece. Made from recycled materials.',
    images: ['/products/bowl-1.jpg', '/products/bowl-2.jpg'],
  },
]

// Sample orders for admin
const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      { product: sampleProducts[0], quantity: 2 },
      { product: sampleProducts[1], quantity: 1 },
    ],
    total: 689.97,
    status: 'processing',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    customerAddress: '123 Main St, City, Country',
    createdAt: '2026-05-20T10:30:00Z',
  },
  {
    id: 'ORD-002',
    items: [
      { product: sampleProducts[2], quantity: 1 },
    ],
    total: 449.99,
    status: 'shipped',
    trackingCode: 'TRK123456789',
    customerName: 'Jane Smith',
    customerPhone: '+0987654321',
    customerAddress: '456 Oak Ave, Town, Country',
    createdAt: '2026-05-19T14:15:00Z',
  },
  {
    id: 'ORD-003',
    items: [
      { product: sampleProducts[3], quantity: 3 },
      { product: sampleProducts[4], quantity: 1 },
    ],
    total: 369.96,
    status: 'delivered',
    trackingCode: 'TRK987654321',
    customerName: 'Bob Wilson',
    customerPhone: '+1122334455',
    customerAddress: '789 Pine Rd, Village, Country',
    createdAt: '2026-05-15T09:00:00Z',
  },
  {
    id: 'ORD-004',
    items: [
      { product: sampleProducts[5], quantity: 1 },
      { product: sampleProducts[6], quantity: 2 },
    ],
    total: 999.97,
    status: 'pending',
    customerName: 'Alice Brown',
    customerPhone: '+5566778899',
    customerAddress: '321 Elm St, Metro, Country',
    createdAt: '2026-05-22T16:45:00Z',
  },
]

// Sample customers
const sampleCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    totalOrders: 5,
    totalSpent: 1899.95,
    createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+0987654321',
    address: '456 Oak Ave, Town, Country',
    totalOrders: 3,
    totalSpent: 1249.97,
    createdAt: '2026-02-20T10:30:00Z',
  },
  {
    id: 'CUST-003',
    name: 'Bob Wilson',
    email: 'bob.wilson@email.com',
    phone: '+1122334455',
    address: '789 Pine Rd, Village, Country',
    totalOrders: 8,
    totalSpent: 3599.92,
    createdAt: '2025-11-05T14:00:00Z',
  },
  {
    id: 'CUST-004',
    name: 'Alice Brown',
    email: 'alice.brown@email.com',
    phone: '+5566778899',
    address: '321 Elm St, Metro, Country',
    totalOrders: 2,
    totalSpent: 999.97,
    createdAt: '2026-04-10T09:15:00Z',
  },
  {
    id: 'CUST-005',
    name: 'Carlos Rivera',
    email: 'carlos.r@email.com',
    phone: '+9988776655',
    address: '555 Beach Blvd, Coast City, Country',
    totalOrders: 12,
    totalSpent: 5499.88,
    createdAt: '2025-08-22T11:45:00Z',
  },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: sampleProducts,
      
      // Cart
      cart: [],
      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find((item) => item.product.id === product.id)
        
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] })
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.product.id !== productId) })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },
      isInCart: (productId) => get().cart.some((item) => item.product.id === productId),
      
      // Favorites
      favorites: [],
      toggleFavorite: (productId) => {
        const favorites = get().favorites
        if (favorites.includes(productId)) {
          set({ favorites: favorites.filter((id) => id !== productId) })
        } else {
          set({ favorites: [...favorites, productId] })
        }
      },
      isFavorite: (productId) => get().favorites.includes(productId),
      
      // Orders
      orders: sampleOrders,
      addOrder: (order) => set({ orders: [...get().orders, order] }),
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        })
      },
      updateTrackingCode: (orderId, trackingCode) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId ? { ...order, trackingCode } : order
          ),
        })
      },
      
      // Products management
      addProduct: (product) => set({ products: [...get().products, product] }),
      updateProduct: (productId, updates) => {
        set({
          products: get().products.map((product) =>
            product.id === productId ? { ...product, ...updates } : product
          ),
        })
      },
      deleteProduct: (productId) => {
        set({ products: get().products.filter((product) => product.id !== productId) })
      },
      
      // Customers
      customers: sampleCustomers,
      addCustomer: (customer) => set({ customers: [...get().customers, customer] }),
      
      // User
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: '3d-store-storage',
    }
  )
)
