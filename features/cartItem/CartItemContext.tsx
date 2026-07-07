'use client';

import { createContext, useEffect, useState, ReactNode, } from 'react';
import { useAuth } from '../auth/useAuth';
import { CartItem } from './types';
import {
  getCartItems,
  addCartItem as addCartItemService,
  updateQuantity as updateQuantityService,
  clearCart as clearCartService,
  removeCartItem as removeCartItemService
} from './cartItem.service';

type CartItemContextData = {
  cartItems: CartItem[];
  cartItemsCount: number;
  total: number;
  isCartItem: (id: string) => boolean;
  addCartItem: (productId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  removeCartItem: (itemId: string) => Promise<void>
  reloadCartItems: () => Promise<void>
};

export const CartItemContext = createContext<CartItemContextData | null>(null);

interface CartItemProviderProps {
  children: ReactNode;
}

export function CartItemProvider({ children }: CartItemProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0)
  const { isAuthenticated } = useAuth()

  const cartItemIds = new Set<string>(cartItems?.map(cartItem => cartItem.product.id))

  function isCartItem(id: string) {
    return cartItemIds.has(id);
  }

  async function reloadCartItems() {
    const response = await getCartItems()

    setCartItems(response.data.items)
    setTotal(response.data.subtotal)
  }

  useEffect(() => {
    async function load() {
      try {
        const response = await getCartItems();

        setCartItems(
          response.data.items
        );
      } catch (error) {
        console.error(error);
      }
    }

    if (!isAuthenticated) {
      setCartItems([])
      return
    }

    load();
  }, [isAuthenticated]);

  async function addCartItem(productId: string) {
    await addCartItemService({productId: productId});

    await reloadCartItems();
  }

  async function updateQuantity(cartItemId: string, quantity: number) {
    const data = {
      cartItemId: cartItemId,
      quantity: quantity
    }

    await updateQuantityService(data)

    await reloadCartItems()
  }
  
  async function clearCart() {
    await clearCartService()

    await reloadCartItems()
  }

  async function removeCartItem(itemId: string) {
    await removeCartItemService(itemId)
    await reloadCartItems()
  }

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        cartItemsCount: cartItemIds.size,
        total: total,
        isCartItem,
        addCartItem,
        updateQuantity,
        clearCart,
        removeCartItem,
        reloadCartItems: async () => {},
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
}