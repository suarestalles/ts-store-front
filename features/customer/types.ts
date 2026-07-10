import { Order } from "../order/types"
import { IUser } from "../user/types"

export interface Customer {
    id: string
    name: string
    email: string
    phone: string
    address: string
    totalOrders: number
    totalSpent: number
    createdAt: string
    updatedAt: string
    userId: string
    user: IUser
    orders: Order[]
}