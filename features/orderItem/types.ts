import { Order } from "../order/types"
import { Product } from "../product/types"

export interface OrderItem {
    id: string
    quantity: number
    unitPrice: number
    subtotal: number
    orderId: string
    order: Order
    productId: string
    productName: string
    product: Product
}