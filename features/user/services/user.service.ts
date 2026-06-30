import { api } from "@/lib/api";
import { UserFormData } from "../types";

export async function me() {
    return api('/users/me')
}

export async function updateUser(data: UserFormData) {
    return api('/users', {
        method: "PATCH",
        body: JSON.stringify(data)
    })
}

export async function createUser(data: UserFormData) {
    return api('/users', {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function deleteUser(id: string) {
    return api(`/users/${id}`, {
        method: "DELETE",
    })
}