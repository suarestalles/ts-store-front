import { api } from "@/lib/api";
import { CartItemCreate, CartItemsResponse, CartItemUpdateQuantity } from "./types";
import { Cart } from "../cart/types";

export async function getCartItems(): Promise<{ data: CartItemsResponse }> {
    return api<CartItemsResponse>("/carts")
}

export async function addCartItem(data: CartItemCreate): Promise<void> {
    await api<void>("/carts/items", {
        method: "POST",
        body: JSON.stringify(data),
    })
}

export async function updateQuantity(data: CartItemUpdateQuantity): Promise<{data: CartItemsResponse | null}> {
    return api<CartItemsResponse | null>("/carts/items", {
        method: "PATCH",
        body: JSON.stringify(data)
    })
}

export async function clearCart(): Promise<{data: Cart | null}> {
    return api<Cart | null>("/carts/clear")
}

export async function removeCartItem(itemId: string): Promise<{data: Cart | null}> {
    const data = {itemId: itemId}
    return api<void>(`/carts/removeItem/${itemId}`, {
        method: "DELETE",
        body: JSON.stringify(data)
    })
}