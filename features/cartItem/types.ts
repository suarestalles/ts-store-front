import { Cart } from "../cart/types"
import { Product } from "../product/types"

export interface CartItem {
    id: string
    quantity: number
    cartId: string
    productId: string
    cart: Cart
    product: Product
}

export interface CartItemsResponse {
    items: CartItem[]
    totalItems: number
    subtotal: number
}

export interface CartItemCreate {
    productId: string
}

export interface CartItemUpdateQuantity {
    cartItemId: string
    quantity: number
}