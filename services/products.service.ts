import { CreateProductDTO, Product, UpdateProductDTO } from "@/features/product/types";
import { api } from "@/lib/api";

export function getProducts() {
    return api<Product[]>("/products");
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