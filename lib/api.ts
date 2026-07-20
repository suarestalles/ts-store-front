const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

async function refresh() {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include"
    })

    return response.ok
}

export async function api<T>(
    endpoint: string,
    options?: RequestInit,
) {

    const request = () => fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options
    })

    let response = await request()

    if(response.status === 401 && endpoint !== "/auth/refresh" && endpoint !== "/login") {
        const refreshed = await refresh()

        if(refreshed) {
            await request()
        }
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Request failed")
    }

    return {data: await response.json(), ok: true}
}