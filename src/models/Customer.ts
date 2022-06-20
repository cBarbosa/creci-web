
export interface CustomerFormData {
    uuid?: string;
    name?: string;
    email?: string;
    phone?: string;
    addresses?: IAddress
};

export interface IAddress {
    title?: string;
    description?: string;
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
    formatedPhone?: string;
    addresses: AddressType[];
};

export type AddressType = {
    uuid: string;
    customerUuid?: string;
    title?: string;
    description?: string;
    state?: string;
    street?: string;
    number?: string;
    city?:string;
    neighborhood?:string;
    zipcode?: string;
    lat?: number;
    lng?: number;
};

export interface Estado {
    sigla: string
    nome: string
}