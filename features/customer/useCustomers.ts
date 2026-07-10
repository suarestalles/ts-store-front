import { useEffect, useState } from "react";
import { Customer } from "./types";
import { getCustomers } from "./customers.service";

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([])

    async function loadCustomers() {
        const response = await getCustomers()
        setCustomers(response.data.data)
    }

    useEffect(() => {
        loadCustomers()
    }, [])

    return { customers }
}