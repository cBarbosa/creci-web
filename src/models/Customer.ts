import { AddressType } from "./Address";

export interface CustomerFormData {
    type: number;
    uuid?: string;
    name?: string;
    email?: string;
    phone?: string;
    document?: string;
};

export type CustomerType = {
    uuid: string;
    name: string;
    email: string;
    phone?: string;
    document?: string;
    formatedPhone?: string;
    formatedDocument?: string;
    addresses?: AddressType[];
};




