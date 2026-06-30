'use client'

import { Lock, LogIn, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LoginData } from '../types'

interface LoginFormProps {
  loginData: LoginData
  onChange: <K extends keyof LoginData>(
    field: K,
    value: LoginData[K]
  ) => void
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
}

export function LoginForm({
  loginData,
  onChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <Mail className="h-4 w-4" />
          Email
        </label>

        <input
          type="email"
          value={loginData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full rounded-lg border border-border bg-background/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <Lock className="h-4 w-4" />
          Password
        </label>

        <input
          type="password"
          value={loginData.password}
          onChange={(e) => onChange('password', e.target.value)}
          className="w-full rounded-lg border border-border bg-background/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your password"
          required
        />
      </div>

      <Button type="submit" className="mt-6 w-full gap-2">
        <LogIn className="h-4 w-4" />
        Login
      </Button>
    </form>
  )
}