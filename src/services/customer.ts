import { AxiosResponse } from "axios";
import { CustomerType } from "../models/Customer";
import api from "./api";

const defaultLimit = 10;

const CreateCustomer = async (data: CustomerType): Promise<AxiosResponse<any, any>> => {
    if(!data) {
        throw new Error("Sem parâmetros necessários para execução");
    }

    return await api.put(`api/customer/create`,data);
};

const UpdateCustomer = async (data: CustomerType) : Promise<AxiosResponse<any, any>>  => {
    if(!data) {
        throw new Error("Sem parâmetros necessários para execução");
    }

    return await api.post(`api/customer/update`, data);
};

const GetCustomerByUUID = (uuid: string): Promise<AxiosResponse<any, any>> => {
    return api.get(`/api/Customer/${uuid}`);
};

const GetCustomersVisitors = async (page: number = 1, limit: number = defaultLimit) : Promise<AxiosResponse<any, any>>  => {

    return await api.get(`/api/Customer/Visitors/Paging?page=${page}&limit=${limit}`);
};

const GetCustomers = async (page: number = 1, limit: number = defaultLimit) : Promise<AxiosResponse<any, any>>  => {

    return await api.get(`/api/Customer/Paging?page=${page}&limit=${limit}`);
};

export {
    CreateCustomer,
    UpdateCustomer,
    GetCustomerByUUID,
    GetCustomersVisitors,
    GetCustomers
};
