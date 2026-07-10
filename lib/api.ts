const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export async function api<T>(
    endpoint: string,
    options?: RequestInit,
) {

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error.message || "Request failed")
    }

    return {data: await res.json(), ok: res.ok}
}