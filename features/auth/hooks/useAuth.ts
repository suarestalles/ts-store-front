import { IUser, UserFormData } from "@/features/user/types";
import { useCallback, useEffect, useState } from "react";
import { LoginData } from "../types";
import { me, updateUser } from "@/features/user/services/user.service";
import { login as loginService, logoutAll } from "@/features/auth/services/auth.service"

export function useAuth() {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)
    
    const loadUser = useCallback(async () => {
        setLoading(true)

        try {
            const response = await me()

            if (!response.ok) {
                setUser(null)
                return
            }

            const currentUser = await response.data

            setUser(currentUser)
        } catch (error) {
            console.log(error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

    async function login(data: LoginData) {
        const response = await loginService(data)

        if (!response.ok) {
            return false
        }

        await loadUser()

        return true
    }

    async function logout() {
        await logoutAll()

        setUser(null)
    }

    async function update(data: UserFormData) {
        if (!user) return false

        const response = await updateUser(data)

        if (!response.ok) {
            return false
        }

        await loadUser()

        return true
    }

    useEffect(() => {
        loadUser()
    }, [loadUser])

    return {
        user,
        loading,

        login,
        logout,
        update,

        reloadUser: loadUser
    }
}