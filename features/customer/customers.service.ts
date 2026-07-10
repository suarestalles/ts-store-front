import { api } from "@/lib/api";
import { Customer } from "./types";

export async function getCustomers(): Promise<{data: {data: Customer[]}}> {
    return api<Customer[]>("/customers")
}