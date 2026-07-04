import { api } from "@/lib/api";
import { Favorite } from "./types";

export async function toggleFavorite(productId: string) {
    return await api<Favorite>(`/favorites/${productId}`)
}

export async function getFavorites(): Promise<{ data: Favorite[] }> {
    return api<Favorite[]>("/favorites")
}