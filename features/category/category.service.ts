import { api } from "@/lib/api";
import { Category } from "./types";

export function getCategories(): Promise<{data: {data: Category[]}}> {
    return api<Category[]>('/categories')
}