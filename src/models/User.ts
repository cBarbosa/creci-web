
export interface IUser {
    nome?: string;
    emailInstitucional?: string;
    creci: number;
    cnai?: number;
    situacao?: string;
    regularidade?: string;
};

export interface LoginFormData {
    username: string;
    password: string;
};

export type AgentType = {
    name?: string;
    email?: string;
    creci: number;
    cnai?: number;
    status?: string;
};
