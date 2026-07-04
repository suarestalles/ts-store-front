import React, { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import { LoginData } from "../types";
import { cn } from "@/lib/utils";
import { User, X } from "lucide-react";
import { UserProfileForm } from "./UserProfileForm";
import { LoginForm } from "./LoginForm";

export function ProfilePopup() {
    const {
        isLoginOpen,
        closeLogin,
        user,
        loading,
        login,
        update
    } = useAuth()

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    })

    async function handleLogin(e: React.SubmitEvent) {
        e.preventDefault()

        const success = await login(loginData)

        if(!success) {
            alert('Invalid Credentials')
        }
    }

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        const success = await update(formData)

        if(success) {
            closeLogin()
        }
    }

    useEffect(() => {
        if(!user) return

        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
        })
    }, [user])

    if(!isLoginOpen) return

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
                onClick={closeLogin}
            />

            <div
                className={cn(
                'relative w-full max-w-md rounded-2xl border bg-card shadow-2xl',
                'animate-in fade-in-0 zoom-in-95 duration-200'
                )}
            >
                <div className="flex items-center justify-between border-b p-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">

                    <User className="h-5 w-5 text-primary-foreground" />

                    </div>

                    <div>

                    <h2 className="text-lg font-semibold">

                        {user ? 'Profile' : 'Login'}

                    </h2>

                    <p className="text-sm text-muted-foreground">

                        {user
                        ? 'Manage your account'
                        : 'Login to continue'}

                    </p>

                    </div>

                </div>

                <button onClick={closeLogin}>
                    <X className="h-5 w-5" />
                </button>

                </div>

                <div className="p-6">

                {loading ? (

                    <p>Loading...</p>

                ) : user ? (

                    <UserProfileForm
                    formData={formData}
                    onChange={(field, value) => setFormData((prev) => ({
                        ...prev,
                        [field]: value
                    }))}
                    onSubmit={handleSubmit}
                    />

                ) : (

                    <LoginForm
                    loginData={loginData}
                    onChange={(field, value) => setLoginData((prev) => ({
                        ...prev,
                        [field]: value
                    }))}
                    onSubmit={handleLogin}
                    />

                )}

                </div>

            </div>

            </div>
    )
}