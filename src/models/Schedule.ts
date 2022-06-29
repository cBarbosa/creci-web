import { AddressType } from "./Address";
import { CustomerType } from "./Customer";

export interface ScheduleFormData {
    uuid?: string;
    customerUuid: string;
    addressUuid: string;
    date: string;
    time: string;
    status: number;
};

export type ScheduleType = {
    uuid: string;
    date?: string;
    time?: string;
    creci?: string;
    accepted?: string;
    rejected?: string;
    customerSuggest?: string;
    status?: number;
    formatedDate?: string;
    formatedTime?: string;
    address?: AddressType;
    visitor?: CustomerType;
    addressUuid?: string;
    customerUuid?: string;
};
