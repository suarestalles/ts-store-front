'use client'

import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { IUser, UserFormData } from "../user/types";
import { LoginData } from "./types";
import { me, updateUser } from "../user/services/user.service";
import { login as loginService, logoutAll} from "./auth.service"

interface AuthContextData {
    user: IUser | null
    loading: boolean
    isAuthenticated: boolean
    isLoginOpen: boolean
    openLogin: () => void
    closeLogin: () => void
    login: (data: LoginData) => Promise<boolean>
    logout: () => Promise<void>
    update: (data: UserFormData) => Promise<boolean>
    reloadUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData | null>(null)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const isAuthenticated = !!user

    const loadUser = useCallback(async () => {
        setLoading(true)

        try {
            const response = await me()

            if (!response.ok) {
                setUser(null)
                return
            }

            setUser(response.data.user)
        } catch (error) {
            console.error(error)
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

        setIsLoginOpen(false)

        return true
    }

    async function logout() {
        await logoutAll()
        setUser(null)
    }

    async function update(data: UserFormData) {
        if (!user) return false

        const response = await updateUser(data)

        if (!response.ok) return false

        await loadUser()

        return true
    }

    function openLogin() {
        setIsLoginOpen(true)
    }

    function closeLogin() {
        setIsLoginOpen(false)
    }

    useEffect(() => {
        loadUser()
    }, [loadUser])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                isLoginOpen,
                openLogin,
                closeLogin,
                login,
                logout,
                update,
                reloadUser: loadUser
            }}
        > { children }
        </AuthContext.Provider>
    )
}