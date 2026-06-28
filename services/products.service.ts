import { api } from "@/lib/api";
import { CreateProductDTO, UpdateProductDTO } from "@/lib/dtos/product.dto";
import type { Product } from "@/lib/types/product";

export async function getProducts() {
    const response = await api("/products") as { data: object};
    return response['data'] as Product[]
}

export function getProductById(id: string) {
    return api<Product>(`/products/${id}`)
}

export function createProduct(data: CreateProductDTO) {
    return api<Product>("/products", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export function updateProduct(id: string, data: UpdateProductDTO) {
    return api<Product>(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
}

export function deleteProduct(id: string) {
    return api<void>(`/products/${id}`, { method: "DELETE" })
}