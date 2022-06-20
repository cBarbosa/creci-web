
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
