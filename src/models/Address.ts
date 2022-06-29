import { CustomerType } from "./Customer";
import { ScheduleType } from "./Schedule";

export interface AddressFormData {
    uuid?: string;
    customerUuid?: string;
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
    customer?: CustomerType;
    schedules?: ScheduleType[];
};

export interface Estado {
    sigla: string
    nome: string
}
