'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  ArrowLeft,
  Calendar,
  Search,
  Filter,
  Edit2,
  Truck,
  Check,
  Clock,
  X,
  Settings,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const statusColors = {
  pending: 'bg-secondary/20 text-secondary/60 border-secondary/30',
  processing: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
  shipped: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
  delivered: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
}

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: Check,
}

export default function AdminPage() {
  const { orders, updateOrderStatus, updateTrackingCode } = {[], () => {}, () => {}}
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [editingOrder, setEditingOrder] = useState<string | null>(null)
  const [trackingInput, setTrackingInput] = useState('')

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Weekly sales data
  const weeklySales = [
    { day: 'Mon', sales: 1200 },
    { day: 'Tue', sales: 1800 },
    { day: 'Wed', sales: 1400 },
    { day: 'Thu', sales: 2200 },
    { day: 'Fri', sales: 1900 },
    { day: 'Sat', sales: 2800 },
    { day: 'Sun', sales: 2100 },
  ]

  // Monthly sales data
  const monthlySales = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 14000 },
    { month: 'May', revenue: 22000 },
  ]

  // Order status distribution
  const statusDistribution = [
    { name: 'Pending', value: orders.filter((o) => o.status === 'pending').length, color: 'var(--secondary)' },
    { name: 'Processing', value: orders.filter((o) => o.status === 'processing').length, color: 'var(--chart-2)' },
    { name: 'Shipped', value: orders.filter((o) => o.status === 'shipped').length, color: 'var(--chart-3)' },
    { name: 'Delivered', value: orders.filter((o) => o.status === 'delivered').length, color: 'var(--chart-4)' },
  ]

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus)
  }

  const handleTrackingUpdate = (orderId: string) => {
    if (trackingInput.trim()) {
      updateTrackingCode(orderId, trackingInput.trim())
      setEditingOrder(null)
      setTrackingInput('')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary-foreground bg-card/50 hover:text-foreground transition-colors p-2 rounded-md border"
              >
                <ArrowLeft className="w-4 h-4 text-primary-foreground" />
                Back to Store
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold text-primary-foreground">Admin Dashboard</h1>
            </div>
            <Link href="/admin/manage">
              <Button variant="outline" className="flex items-center gap-2 bg-card/50 hover:bg-background transition-colors">
                <Settings className="w-4 h-4 text-primary-foreground transition-colors" />
                <span className="hidden sm:inline text-primary-foreground" >Manage Products & Customers</span>
                <span className="sm:hidden">Manage</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-primary-foreground">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-primary-foreground">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                <p className="text-2xl font-bold text-primary-foreground">
                  ${avgOrderValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-primary-foreground">
                  {orders.filter((o) => o.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Sales Chart */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-primary-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Weekly Sales
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                This Week
              </div>
            </div>
            <div className="h-84">
              <ResponsiveContainer width="100%" height="100%"  style={{paddingBottom: 100}}>
                <BarChart data={weeklySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="var(--foreground)" />
                  <YAxis stroke="var(--foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--primary)',
                      border: '1px solid var(--border)',
                      borderRadius: '18px',
                    }}
                    position={{x: 20, y: 250}}
                    itemStyle={{color: 'var(--primary-foreground)', fontWeight: 'bold'}}
                    labelStyle={{color: 'var(--primary-foreground)'}}
                  />
                  <Bar dataKey="sales" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Distribution */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-primary-foreground mb-6">
              Order Status
            </h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid white',
                      borderRadius: '8px',
                    }}
                    itemStyle={{color: 'white'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-foreground">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Monthly Revenue
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                />
                <Line
                  type="linear"
                  dataKey="revenue"
                  stroke="var(--secondary)"
                  strokeWidth={4}
                  dot={{ fill: 'var(--secondary)', r: 5}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Management Section */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <h2 className="text-lg font-semibold text-primary-foreground flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Management
              </h2>
              <div className="flex gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-primary border border-border rounded-lg text-primary-foreground placeholder:text-sidebar-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                {/* Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left px-6 py-4 text-sm text-primary-foreground">
                    Order ID
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-primary-foreground">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-primary-foreground">
                    Items
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-primary-foreground">
                    Total
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-primary-foreground">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-primary-foreground">
                    Tracking
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-primary-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status]
                  return (
                    <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-primary-foreground">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-primary-foreground">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-muted-foreground">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-primary-foreground">
                          ${order.total.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as Order['status'])
                          }
                          className={cn(
                            'px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer focus:outline-none',
                            statusColors[order.status]
                          )}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {editingOrder === order.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={trackingInput}
                              onChange={(e) => setTrackingInput(e.target.value)}
                              placeholder="Enter code"
                              className="w-32 px-2 py-1 text-sm bg-background/40 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                              onClick={() => handleTrackingUpdate(order.id)}
                              className="p-1 text-green-500 hover:bg-green-500/10 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingOrder(null)
                                setTrackingInput('')
                              }}
                              className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {order.trackingCode || '-'}
                            </span>
                            <button
                              onClick={() => {
                                setEditingOrder(order.id)
                                setTrackingInput(order.trackingCode || '')
                              }}
                              className="p-1 text-muted-foreground hover:text-primary-foreground hover:bg-primary rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            alert(
                              `Order Details:\n\nCustomer: ${order.customerName}\nPhone: ${order.customerPhone}\nAddress: ${order.customerAddress}\n\nItems:\n${order.items.map((i) => `- ${i.product.name} x ${i.quantity}`).join('\n')}`
                            )
                          }}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
