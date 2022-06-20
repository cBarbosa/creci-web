
export interface CustomerFormData {
    uuid?: string;
    name?: string;
    email?: string;
    phone?: string;
    addresses?: IAddress
};

export interface IAddress {
    state?: string;
    street?: string;
    city?:string;
    neighborhood?:string;
    zipcode?: string;
    number?: string;
    lat?: number;
    lng?: number;
};

export type CustomerType = {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    addresses: AddressType[];
};

export type AddressType = {
    uuid: string;
    state?: string;
    street?: string;
    number?: string;
    city?:string;
    neighborhood?:string;
    zipcode?: string;
    lat?: number;
    lng?: number;
};