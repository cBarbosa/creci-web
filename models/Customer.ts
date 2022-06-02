
export interface CustomerFormData {
    name?: string;
    email?: string;
    phone?: string;
    adress?: IAddress
};

export interface IAddress {
    state?: string;
    street?: string;
    number?: string;
};
