export interface CreateProductDTO {
    name: string
    description: string
    price: number
    categoryId: string
}

export interface UpdateProductDTO {
    name?: string
    description?: string
    price?: number
    categoryId?: string
}