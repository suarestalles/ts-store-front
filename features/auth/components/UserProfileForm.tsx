'use client'

import { Mail, MapPin, Phone, Save, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserFormData } from '@/features/user/types'

interface UserProfileFormProps {
  formData: UserFormData
  onChange: <K extends keyof UserFormData>(
    field: K,
    value: UserFormData[K]
  ) => void
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
}

export function UserProfileForm({
  formData,
  onChange,
  onSubmit,
}: UserProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <User className="h-4 w-4" />
          Full Name
        </label>

        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full rounded-lg border border-border bg-background/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <Mail className="h-4 w-4" />
          Email
        </label>

        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full rounded-lg border border-border bg-background/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <Phone className="h-4 w-4" />
          Phone
        </label>

        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="w-full rounded-lg border border-border bg-background/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your phone"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="h-4 w-4" />
          Address
        </label>

        <textarea
          rows={3}
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
          className="w-full resize-none rounded-lg border border-border bg-background/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your address"
          required
        />
      </div>

      <Button type="submit" className="mt-6 w-full gap-2">
        <Save className="h-4 w-4" />
        Save Profile
      </Button>
    </form>
  )
}