import { api } from "@/lib/api"
import { LoginData } from "./types"

export async function login(data: LoginData) {
    return api('/login', {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function refreshToken() {
    return api('/auth/refresh', {
        method: "POST"
    })
}

export async function logoutAll() {
    return api('/auth/logout-all', {
        method: "POST"
    })
}