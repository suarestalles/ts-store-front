import { Product } from "../product/types"
import { IUser } from "../user/types"

export interface Favorite {
    id: string
    createdAd: string
    userId: string
    productId: string
    user: IUser
    product: Product
}