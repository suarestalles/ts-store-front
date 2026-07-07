import { useContext } from "react";
import { CartItemContext } from "./CartItemContext";

export function useCartItem() {
    const context = useContext(CartItemContext)

    if(!context) {
        throw new Error("useCartItems must be used within a CartItemProvider")
    }

    return context
}