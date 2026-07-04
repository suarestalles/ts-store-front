import { useContext } from "react";
import { FavoriteContext } from "./FavoriteContext";

export function useFavorite() {
    const context = useContext(FavoriteContext)

    if(!context) {
        throw new Error("useFavorites must be used within a FavoriteProvider")
    }

    return context
}