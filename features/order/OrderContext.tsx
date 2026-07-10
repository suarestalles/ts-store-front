'use client';

import { createContext, useEffect, useState, ReactNode, } from 'react';
import {
  getOrders,
  changeTrackingCode as changeTrackingCodeService,
  updateOrderStatus as updateOrderStatusService
} from './orders.service';
import { useAuth } from '../auth/useAuth';
import { ChangeTrackingData, Order, UpdateStatusData } from './types';

type OrderContextData = {
  orders: Order[];
  ordersCount: number;
  changeTrackingCode: (data: ChangeTrackingData) => Promise<Order>
  updateOrderStatus: (data: UpdateStatusData) => Promise<Order>
  reloadOrders: () => Promise<void>
};

export const OrderContext = createContext<OrderContextData | null>(null);

interface OrderProviderProps {
  children: ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    async function load() {
      try {
        const response = await getOrders();

        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (!isAuthenticated) {
      setOrders([])
      return
    }

    load();
  }, [isAuthenticated]);

  async function changeTrackingCode(data: ChangeTrackingData): Promise<Order> {
    const response = await changeTrackingCodeService(data)
    return response.data
  }

  async function updateOrderStatus(data: UpdateStatusData): Promise<Order> {
    const response = await updateOrderStatusService(data)
    return response.data
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        ordersCount: orders.length,
        changeTrackingCode,
        updateOrderStatus,
        reloadOrders: async () => {},
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}