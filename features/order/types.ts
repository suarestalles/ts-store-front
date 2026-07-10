import { Customer } from "../customer/types"
import { OrderItem } from "../orderItem/types"

export enum OrderStatus {
    PENDING,
    CONFIRMED,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED,
}

export interface Order {
    id: string
    createdAt: string
    updatedAt: string
    status: OrderStatus
    total: number
    items: OrderItem[]
    customerId?: string
    customerName?: string
    customerEmail?: string
    customerPhone?: string
    customerAddress?: string
    trackingCode?: string
    customer?: Customer
}

export interface ChangeTrackingData {
    id: string
    trackingCode: string
}

export interface UpdateStatusData {
    id: string
    status: string
}