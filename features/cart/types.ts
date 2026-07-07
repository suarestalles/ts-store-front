import { CartItem } from "../cartItem/types"
import { IUser } from "../user/types"

export interface Cart {
    id: string
    createdAt: string
    updatedAt: string
    userId: string
    user: IUser
    items: CartItem[]
}