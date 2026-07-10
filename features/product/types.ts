import { Category } from "../category/types"
import { Favorite } from "../favorite/types"
import { ProductImage } from "../productImage/types"

export interface Product {
    id: string
    name: string
    price: number
    description: string
    createdAt: string
    updatedAt: string
    categoryId: string
    category: Category
    images: ProductImage[]
    favorites: Favorite[]
}

export interface CreateProductDTO {
    name: string
    description: string
    price: number
    categoryId: string
    images?: string[]
}

export interface UpdateProductDTO {
    name?: string
    description?: string
    price?: number
    categoryId?: string
}