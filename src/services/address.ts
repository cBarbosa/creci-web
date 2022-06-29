import { AxiosResponse } from "axios";
import { AddressType, Estado } from "../models/Address";
import api from "./api";

const defaultLimit = 10;

const CreateAddress = async (data: AddressType): Promise<AxiosResponse<any, any>> => {
    if(!data) {
        throw new Error("Sem parâmetros necessários para execução");
    }

    return await api.put(`api/customer/address`, data);
};

const UpdateAddress = async (data: AddressType): Promise<AxiosResponse<any, any>> => {
    if(!data) {
        throw new Error("Sem parâmetros necessários para execução");
    }

    return await api.post(`api/customer/address`, data);
};

const GetAddressByUUID = async (uuid: string): Promise<AxiosResponse<any, any>> => {
    
    return await api.get(`/api/Customer/Address/${uuid}`);
};

const GetAddresses = async (page: number = 1, limit: number = defaultLimit) : Promise<AxiosResponse<any, any>>  => {

    return await api.get(`/api/Customer/Address/paging?page=${page}&limit=${limit}`);
};

const DeleteAddress = async (uuid: string) => {
    if(!uuid) {
        throw new Error("Sem parâmetros necessários para execução");
    }

    return await api.delete(`api/customer/address/${uuid}`);
};

const STATES_OF_BRAZIL: Estado[] = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
];

export {
    GetAddressByUUID,
    GetAddresses,
    DeleteAddress,
    CreateAddress,
    UpdateAddress,
    STATES_OF_BRAZIL
};
