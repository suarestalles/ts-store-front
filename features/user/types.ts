export enum Role {
    USER = 0,
    ADMIN = 1,
}

export interface IUser {
    id: string
    name: string
    email: string
    phone: string
    address: string
    role: Role
}

export interface UserFormData {
    name: string
    email: string
    phone: string
    address: string
}