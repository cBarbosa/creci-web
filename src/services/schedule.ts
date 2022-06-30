import { AxiosResponse } from "axios";
import { ScheduleType } from "../models/Schedule";
import api from "./api";

const CreateSchedule = async (data: ScheduleType): Promise<AxiosResponse<any, any>>  => {
    if(!data) {
        throw new Error("Sem parâmetros necessários para execução");
    }

    return await api.put(`api/schedule/create`, data);
};

const UpdateSchedule = async (data: ScheduleType): Promise<AxiosResponse<any, any>>  => {
    if(!data) {
        throw new Error("Sem parâmetros necessários para execução");
    }

    return await api.post(`api/Schedule/update`, data);
};

const DeleteSchedule = async (uuid: string): Promise<AxiosResponse<any, any>> => {
    if(!uuid) {
        throw new Error("Sem parâmetros necessários para execução");
    }

    return await api.delete(`api/Schedule/${uuid}`);
};

const TIMES_TO_SCHEDULE:any[] = [
    { value: '08:00', description: '08:00 às 09:00' },
    { value: '09:00', description: '09:00 às 10:00' },
    { value: '10:00', description: '10:00 às 11:00' },
    { value: '11:00', description: '11:00 às 12:00' },
    { value: '12:00', description: '12:00 às 13:00' },
    { value: '13:00', description: '13:00 às 14:00' },
    { value: '14:00', description: '14:00 às 15:00' },
    { value: '15:00', description: '15:00 às 16:00' },
    { value: '16:00', description: '16:00 às 17:00' },
    { value: '17:00', description: '17:00 às 18:00' },
];

const DATETIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // fractionalSecondDigits: 3,
    timeZone: 'America/Sao_Paulo',
    hour12: false
};


const STATUS_TUPLE: [number, string][] = [
    [1, `Aguardando aprovação do cliente`],
    [2, `Cliente aprovou a solicitação`],
    [3, `Cliente negou a solicitação`],
    [4, `Cliente propos novo horário`],
    [5, `Visita realizada`]
];

const STATUS_TUPLE_SIMPLIFIED: [number, string][] = [
    [1, `Aguardando`],
    [2, `Aprovado`],
    [3, `Negado`],
    [4, `Aguardando`],
    [5, `Aprovado`]
];

export {
    CreateSchedule,
    UpdateSchedule,
    DeleteSchedule,
    TIMES_TO_SCHEDULE,
    DATETIME_FORMAT_OPTIONS,
    STATUS_TUPLE,
    STATUS_TUPLE_SIMPLIFIED
};
