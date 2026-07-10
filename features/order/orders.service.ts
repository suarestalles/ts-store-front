import { api } from "@/lib/api";
import { ChangeTrackingData, Order, UpdateStatusData } from "./types";

export function getOrders(): Promise<{data: Order[]}> {
    return api<Order[]>("/orders")
}

export function changeTrackingCode(data: ChangeTrackingData): Promise<{data: Order}> {
    return api<Order>("/orders/tracking", {
        method: "PATCH",
        body: JSON.stringify(data)
    })
}

export function updateOrderStatus(data: UpdateStatusData): Promise<{data: Order}> {
    return api<Order>("/orders/status", {
        method: "PATCH",
        body: JSON.stringify(data)
    })
}