import { useEffect, useState } from "react";
import { Category } from "./types";
import { getCategories as getCategoriesService } from "./category.service";

export function useCategories() {

    const [categories, setCategories] = useState<Category[]>([])

    async function loadCategories() {
        const response = await getCategoriesService()
        setCategories(response.data.data)
    }

    useEffect(() => {
        loadCategories()
    }, [])

    return {
        categories
    } 
}