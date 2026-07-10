import { useEffect, useState } from "react";
import {
    getProducts,
    createProduct as createProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService,
} from "./products.service";
import { Product, CreateProductDTO, UpdateProductDTO } from "./types";

export function useProducts() {

    const [ products, setProducts ] = useState<Product[]>([])

    async function loadProducts() {
        const response = await getProducts()
        setProducts(response.data.data)
    }

    async function createProduct(dto: CreateProductDTO) {
        const created = await createProductService(dto).then(data => data.data);

        setProducts(current => [...current, created]);
    }

    async function updateProduct(id: string, dto: UpdateProductDTO) {
        const updated = await updateProductService(id, dto).then(data => data.data);

        setProducts(current =>
            current.map(p =>
                p.id === updated.id ? updated : p
            )
        );
    }

    async function deleteProduct(id: string) {
        await deleteProductService(id);

        setProducts(current =>
            current.filter(p => p.id !== id)
        );
    }

    useEffect(() => {
        loadProducts()
    }, [])


    return {
        products,
        loadProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    }
}