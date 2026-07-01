import { api } from "@/lib/api";
import { Category } from "./types";

export function getCategories() {
    return api<Category[]>('/categories')
}