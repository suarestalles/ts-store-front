const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

function getToken() {
    return typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;
}

export async function api<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        }
    })

    if (res.status === 204) {
        return undefined as T
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error.message || "Request failed")
    }

    return res.json()
}