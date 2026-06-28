import { Category } from "./category"
import { ProductImage } from "./productImage"

export interface Product {
    id: string
    name: string
    price: number
    description: string
    createdAt: string
    updatedAt: string
    category: Category
    images: ProductImage[]
}