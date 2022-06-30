import { AddressType } from "./Address";
import { CustomerType } from "./Customer";
import { AgentType } from "./User";

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
    created?: string;
    customerSuggest?: string;
    status?: number;
    formatedDate?: string;
    formatedTime?: string;
    addressUuid?: string;
    customerUuid?: string;
    address?: AddressType;
    visitor?: CustomerType;
    agent?: AgentType;
};
