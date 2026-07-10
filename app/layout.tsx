import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { FavoriteProvider } from '@/features/favorite/FavoriteContext';
import { AuthProvider } from '@/features/auth/AuthContext';
import { CartItemProvider } from '@/features/cartItem/CartItemContext';
import { OrderProvider } from '@/features/order/OrderContext';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '3D Store - Discover Beautiful Objects',
  description: 'Explore our collection of beautifully designed 3D objects. Modern furniture, lighting, and decor with immersive 3D previews.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background">
        <AuthProvider>
          <CartItemProvider>
            <FavoriteProvider>
              <OrderProvider>
                {children}
              </OrderProvider>
            </FavoriteProvider>
          </CartItemProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
